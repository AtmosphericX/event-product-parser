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
import { SetWarning } from "@Utilities/SetWarning"
import { ClearEvents } from "@Exports/ClearEvents"
import { EmitThread } from "@Utilities/EmitThread"
import { DeployXMPP } from "@XMPP/DeployXMPP"
import { InitializeDatabase } from "@Database/InitializeDatabase"
import { GetCachedEvents } from "@BuilderUtilities/GetCachedEvents"
import { SetEventPolygonNodes } from "@Builder/utilities/SetEventPolygonNodes"
import { UpdateEvents } from "@BuilderUtilities/UpdateEvents"
import { Cron } from "croner"

export const StartService = async (): Promise<void> => {
    const { DeveloperDisableEvents, EnableWireService } = Bootstrap.Settings;

    if (Bootstrap.Ready) { 
        return SetWarning({ Message: `Service is already running!` }) 
    }

    await Promise.all([
        Bootstrap.Ready = true,
        await InitializeDatabase(),
        !DeveloperDisableEvents && EnableWireService ? await DeployXMPP() : null,
        !DeveloperDisableEvents && EnableWireService ? await GetCachedEvents() : null,   
        await EmitThread(),
        Bootstrap.Job = new Cron(`*/15 * * * * *`, async () => {
            await EmitThread();
        }),
        Bootstrap.Job = new Cron(`* * * * * *`, async () => { 
            await SetEventPolygonNodes();
            await UpdateEvents();
        })
    ])
    if (DeveloperDisableEvents) { 
        SetWarning({ Message: `DeveloperDisableEvents is enabled, no events will be processed!` }) 
    }
}