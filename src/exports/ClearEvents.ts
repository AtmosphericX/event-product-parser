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

import { EnumStrings } from "@Enums/Strings"
import { Bootstrap } from "@Bootstrap"
import { SetEventEmit } from "@Utilities/SetEventEmit"
import { SetWarning } from "@Utilities/SetWarning"

export const ClearEvents = (): void => {
    if (!Bootstrap.Ready) { 
        SetWarning({ Message: EnumStrings.nostart})
        return
    }
    Bootstrap.Cache.Events.features = [];
    Bootstrap.Cache.Hashes = [];
    SetEventEmit({
        Event: `onEventCache`,
        Metadata: Bootstrap.Cache.Events,
        Message: `Manually cleared event cache.`
    })
}