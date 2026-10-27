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

import { TYPE_ATTRIBUTES } from "Types.Stanza/StanzaAttributes"
import { TYPE_VTEC } from "Types.Components/ValidTimeEventCode"
import { ENUM_FORECAST_OFFICES } from "@Enums.Properties/Offices"

interface GET_EVENT_OFFICE_OPTIONS {
    Attributes: TYPE_ATTRIBUTES
    WMO: string
    VTEC: TYPE_VTEC
}

interface GET_EVENT_OFFICE_RESPONSE {
    office: string
    name: string
}

export const GetEventOffice = ({ Attributes, WMO, VTEC }: GET_EVENT_OFFICE_OPTIONS): GET_EVENT_OFFICE_RESPONSE => {
    const cOffice = VTEC != null ? VTEC?.Tracking?.split(`.`)[0] : Attributes?.cccc ?? (WMO != null ?  (Array.isArray(WMO) ? WMO?.[0] : WMO) : null)
    const cName = ENUM_FORECAST_OFFICES?.[cOffice] ?? null;
    return { office: cOffice, name: cName };
}