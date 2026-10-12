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
import { GetLocations } from "@ParsingUGC/GetLocations"

interface SetEventLocationMetadataOptions {
    Zones: string[]
    Event: TypeEvent
}

interface SetEventLocationMetadataResponse {
    Locations: string
    LocationsArray: string[]
    UGC: string[]
    Regions: string[]
    RegionsString: string
}

export const SetEventLocationMetadata = async ({ Zones, Event }: SetEventLocationMetadataOptions): Promise<SetEventLocationMetadataResponse> => {
    const locations = await GetLocations(Zones)
    return { 
        Locations: locations?.join(`; `) ?? null,
        LocationsArray: locations ?? [],
        UGC: Zones,
        Regions: [...new Set(
            Zones
            ?.map((location: string) => location.match(/^([A-Z]{2})[CZ](\d{3})$/)?.[1])
            .filter(Boolean) ?? []
        )],
        RegionsString: (() => {
            const abbrs = [...new Set(Zones?.map((l: string) => l.match(/^([A-Z]{2})[CZ](\d{3})$/)?.[1]).filter(Boolean) ?? [])];
            return abbrs.length ? abbrs.join(`-`) : null;
        })()        
    }
}