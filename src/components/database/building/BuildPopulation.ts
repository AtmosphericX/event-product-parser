/*
              _                             _               _     __   __
         /\  | |                           | |             (_)    \ \ / /
        /  \ | |_ _ __ ___   ___  ___ _ __ | |__   ___ _ __ _  ___ \ V / 
       / /\ \| __| '_ ` _ \ / _ \/ __| '_ \| '_ \ / _ \ '__| |/ __| > <  
      / ____ \ |_| | | | | | (_) \__ \ |_) | | | |  __/ |  | | (__ / . \ 
     /_/    \_\__|_| |_| |_|\___/|___/ .__/|_| |_|\___|_|  |_|\___/_/ \_\
                                     | |                            
                                     |_|    
                                                        
    Created with ❤️ by the Project AtmosphericX Team (KiyoWx, CJZiegler, StarflightWx)
    Ko-Fi: https://ko-fi.com/k3yomi

*/

import { ENUM_STRINGS } from "@Enums/Strings"
import { ENUM_STATES_FULL_NAMES } from "@Enums.Geographic/StateAbreviations"
import { Bootstrap } from "@Bootstrap"
import { CreateQuery } from "@Components.Database/CreateQuery"
import { SetLog } from "@Components.Utilities/SetLog"
import { CreateFetchRequest } from "@Components.Utilities/CreateFetchRequest"

type TYPE_COUNT_RESULT = { count: number };
type TYPE_CITY_ROW = {
    id: string
    name: string
    state: string
    county: string
    population: number | string
    lat: number | string
    lon: number | string
}

export const BuildPopulation = async (): Promise<void> => {
    const dbgTickA = performance.now();

    const { Database, Settings } = Bootstrap;
    const { GIS } = Settings.Integrations;
    const { count } = CreateQuery({ Query: ENUM_STRINGS.DB_STRINGS.COUNTS.POPULATION })[0] as TYPE_COUNT_RESULT;
    
    if (count == 0) { 
        const cResponse = await CreateFetchRequest({
            Destination: GIS.PopulationDownload,
            Timeout: 5e3,
        });

        if (cResponse.Error) {
            return SetLog({ Type: `ERROR`, Message: `${ENUM_STRINGS.CALLBACKS.HTTP_REQUEST_FAILED} for population download (Status: ${cResponse.StatusCode})` })
        }

        const cCityRows: TYPE_CITY_ROW[] = [];
        const cDatabase = JSON.parse(cResponse.Body);
        const cStateCodes: Record<string, string> = Object.fromEntries(
            Object.entries(ENUM_STATES_FULL_NAMES).map(([code, name]) => [name, code])
        );
        

        SetLog({ Message: ENUM_STRINGS.DATABASE.POPULATION_BUILD.replace(/%s/g, String(cDatabase.length)) })

        for (const cCity of cDatabase) { 
            if (cCity.country != `US`) continue;
            cCityRows.push({
                id: cCity.id,
                name: cCity.name,
                state: cStateCodes[cCity.admin1] ?? null,
                county: cCity.admin2,
                population: cCity.pop ?? null,
                lat: cCity.lat,
                lon: cCity.lon
            })
        }
        const callTransaction = Database.transaction((cEntries: TYPE_CITY_ROW[]) => {
            for (const cEntry of cEntries) {
                CreateQuery({
                    Query: ENUM_STRINGS.DB_STRINGS.IMPORTS.POPULATION,
                    Parameters: [cEntry.id, cEntry.name, cEntry.state, cEntry.county, cEntry.population, cEntry.lat, cEntry.lon]
                })
            }
        })
        callTransaction(cCityRows);
        SetLog({ Type: `DEBUG`, Message: `[${(Math.round((performance.now() - dbgTickA) * 100) / 100).toFixed(1)}ms] BuildPopulation` })
    }  
}

