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
import { TypeVTEC } from "TypesEvent/VTEC"
import { EnumICAO } from "@Enums/ICAO"

interface GetOfficeOptions { 
    Attributes: TypeAttributes
    Organization: string
    VTEC: TypeVTEC
}

interface GetOfficeResponse { 
    office: string | null
    name: string | null
}

export const GetEventOffice = ({ Attributes, Organization, VTEC }: GetOfficeOptions): GetOfficeResponse => {
    const office = VTEC != null 
        ? VTEC?.tracking?.split(`.`)[0] : (Attributes?.cccc ??
            (Organization != null ? 
                (Array.isArray(Organization) ? Organization?.[0] : Organization) 
        : null));
    const name = EnumICAO?.[office] ?? null;
    return { office, name };
}