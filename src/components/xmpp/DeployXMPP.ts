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
import { OnlineXMPP } from "@XMPP/OnlineXMPP"
import { OfflineXMPP } from "@XMPP/OfflineXMPP"
import { ErrorXMPP } from "@XMPP/ErrorXMPP"
import { StanzaXMPP } from "@XMPP/StanzaXMPP"
import { SetEventEmit } from "@Utilities/SetEventEmit"
import { client } from "@XMPP/client"

export const DeployXMPP = async (): Promise<void> => {
    let session;
    const settings = Bootstrap.Settings as TypeSettings
    settings.NOAAWeatherWireServiceSettings.CredentialSettings.Nickname 
        ??= settings.NOAAWeatherWireServiceSettings.CredentialSettings.Username;
    session = Bootstrap.Session = client({
        service: 'xmpp://nwws-oi.weather.gov',
        domain: 'nwws-oi.weather.gov',
        username: settings.NOAAWeatherWireServiceSettings.CredentialSettings.Username as string,
        password: settings.NOAAWeatherWireServiceSettings.CredentialSettings.Password as string
    })
    try {
        await OfflineXMPP();
        await ErrorXMPP();
        await StanzaXMPP();
        await OnlineXMPP();
        await session.start()
    } catch (error) {
        SetEventEmit({
            Event: `onServiceStatus`,
            Metadata: {
                Message: `Error occured while starting XMPP Session: ${error}`,
                Data: {},
                Type: `error`,
                Error: true 
            },
        })
    }
}
