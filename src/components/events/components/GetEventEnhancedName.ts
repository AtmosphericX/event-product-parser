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

import { TypeEvent } from "TypesEvent/Event"
import { EnumEnhanced } from "@Enums/Enhanced"

export const GetEventEnhancedName = (event: TypeEvent): string => {
    let name = event?.properties?.event;
    const damage = event?.properties?.parameters?.damage_threat ?? event?.properties?.parameters?.flood_threat
    const tornado = event?.properties?.parameters?.tornado_threat;
    const pdswatch = event?.properties?.watch_parameters?.pds_watch;
    const description = event?.properties?.description?.toLowerCase()
    for (const [eventKey, eventConfig] of Object.entries(EnumEnhanced)) {
        if (eventKey !== name) continue;
        for (const [paramKey, paramValue] of Object.entries(eventConfig)) {
            let matches = true;
            if (paramValue?.description) {
                if (!description.includes(paramValue.description.toLowerCase())) matches = false;
            }
            if (paramValue?.damage) {
                if (paramValue.damage !== damage) matches = false;
            }
            if (paramValue?.tornado) {
                if (paramValue.tornado !== tornado) matches = false;
            }
            if (paramValue?.pdswatch) {
                if (paramValue.pdswatch !== pdswatch) matches = false;
            }
            if (matches) {
                name = paramKey;
                break;
            }
        }
    }
    return name;
}