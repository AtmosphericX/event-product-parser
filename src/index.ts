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
import { SetEventEmit } from "@Utilities/SetEventEmit"
import { SetWarning } from "@Utilities/SetWarning"
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
        this.ErrorHandler(); StartService(settings) 
    }

    public on(event: string, callback: () => void) {
        Bootstrap.Listener.on(event, callback)
        return () => { void Bootstrap.Listener.off(event, callback) };
    }

    private ErrorHandler() {
        process.on('uncaughtException', (error: any) => {
            const _IGNORED = [
                'ETIMEDOUT', 
                'ECONNRESET', 
                'EHOSTUNREACH', 
                'ENOTFOUND', 
                'ECONNREFUSED', 
                'EPIPE', 
                'EADDRINUSE', 
                'EALREADY', 
                'EACCES', 
                'EAGAIN', 
                'EHOSTDOWN', 
                'STARTTLS_FAILURE'
            ];
            if (_IGNORED.includes(error?.code)) { 
                SetEventEmit({
                    Event: `onServiceStatus`,
                    Metadata: {
                        Message: `Ignored Critical Error: ${error?.code ?? 'Unknown error code'}. This may indicate a connection issue. Attempting to continue...`,
                        Data: {},
                        Type: `error`,
                        Error: true 
                    }
                })
            }
            console.log(`Uncaught Exception: ${error instanceof Error ? error.stack ?? error.message : String(error)}`);
            SetWarning({Message: `Uncaught Exception: ${error instanceof Error ? error.stack ?? error.message : String(error)}`})
        })
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


