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

import { TypeAttributes } from "TypesEvent/Attributes"
import { EnumAWIPS } from "@Enums/AWIPS"

interface GetAwipsTypeOptions { 
    Attributes: TypeAttributes
}

interface GetAwipsTypeResponse { 
    Type: string
    Prefix: string
    Discovered: boolean
}

export const GetAwipsType = ({ Attributes }: GetAwipsTypeOptions): GetAwipsTypeResponse => {
    if (!Attributes.awipsid) { 
        return { 
            Type: null, 
            Prefix: null,
            Discovered: false
        }
    }
    for (const [prefix, type] of Object.entries(EnumAWIPS)) {
        if (Attributes.awipsid.startsWith(prefix)) {
            return { Type: type, Prefix: prefix, Discovered: true }
        }
    }
    return { Type: Attributes.awipsid, Prefix: Attributes.awipsid, Discovered: false }
}