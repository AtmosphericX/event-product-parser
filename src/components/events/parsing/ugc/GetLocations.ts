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
import { SetLog } from "@Components.Utilities/SetLog";
import { CreateQuery } from "@Components.Database/CreateQuery";
import { GetCache } from "@Components.Events.UGC/GetCache"
import { SetCache } from "@Components.Events.UGC/SetCache"

interface GET_LOCATIONS_OPTIONS { 
    Zones: string[]
}

type TYPE_ROW = { ID: string, Location: string }

export const GetLocations = ({ Zones }: GET_LOCATIONS_OPTIONS): string[] => {
    const dbgTickA = performance.now();
    const cUnique = Array.from(new Set(Zones));
    const cFound: string[] = [];
    const cMissing: string[] = [];
    for (const cZone of cUnique) {
        const cCached = GetCache({ UGC: cZone });
        if (cCached) { 
            cCached.forEach((cLocation: string) => cFound.push(cLocation));
        } else { 
            cMissing.push(cZone);
        }
    }
    if (cMissing.length > 0) {
        const cRows = CreateQuery({
            Query: ENUM_STRINGS.DB_STRINGS.QUERIES.LOCATION_LOOKUP.replace(/%s/, cMissing.map(() => `?`).join(`,`)),
            Parameters: cMissing
        }) as TYPE_ROW[];
        for (const cRow of cRows) {
            SetCache({ Key: cRow.ID, Value: [cRow.Location] });
            cFound.push(cRow.Location)
        }
    }
    SetLog({ Type: `DEBUG`, Message: `[${(Math.round((performance.now() - dbgTickA) * 100) / 100).toFixed(1)}ms] GetLocations` });
    return Array.from(new Set(cFound));
}