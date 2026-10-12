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

import { TypeSettings } from "TypesStandard/Settings"
import { Bootstrap } from "@Bootstrap"
import { GetEventGeometry } from "@BuilderComponents/GetEventGeometry"
import { GetCleanedEvent } from "@BuilderComponents/GetCleanedEvent"
import { SetSettings } from "@Utilities/SetSettings"
import { CreateErrorHandler } from "@Utilities/CreateErrorHandler"
import { GenerateAudioMessage } from "@Audio/GenerateAudioMessage"
import { GenerateGraphic } from "@Image/GenerateGraphic"
import { SetNode } from "@Exports/SetNode"
import { GetEvents } from "@Exports/GetEvents"
import { GetNodes } from "@Exports/GetNodes"
import { ManualEvent } from "@Exports/ManualEvent"
import { GetRandomEvent } from "@Exports/GetRandomEvent"
import { QueryStanza } from "@Exports/QueryStanza"
import { ClearEvents } from "@Exports/ClearEvents"
import { StartService } from "@Exports/StartService"
import { StopService } from "@Exports/StopService"
import { GetVersion } from "@Exports/GetVersion"

export class Manager { 
    public constructor(settings: TypeSettings) { 
        CreateErrorHandler();
        SetSettings(settings);
        StartService();
    }

    public on(event: string, callback: () => void) {
        Bootstrap.Listener.on(event, callback)
        return () => { void Bootstrap.Listener.off(event, callback) };
    }
}

export default Manager;
export type { TypeEvent } from "TypesEvent/Event"
export { 
    SetSettings, GetEventGeometry, ManualEvent,
    GetCleanedEvent, StopService, ClearEvents,
    StartService, SetNode, GetRandomEvent, GetVersion,
    GetEvents, GetNodes, GenerateAudioMessage, GenerateGraphic,
    QueryStanza
}


