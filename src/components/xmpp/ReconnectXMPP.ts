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
import { SetEventEmit } from "@Utilities/SetEventEmit"
import { SetWarning } from "@Utilities/SetWarning"

export const ReconnectXMPP = async (interval: number): Promise<void> => {
    const settings = Bootstrap.Settings as TypeSettings;
    const last = Date.now() - Bootstrap.Cache.LastStanzaTime
    if (interval < 15) { 
        SetWarning({ Message: `Reconnection interval of ${interval} seconds is too low, setting to 15 seconds` })
        interval = 15;
        Bootstrap.Settings.NOAAWeatherWireServiceSettings.ReconnectionSettings.ReconnectionInterval = 15;
    }
    const reconnectThreshold = interval * 1e3
    if ((!Bootstrap.Cache.Connected && !Bootstrap.Cache.Hault) || !Bootstrap.Session) { 
        return; 
    }
    if (last > reconnectThreshold) {
        if (!Bootstrap.Cache.Reconnecting) {
            Bootstrap.Cache.Reconnecting = true;
            Bootstrap.Cache.Connected = false;
            Bootstrap.Cache.TotalReconnects += 1;
            try { 
                SetEventEmit({
                    Event: `onServiceStatus`,
                    Metadata: {
                        Message: `Attempting to reconnect to XMPP Service (Reconnect Attempt ${Bootstrap.Cache.TotalReconnects})`,
                        Data: {
                            Last: last,
                            Nickname: settings.NOAAWeatherWireServiceSettings.CredentialSettings.Nickname
                        },
                        Type: `reconnect`,
                        Error: true
                    }, Message: `Attempting to reconnect to XMPP Service (Reconnect Attempt ${Bootstrap.Cache.TotalReconnects})`,
                })
                await Bootstrap.Session.stop().catch(() => {});
                await Bootstrap.Session.start().catch(() => {});
            } catch (error) {
                SetWarning({ Message: `XMPP Reconnect Failed - ${(error as Error).message}` })
            } finally { 
                Bootstrap.Cache.Reconnecting = false;
            }
        }
    }
}
