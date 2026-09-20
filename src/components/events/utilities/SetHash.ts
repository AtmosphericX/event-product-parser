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
import { TypeHash } from "TypesStandard/Hash"
import { Bootstrap } from "@Bootstrap"

interface SetHashOptions {
    Event: TypeEvent
    Entry: TypeHash
}

export const SetHash = ({ Event, Entry }: SetHashOptions): void => {
    if (!Entry) {
        Bootstrap.Cache.Hashes.push({
            Tracking: Event.properties.metadata.tracking,
            Hashes: [Event.properties.metadata.hash],
            Expires: Event.properties.expires
        });
        return;
    }

    Entry.Hashes.push(Event.properties.metadata.hash);
    Entry.Expires = Event.properties.expires;
}