/*
              _                             _               _     __   __
         /\  | |                           | |             (_)    \ \ / /
        /  \ | |_ _ __ ___   ___  ___ _ __ | |__   ___ _ __ _  ___ \ V / 
       / /\ \| __| '_ ` _ \ / _ \/ __| '_ \| '_ \ / _ \ '__| |/ __| > <  
      / ____ \ |_| | | | | | (_) \__ \ |_) | | | |  __/ |  | | (__ / . \ 
     /_/    \_\__|_| |_| |_|\___/|___/ .__/|_| |_|\___|_|  |_|\___/_/ \_\
                                     | |                            
                                     |_|                                                                                                                

    Created with ♥ by the AtmosphericX Team (KiyoWx, StarflightWx, & CJ Ziegler)
    Discord: https://atmosphericx-discord.scriptkitty.cafe
    Ko-Fi: https://ko-fi.com/k3yomi
    Documentation: https://atmosphericx.scriptkitty.cafe/documentation

    Independent Package: @atmosx/event-product-parser

*/

import { EnumStateFIPS } from "@Enums/States"
import { Bootstrap } from "@Bootstrap"
import { CreateHttp } from "@Utilities/CreateHttp"
import { CreateQuery } from "@Database/CreateQuery"
import { SetWarning } from "@Utilities/SetWarning"
import { feature } from "topojson-client"

type BoundaryRow = {
    id: string
    type: `state` | `county`
    state: string
    name: string
    geometry: string
}

export const Boundaries = async (): Promise<void> => {
    try {
        const existing = CreateQuery({ Query: `SELECT type, COUNT(*) AS count FROM boundaries GROUP BY type`}) as { type: string, count: number }[]
        const existingStates = existing.find(row => row.type === `state`)?.count ?? 0
        const existingCounties = existing.find(row => row.type === `county`)?.count ?? 0

        if (existingStates > 0 || existingCounties > 0) {
            SetWarning({ Message: `Boundary database already contains ${existingStates} states and ${existingCounties} counties, skipping import` })
            return
        }

        const boundaries = await CreateHttp({
            URL: Bootstrap.Settings.BoundarySettings.BoundaryDatabase,
            Timeout: 5000
        })

        if (boundaries.error || !boundaries.message) {
            SetWarning({ Message: `Failed to download boundary database` })
            return
        }

        let database: any

        try {
            database = JSON.parse(boundaries.message)
        } catch {
            SetWarning({ Message: `Failed to parse boundary database` })
            return
        }

        if (database?.type !== `Topology` || !database?.objects?.states || !database?.objects?.counties) {
            SetWarning({ Message: `Boundary database is missing states or counties` })
            return
        }

        let states: any
        let counties: any

        try {
            states = feature(database, database.objects.states)
            counties = feature(database, database.objects.counties)
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error)
            SetWarning({ Message: `Failed to convert boundary database: ${message}` })
            return
        }

        if (!Array.isArray(states?.features) || !Array.isArray(counties?.features)) {
            SetWarning({ Message: `Boundary database contains invalid state or county data` })
            return
        }

        const insert = `INSERT OR REPLACE INTO boundaries (id, type, state, name, geometry) VALUES (?, ?, ?, ?, ?)`
        const stateRows: BoundaryRow[] = []
        const countyRows: BoundaryRow[] = []
        let skippedStates = 0
        let skippedCounties = 0

        for (const state of states.features) {
            if (!state?.geometry || state.id === undefined || state.id === null) {
                skippedStates++
                continue
            }

            const fips = String(state.id).padStart(2, `0`)
            const abbreviation = EnumStateFIPS[fips]

            if (!abbreviation) {
                skippedStates++
                continue
            }

            stateRows.push({
                id: fips,
                type: `state`,
                state: abbreviation,
                name: state.properties?.name ?? abbreviation,
                geometry: JSON.stringify(state.geometry)
            })
        }

        for (const county of counties.features) {
            if (!county?.geometry || county.id === undefined || county.id === null) {
                skippedCounties++
                continue
            }

            const fips = String(county.id).padStart(5, `0`)
            const stateFIPS = fips.slice(0, 2)
            const abbreviation = EnumStateFIPS[stateFIPS]

            if (!abbreviation) {
                skippedCounties++
                continue
            }

            countyRows.push({
                id: fips,
                type: `county`,
                state: abbreviation,
                name: county.properties?.name ?? fips,
                geometry: JSON.stringify(county.geometry)
            })
        }

        SetWarning({ Message: `Importing ${stateRows.length} states and ${countyRows.length} counties` })

        const transaction = Bootstrap.Database.transaction((rows: BoundaryRow[]) => {
            for (const row of rows) {
                CreateQuery({
                    Query: insert,
                    Parameters: [row.id, row.type, row.state, row.name, row.geometry]
                })
            }
        })

        transaction(stateRows)
        transaction(countyRows)

        const imported = CreateQuery({ Query: `SELECT type, COUNT(*) AS count FROM boundaries GROUP BY type`}) as { type: string, count: number }[]
        const importedStates = imported.find(row => row.type === `state`)?.count ?? 0
        const importedCounties = imported.find(row => row.type === `county`)?.count ?? 0

        if (importedStates !== stateRows.length || importedCounties !== countyRows.length) {
            SetWarning({ Message: `Boundary import verification failed: ${importedStates} states and ${importedCounties} counties` })
            return
        }

        SetWarning({ Message: `Imported ${importedStates} states and ${importedCounties} counties` })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error)
        SetWarning({ Message: `An error occurred while importing boundaries: ${message}` })
    }
}
