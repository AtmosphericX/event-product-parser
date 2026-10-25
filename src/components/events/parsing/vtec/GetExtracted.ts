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

import { TYPE_VTEC } from "Types/components/ValidTimeEventCode"
import { ENUM_REGULAR_EXPRESSIONS } from "@Enums/RegularExpressions"
import { ENUM_VTEC_PRODUCTS } from "@Enums.Products/VTECProducts"
import { ENUM_VTEC_STATUS } from "@Enums.Products/VTECStatus"
import { ENUM_VTEC_ACTIONS } from "@Enums.Products/VTECActions"
import { ENUM_VTEC_TYPES } from "@Enums.Products/VTECTypes"
import { SetLog } from "@Components.Utilities/SetLog";
import { GetExpiry } from "@Components.Events.VTEC/GetExpiry";

interface GET_EXTRACTED_OPTIONS { 
    Message: string
}

export const GetExtracted = ({ Message }: GET_EXTRACTED_OPTIONS): TYPE_VTEC[] | null => {
    const dbgTickA = performance.now();
    const cMatch = Message.match(ENUM_REGULAR_EXPRESSIONS.VTEC) ?? [];
    const cVTECS: TYPE_VTEC[] = [];
    for (const cVtec of cMatch) {
        const cSub = cVtec.split(`.`);
        const cDates = cSub[6]?.split(`-`);
        if (cSub?.length < 7) continue;
        cVTECS.push({
            Raw: cVtec,
            Product: ENUM_VTEC_TYPES[cSub[0]],
            Name: `${ENUM_VTEC_PRODUCTS[cSub[3]]} ${ENUM_VTEC_ACTIONS[cSub[4]]}`,
            Status: ENUM_VTEC_STATUS[cSub[1]],
            Office: cSub[2] ?? null,
            Expires: new Date(GetExpiry({ Dates: cDates})),
            Watch: {
                SPC: (cSub[4] == `A` || cSub[4] == `Y`) && (cSub[3] == `TO` || cSub[3] == `SV`),
                NHC: (cSub[4] == `A` || cSub[4] == `Y`) && (cSub[3] == `HU` || cSub[3] == `TR`),
                Status: [`KWNS`, `KNHC`].includes(cSub[2])
            },
            Tracking: `${cSub[2]}.${cSub[3]}.${cSub[4]}.${cSub[5]}`,
        })
    }
    SetLog({ Type: `DEBUG`, Message: `[${(Math.round((performance.now() - dbgTickA) * 100) / 100).toFixed(1)}ms] GetExtracted (VTEC)` });
    return cVTECS?.length > 0 ? cVTECS : null;
}