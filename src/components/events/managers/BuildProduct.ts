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

import { TYPE_EVENT } from "Types.Event/Event"
import { TYPE_STANZA_COMPILED } from "Types.Stanza/StanzaValidated"
import { GetEventTracking } from "@Components.Events.Building/GetEventTracking"
import { GetEventTheme } from "@Components.Events.Building/GetEventTheme"
import { GetEventLocationMetdata } from "@Components.Events.Building/GetEventLocationMetdata"


interface GET_BUILT_PRODUCT_OPTIONS {
    Type: `VTEC` | `TEXT` | `CAP`
    Issued: string
    Expires: string
    Stanza: TYPE_STANZA_COMPILED
    Prebuild: TYPE_EVENT
    
}

export const GetBuiltProduct = ({ Type, Issued, Expires, Stanza, Prebuild }: GET_BUILT_PRODUCT_OPTIONS): TYPE_EVENT => {
    const { temp, properties } = Prebuild;
    const { id, vtec, locations, polygon } = temp;
    const { issued, expires, event, status} = properties;
    const { wmo, zones } = properties?.geography ?? {};
    const cTracking = GetEventTracking({ Type, Stanza, VTEC: vtec, Office: wmo, ID: id});
    const cLocation = GetEventLocationMetdata({ Zones: zones })
    const cBuild: TYPE_EVENT = {
        type: `Feature`,
        geometry: null,
        properties: {
            event: event,
            parent: event,
            status: status,
            issued: issued,
            expires: expires,
            theme: GetEventTheme({ Event: event }),
            ...cLocation,
            ...properties
        }
    }

    console.log(cBuild)

    return cBuild;

}