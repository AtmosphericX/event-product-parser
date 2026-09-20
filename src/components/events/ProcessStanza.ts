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

import { TypeStanzaCompiled } from "TypesStandard/StanzaCompiled"
import { TypeSettings } from "TypesStandard/Settings"
import { Bootstrap } from "@Bootstrap"
import { ParseText } from "@Events/ParseText"
import { ParseUGC } from "@Events/ParseUGC"
import { ParseVTEC } from "@Events/ParseVTEC"
import { ParseAPI } from "@Events/ParseAPI"
import { FilterEvents } from "@Builder/FilterEvents"

export const ProcessStanza = async (Stanza: TypeStanzaCompiled): Promise<void | string> => {
    const settings = Bootstrap.Settings as TypeSettings
    const StanzaSettings = settings.NOAAWeatherWireServiceSettings.StanzaSettings;

    const isVtecEvent = (Stanza.VTEC && Stanza.UGC)
    const isUgcEvent = (!Stanza.VTEC && Stanza.UGC)
    const isTextEvent = (!Stanza.VTEC && !Stanza.UGC)
    
    const isNWWS = (Stanza.NWWS)
    switch (true) {
        case (!isNWWS):
            await ParseAPI(Stanza)
            break;
        case (isNWWS && !StanzaSettings.DisableVTEC && isVtecEvent):
            await ParseVTEC(Stanza)
            break;
        case (isNWWS && !StanzaSettings.DisableUGC && isUgcEvent):
            await ParseUGC(Stanza)
            break;
        case (isNWWS && !StanzaSettings.DisableText && isTextEvent):
            await ParseText(Stanza)
            break;
    }
    await FilterEvents(Bootstrap.Cache.Parsed)
    return 'nothing picked';
}