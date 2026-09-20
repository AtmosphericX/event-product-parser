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

import { TypeUGC } from "TypesStandard/UGC"
import { GetHeader } from "@ParsingUGC/GetHeader"
import { GetZones } from "@ParsingUGC/GetZones"
import { GetExpiry } from "@ParsingUGC/GetExpiry"
import { GetLocations } from "@ParsingUGC/GetLocations"

export const UGCExtract = async (message: string): Promise<TypeUGC> => {
    const expires = GetExpiry(message)
    const head = GetHeader(message);
    const ugcs = GetZones(head);
    const areas = await GetLocations(ugcs)
    if (!head || ugcs?.length == 0) return;
    return { 
        Zones: ugcs,
        Locations: areas, 
        Expires: expires
    }
}