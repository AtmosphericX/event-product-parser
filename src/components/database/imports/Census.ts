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
import { EnumStates } from "@Enums/States"
import { Bootstrap } from "@Bootstrap"
import { CreateHttp } from "@Utilities/CreateHttp"
import { CreateQuery } from "@Database/CreateQuery"
import { SetWarning } from "@Utilities/SetWarning"

interface CityRow {
    id: string
    name: string
    state: string
    county: string
    population: number | string
    lat: number | string
    lon: number | string
}

export const Census = async (): Promise<void> => {
    const cities = await CreateHttp({
        URL: Bootstrap.Settings.BoundarySettings.CityDatabase,
        Timeout: 5000
    })

    if (cities.error || !cities.message) {
        SetWarning({ Message: `Failed to download city database` })
        return
    }

    let database: unknown

    try {
        database = JSON.parse(cities.message)
    } catch {
        SetWarning({ Message: `Failed to parse city database` })
        return
    }

    if (!Array.isArray(database)) {
        SetWarning({ Message: `Failed to parse city database` })
        return
    }

    const StateCodes: Record<string, string> = Object.fromEntries(
        Object.entries(EnumStates).map(([code, name]) => [name, code])
    );
    const insert = `INSERT INTO cities (id, name, state, county, population, lat, lon) VALUES (?, ?, ?, ?, ?, ?, ?)`
    const cityRows: CityRow[] = []
    for (const city of database) {
        if (city.country != `US`) continue
        cityRows.push({
            id: city.id,
            name: city.name,
            state: StateCodes[city.admin1] ?? null,
            county: city.admin2,
            population: city.pop ?? null,
            lat: city.lat,
            lon: city.lon
        })
    }
    SetWarning({ Message: `Importing ${cityRows.length} cities` })
    const transaction = Bootstrap.Database.transaction((rows: CityRow[]) => {
        for (const row of rows) {
            CreateQuery({
                Query: insert,
                Parameters: [row.id, row.name, row.state, row.county, row.population, row.lat, row.lon]
            })
        }
    })
    transaction(cityRows)
}
