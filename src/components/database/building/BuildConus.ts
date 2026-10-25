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
import { ENUM_STATE_FIPS } from "@Enums.Geographic/FIPCodes"
import { Bootstrap } from "@Bootstrap"
import { CreateQuery } from "@Components.Database/CreateQuery"
import { SetLog } from "@Components.Utilities/SetLog"
import { CreateFetchRequest } from "@Components.Utilities/CreateFetchRequest"
import { feature } from "topojson-client"

type TYPE_COUNT_RESULT = { count: number };
type TYPE_CONUS_ROW = {
    id: string
    type: `state` | `county`
    state: string
    name: string
    geometry: string
}

export const BuildConus = async (): Promise<void> => {
    const dbgTickA = performance.now();

    const { Database, Settings } = Bootstrap;
    const { GIS } = Settings.Integrations;
    const { count } = CreateQuery({ Query: ENUM_STRINGS.DB_STRINGS.COUNTS.CONUS })[0] as TYPE_COUNT_RESULT;
    
    if (count == 0) { 
        const cResponse = await CreateFetchRequest({
            Destination: GIS.ConusDownload,
            Timeout: 5e3,
        });

        if (cResponse.Error) {
            return SetLog({ Type: `ERROR`, Message: `${ENUM_STRINGS.CALLBACKS.HTTP_REQUEST_FAILED} for conus download (Status: ${cResponse.StatusCode})` })
        }

        const cDatabase = JSON.parse(cResponse.Body)
        const cStates = feature(cDatabase, cDatabase.objects.states) as unknown as GeoJSON.FeatureCollection<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>
        const cCounties = feature(cDatabase, cDatabase.objects.counties) as unknown as GeoJSON.FeatureCollection<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>

        const cStateRows: TYPE_CONUS_ROW[] = [];
        const cCountyRows: TYPE_CONUS_ROW[] = [];


        for (const cState of cStates.features) {
            const { id, properties, geometry } = cState;
            const cFIPS = String(id).padStart(2, `0`);
            const cAbv = ENUM_STATE_FIPS[cFIPS];
            if (!geometry || !cAbv) { continue; }

            cStateRows.push({
                id: cFIPS, 
                type: `state`,
                state: cAbv,
                name: properties?.name ?? cAbv,
                geometry: JSON.stringify(geometry)
            })
        }

        for (const cCounty of cCounties.features) {
            const { id, properties, geometry } = cCounty;
            const fips = String(id).padStart(5, `0`).substring(0, 2);
            const abbreviation = ENUM_STATE_FIPS[fips];
            if (!geometry || !abbreviation) { continue; }

            cCountyRows.push({
                id: String(id).padStart(5, `0`),
                type: `county`,
                state: abbreviation,
                name: properties?.name ?? `Unknown`,
                geometry: JSON.stringify(geometry)
            })
        }

        SetLog({ Message: ENUM_STRINGS.DATABASE.CONUS_BUILD.replace(/%s/g, String(cStateRows.length)).replace(/%d/g, String(cCountyRows.length)) })

        const callTransaction = Database.transaction((cEntries: TYPE_CONUS_ROW[]) => {
            for (const cEntry of cEntries) { 
                CreateQuery({
                    Query: ENUM_STRINGS.DB_STRINGS.IMPORTS.CONUS,
                    Parameters: [cEntry.id, cEntry.type, cEntry.state, cEntry.name, cEntry.geometry]
                })
            } 
        });
        callTransaction([...cStateRows, ...cCountyRows]);

        SetLog({ Type: `DEBUG`, Message: `[${(Math.round((performance.now() - dbgTickA) * 100) / 100).toFixed(1)}ms] BuildConus` })
    }  
}

