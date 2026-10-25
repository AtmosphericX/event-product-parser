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

import { TYPE_UGC } from "Types/components/UniversalGeographicCode"
import { GeographicalCodeParsing } from "@Components.Events.Parsing.Classes/GeographicalCodeParsing"

interface GET_EVENT_LOCATION_METADATA_OPTIONS {
    Zones: string[],
    UGC?: TYPE_UGC
}

interface GET_EVENT_LOCATION_METADATA_RESPONSE { 
    locations: string[]
    states: string[]
}
    
export const GetEventLocationMetdata = ({ Zones, UGC }: GET_EVENT_LOCATION_METADATA_OPTIONS): GET_EVENT_LOCATION_METADATA_RESPONSE => {
    const locations = UGC ? UGC?.Locations : new GeographicalCodeParsing({}).GetZoneLocations({ Zones: Zones })
    return {
        locations: locations,
        states: [...new Set(
            Zones
            ?.map((lLocation: string) => lLocation.match(/^([A-Z]{2})[CZ](\d{3})$/)?.[1])
            ?.filter(Boolean) ?? []
        )]
    }
}