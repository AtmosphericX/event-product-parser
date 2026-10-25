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
import { TYPE_HVTEC } from "Types/components/HyrdrolicValidTimeEventCode"
import { TYPE_UGC } from "Types/components/UniversalGeographicCode"
import { TYPE_PROPERTIES } from "Types/event/Properties"
import { TYPE_ATTRIBUTES } from "Types/stanza/StanzaAttributes"
import { TYPE_STANZA_COMPILED } from "Types/stanza/StanzaValidated"
import { TYPE_EVENT } from "Types/event/Event"
import { Bootstrap } from "@Bootstrap"
import { GetEventProperties } from "@Components.Events.Building/GetEventProperties"
import { GetEventTracking } from "@Components.Events.Building/GetEventTracking"
import { GetEventHeader } from "@Components.Events.Building/GetEventHeader"
import { GetEventTheme } from "@Components.Events.Building/GetEventTheme"


interface GET_EVE2NT_BUILDING_OPTIONS {
    Stanza: TYPE_STANZA_COMPILED
    Type: "VTEC" | "TEXT" | "CAP" | "API"
    Event?: string
    Status?: string
    Issued?: string
    Expires?: string
    Message?: string
    VTEC?: TYPE_VTEC
    UGC?: TYPE_UGC
    HVTEC?: TYPE_HVTEC[]
    Properties?: TYPE_PROPERTIES
    Attributes?: TYPE_ATTRIBUTES
}

interface GET_EVENT_BUILDING_OPTIONS {
    Type: "VTEC" | "TEXT" | "CAP"
    Stanza?: TYPE_STANZA_COMPILED
    Product: string
    Status: string
    Issued: string
    Expires: string
    Message: string
    Cap?: unknown
    VTEC?: TYPE_VTEC
    UGC?: TYPE_UGC
    HVTEC?: TYPE_HVTEC[]
}
    
export const GetEventBuilding = ({Type, Stanza, Product, Status, Issued, Expires, Message, Cap, VTEC, UGC, HVTEC}: GET_EVENT_BUILDING_OPTIONS): void => {
    const { Attributes } = Stanza ?? {}
    

}
