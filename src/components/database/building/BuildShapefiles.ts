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
import { ENUM_SHAPEFILES } from "@Enums/Shapefiles"
import { Bootstrap } from "@Bootstrap"
import { CreateQuery } from "@Components.Database/CreateQuery"
import { SetLog } from "@Components.Utilities/SetLog"
import { existsSync, mkdirSync, writeFileSync, unlinkSync, rm } from "node:fs"
import { resolve, extname} from "node:path"
import { loadAsync } from "jszip"
import { read } from "shapefile"

type TYPE_COUNT_RESULT = { count: number };
type TYPE_SHAPEFILE_RESPONSE = { 
    geometry: unknown
    properties: {
        STATE?: string
        ST?: string
        COUNTYNAME?: string
        FULLSTAID?: string
        FIPS?: string
        WFO?: string
        ZONE?: string
        CITY?: string
        NAME?: string
        RFC_NAME?: string
        RFC_CITY?: string
        SITE_ID?: string
        ID?: string
    }
}

export const BuildShapefiles = async (): Promise<void> => {
    const dbgTickA = performance.now();

    const { Database } = Bootstrap
    const { count } = CreateQuery({ Query: ENUM_STRINGS.DB_STRINGS.COUNTS.SHAPEFILE })[0] as TYPE_COUNT_RESULT;

    if (count == 0) { 
        const cDirectory = `tmp-${Math.random().toString(36).substring(2, 15)}`;
        for (const cShapefile of ENUM_SHAPEFILES) { 
            const dbgTickB = performance.now();
            const cResponse = await fetch(cShapefile.Link);
            const cBuffer = await cResponse.arrayBuffer();
            const cArchive = await loadAsync(cBuffer);
            SetLog({ Type: `DEBUG`, Message: `[${(Math.round((performance.now() - dbgTickB) * 100) / 100).toFixed(1)}ms] Downloaded shapefile ${cShapefile.Name}` })
            if (!existsSync(cDirectory)) {
                mkdirSync(cDirectory, { recursive: true });
            }
            for (const file of Object.keys(cArchive.files)) {
                if (file.endsWith('.shp') || file.endsWith('.dbf')) {
                    const data = await cArchive.files[file].async(`nodebuffer`)
                    const output = resolve(cDirectory, `${cShapefile.Name ?? ``}_${cShapefile.Type ?? ``}${extname(file)}`)
                    writeFileSync(output, data)
                }
            }
            const cFilePath = resolve(cDirectory, `${cShapefile.Name}_${cShapefile.Type}`);
            const { features } = await read(cFilePath, cFilePath);
            
            SetLog({ 
                Message: ENUM_STRINGS.DATABASE.SHAPEFILE_BUILD
                    .replace(/%s/g, String(cShapefile.Name))
                    .replace(/%d/g, String(features.length)) 
            })

            const dbgTickC = performance.now();
            const callTransaction = Database.transaction((lEntries: TYPE_SHAPEFILE_RESPONSE[]) => {
                for (const cEntry of lEntries) { 
                    const { properties, geometry } = cEntry
                    const { STATE, ST, FULLSTAID, FIPS, COUNTYNAME, 
                            WFO, CITY, NAME, RFC_NAME, RFC_CITY, SITE_ID, 
                            ID, ZONE } = properties
                    let lFinal: string, lLocation: string;
                    if (FIPS) {
                        lFinal = `${STATE}${cShapefile.Type}${FIPS.substring(2)}`;
                        lLocation = `${COUNTYNAME}, ${STATE}`;
                    } else if (FULLSTAID) {
                        lFinal = `${ST}${cShapefile.Type}${WFO}`;
                        lLocation = `${CITY}, ${STATE}`;
                    } else if (STATE) { 
                        lFinal = `${STATE}${cShapefile.Type}${ZONE ?? SITE_ID}`;
                        lLocation = `${NAME ?? `${RFC_NAME} ${RFC_CITY}`}, ${STATE}`;
                    } else { 
                        lFinal = ID ?? WFO
                        lLocation = NAME
                    }
                    CreateQuery({
                        Query: ENUM_STRINGS.DB_STRINGS.IMPORTS.SHAPEFILE,
                        Parameters: [lFinal, lLocation, `${cShapefile.Name}_${cShapefile.Type}`, JSON.stringify(geometry)]
                    })
                }
            })
            unlinkSync(`${cFilePath}.shp`)
            unlinkSync(`${cFilePath}.dbf`)
            callTransaction(features)
            SetLog({ Type: `DEBUG`, Message: `[${(Math.round((performance.now() - dbgTickC) * 100) / 100).toFixed(1)}ms] Shapefile ${cShapefile.Name} population` })
        }
        rm(cDirectory, { recursive: true, force: true }, (err) => {})
        
        SetLog({Type: `DEBUG`, Message: `[${(Math.round((performance.now() - dbgTickA) * 100) / 100).toFixed(1)}ms] BuildShapefiles` })
    }  
}

