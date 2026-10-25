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
import { SetLog } from "@Components.Utilities/SetLog"
import { CreateQuery } from "@Components.Database/CreateQuery"
import { BuildShapefiles } from "@Components.Database.Building/BuildShapefiles"
import { BuildPopulation } from "@Components.Database.Building/BuildPopulation"
import { BuildConus } from "@Components.Database.Building/BuildConus"
import { BuildBroadcastify } from "@Components.Database.Building/BuildBroadcastify"

type TYPE_DATABASE_CREATE = { name: string }[];

export const CreatePopulatedDatabase = async (): Promise<void> => {
    const dbgTickA = performance.now();

    const { DB_STRINGS } = ENUM_STRINGS;
    const [stanzas, shapefiles, conus, population, active, feeds] = await Promise.all([
        await CreateQuery({ Query: DB_STRINGS.EXISTS.STANZA }) as TYPE_DATABASE_CREATE,
        await CreateQuery({ Query: DB_STRINGS.EXISTS.SHAPEFILE }) as TYPE_DATABASE_CREATE,
        await CreateQuery({ Query: DB_STRINGS.EXISTS.CONUS }) as TYPE_DATABASE_CREATE,
        await CreateQuery({ Query: DB_STRINGS.EXISTS.POPULATION }) as TYPE_DATABASE_CREATE,
        await CreateQuery({ Query: DB_STRINGS.EXISTS.ACTIVE }) as TYPE_DATABASE_CREATE,
        await CreateQuery({ Query: DB_STRINGS.EXISTS.BROADCASTIFY }) as TYPE_DATABASE_CREATE,
    ])

    const cTables = [stanzas, shapefiles, conus, population, active, feeds];
    const cMissingTables = cTables.some(table => table.length === 0);

    if (cMissingTables) { 
        SetLog({ Message: ENUM_STRINGS.DATABASE.BUILDING });
        await Promise.all([
            await CreateQuery({ Query: DB_STRINGS.CREATE.STANZA }),
            await CreateQuery({ Query: DB_STRINGS.CREATE.SHAPEFILE }),
            await CreateQuery({ Query: DB_STRINGS.CREATE.CONUS }),
            await CreateQuery({ Query: DB_STRINGS.CREATE.POPULATION }),
            await CreateQuery({ Query: DB_STRINGS.CREATE.ACTIVE }),
            await CreateQuery({ Query: DB_STRINGS.CREATE.BROADCASTIFY }),
            await CreateQuery({ Query: DB_STRINGS.CREATE.ACTIVE_INDEX }),
            await CreateQuery({ Query: DB_STRINGS.CREATE.SHAPEFILE_INDEX }),
        ])
    }
    await Promise.all([
        await BuildShapefiles(),
        await BuildPopulation(),
        await BuildConus(),
        await BuildBroadcastify(),
    ])

    if (cMissingTables) {
        SetLog({ Message: ENUM_STRINGS.DATABASE.BUILD_COMPLETE });
        SetLog({ Type: `DEBUG`, Message: `[${(Math.round((performance.now() - dbgTickA) * 100) / 100).toFixed(1)}ms] CreatePopulatedDatabase` })
    }
}


