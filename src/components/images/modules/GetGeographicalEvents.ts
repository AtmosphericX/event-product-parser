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
import { Bootstrap } from "@Bootstrap"

interface GetGeographicalEventsOptions {
    Regions: string[] | null
    Event?: TypeEvent
}

export const GetGeographicalEvents = ({ Regions, Event }: GetGeographicalEventsOptions): TypeEvent[] => {
    const events = Bootstrap.Cache.Events.features
    if (Event) { return [Event] }
    if (!Regions) { return events }
    return events.filter(event => {
        const ugcs = event.properties?.geocode?.ugc ?? []
        return Regions.some(region => {
            const normalized = region.trim().toUpperCase()
            const ugcMatch = normalized.match(/^([A-Z]{2})[CZ](\d{3})$/)
            if (ugcMatch) {
                return ugcs.some(ugc => ugc.trim().toUpperCase() === normalized)
            }
            const stateMatch = normalized.match(/^[A-Z]{2}$/)
            if (stateMatch) {
                return ugcs.some(ugc => ugc.trim().toUpperCase().startsWith(`${normalized}Z`) || ugc.trim().toUpperCase().startsWith(`${normalized}C`))
            }
            return false
        })
    })

}