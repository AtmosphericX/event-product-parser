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
import { TypeEventProperties } from "TypesEvent/Properties"

interface GetHeaderOptions {
    Properties: TypeEventProperties
    VTEC?: TypeVTEC
    Type: {
        Type: string
        Prefix: string
    }
}

export const GetEventHeader = ({ Properties, VTEC, Type }: GetHeaderOptions): string => {
    const properties = Properties
    const vtec = VTEC ?? null
    const ugc = properties.geocode.ugc != null ? properties.geocode.ugc.join(`-`) : `0`;
    return `ZCZC-ATMOSX-${Type?.Prefix}-${ugc}-${vtec?.status ?? `Issued`}-${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}-${properties.geocode.office.office ?? `KWNS`}`
}