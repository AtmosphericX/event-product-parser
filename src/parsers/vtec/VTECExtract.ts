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

import { TypeVTEC } from "TypesEvent/VTEC"
import { EnumExpressions } from "@Enums/Expressions"
import { EnumProducts } from "@Enums/Products"
import { EnumEvents } from "@Enums/Events"
import { EnumActions } from "@Enums/Actions"
import { EnumStatus } from "@Enums/Status"
import { GetExpiry } from "@ParsingVTEC/GetExpiry"

export const VTECExtract = (message: string): TypeVTEC[] | null => {
    if (!message) return null;
    const getVTECs = message.match(EnumExpressions.vtec) ?? [];
    const vtecs: TypeVTEC[] = [];
    for (const vtec of getVTECs) {
        const sub = vtec.split(`.`);
        if (sub?.length < 7) continue;
        const dates = sub[6]?.split(`-`);
        vtecs.push({
            raw: vtec,
            type: EnumProducts[sub[0]],
            tracking: `${sub[2]}.${sub[3]}.${sub[4]}.${sub[5]}`,
            event: `${EnumEvents[sub[3]]} ${EnumActions[sub[4]]}`,
            status: EnumStatus[sub[1]],
            wmo: message.match(EnumExpressions.wmo)?.[0] ?? null,
            expires: GetExpiry(dates),
            watch: (sub[4] == `A` || sub[4] == `Y`) && (sub[3] == `TO` || sub[3] == `SV`),
            wou: sub[2] == `KWNS` ? true : false
        })
    }
    return vtecs.length > 0 ? vtecs : null;
}