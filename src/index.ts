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

import { TYPE_SETTINGS } from "Types.Components/Settings"
import { ENUM_STRINGS } from "@Enums/Strings"
import { Bootstrap } from "@Bootstrap"
import { CreateErrorHandler } from "@Components.Utilities/CreateErrorHandler"
import { SetLog } from "@Components.Utilities/SetLog"
import { SetSettings } from "@Components.Utilities/SetSettings"
import { InitializeDatabase } from "@Components.Database/InitializeDatabase"
import { CreatePopulatedDatabase } from "@Components.Database/CreatePopulatedDatabase"
import { DeployService } from "@Components.Classes/DeployService"
import { Cron } from "croner"

export class Manager { 
    public constructor(settings: TYPE_SETTINGS) { 
        CreateErrorHandler();
        SetSettings(settings);
    }

    public async start(): Promise<void> { 
        const { WeatherWireService, WeatherWireServiceSettings, DeveloperSettings} = Bootstrap.Settings;
        const { DisableEvents } = DeveloperSettings;

        if (Bootstrap.ServiceReady) { 
            return SetLog({ Message: ENUM_STRINGS.SERVICE.ALREADY_STARTED });
        }

        SetLog({ Type: `DEBUG`, Message: `@atmosx/event-product-parser: ${this.version()}` }) 
        Bootstrap.ServiceReady = true;
        await Promise.all([
            await InitializeDatabase(),
            await CreatePopulatedDatabase(),
            WeatherWireService && !DisableEvents ? new DeployService() : null,
            Bootstrap.Scheduler = new Cron(`*/15 * * * * *`, async () => {}), // Thread Caller
            Bootstrap.Scheduler = new Cron(`* * * * * *`, async () => {}) // Event Polygon / Node Updater
        ])
    }

    public async stop(): Promise<void> {
        if (!Bootstrap.ServiceReady) {
            return SetLog({ Message: ENUM_STRINGS.SERVICE.NOT_STARTED });
        }
        Bootstrap.ServiceReady = false;
        if (Bootstrap.Scheduler) { 
            Bootstrap.Scheduler = null;
        }
    }

    public on(Event: string, Callback: () => void) {
        Bootstrap.Listener.on(Event, Callback)
        return () => { void Bootstrap.Listener.off(Event, Callback) };
    }

    public version(): string { 
        return Bootstrap.Version;
    }
}

export default Manager;
export { }


