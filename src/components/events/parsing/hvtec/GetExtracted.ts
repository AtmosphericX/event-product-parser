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

import { TYPE_HVTEC } from "Types/components/HyrdrolicValidTimeEventCode"
import { ENUM_REGULAR_EXPRESSIONS } from "@Enums/RegularExpressions"
import { ENUM_FLOOD_SEVERITY } from "@Enums.Flooding/FloodSeverity"
import { ENUM_FLOOD_CAUSES } from "@Enums.Flooding/FloodCauses"
import { ENUM_FLOOD_RECORDS } from "@Enums.Flooding/FloodRecords"
import { SetLog } from "@Components.Utilities/SetLog";

interface GET_EXTRACTED_OPTIONS { 
    Message: string
}

export const GetExtracted = ({ Message }: GET_EXTRACTED_OPTIONS): TYPE_HVTEC[] | null => {
    const dbgTickA = performance.now();
    const cMatch = Message.match(ENUM_REGULAR_EXPRESSIONS.HVTEC) ?? [];
    const cHVTECS: TYPE_HVTEC[] = [];
    for (const cHVTEC of cMatch) {
        const cSub = cHVTEC.split(`.`);
        if (cSub?.length < 7) continue;
        cHVTECS.push({
            Raw: cHVTEC,
            Severity: ENUM_FLOOD_SEVERITY[cSub[1]],
            Cause: ENUM_FLOOD_CAUSES[cSub[2]],
            Record: ENUM_FLOOD_RECORDS[cSub[6]],
        })
    }
    SetLog({ Type: `DEBUG`, Message: `[${(Math.round((performance.now() - dbgTickA) * 100) / 100).toFixed(1)}ms] GetExtracted (HVTEC)` });
    return cHVTECS?.length > 0 ? cHVTECS : null;
}