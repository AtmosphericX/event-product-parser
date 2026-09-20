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
import { SetEventEmit } from "@Utilities/SetEventEmit"
import { RemoveEvents } from "@Builder/RemoveEvents"

export const UpdateEvents = async (selected?: TypeEvent): Promise<void> => {
    const events = Bootstrap.Cache.Events.features;
    async function update(event: TypeEvent) {
        if (new Date(event.properties.expires) < new Date()) {
            SetEventEmit({ Event: `onExpiredProduct`, Metadata: event })
            await RemoveEvents({ Event: event, IsTimeBasedExpiration: true })
        }
    }
    if (!selected) { await Promise.all(events.map(async (event) => { await update(event) })) } 
    if (selected) { await update(selected) }
}