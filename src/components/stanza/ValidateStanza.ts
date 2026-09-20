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

import { TypeStanza } from "TypesEvent/Stanza"
import { TypeStanzaCompiled } from "TypesStandard/StanzaCompiled"
import { EnumExpressions } from "@Enums/Expressions"
import { GetAwipsType } from "@Stanza/GetAwipsType"

interface ValidateStanzaOptions { 
    Stanza: TypeStanza
}

export const ValidateStanza = ({ Stanza }: ValidateStanzaOptions): TypeStanzaCompiled => {
    if (Stanza.is(`message`)) {
        const cb = Stanza.getChild(`x`) as TypeStanza;
        if (cb && cb.children) {
            const message = unescape(cb.children[0]);
            const attributes = cb.attrs;
            if (attributes.awipsid && attributes.awipsid.length > 1) { 
                const isCapEvent = message.includes(`<?xml`);
                const isCapAreaDescription = message.includes(`<areaDesc>`)
                const isVTEC = message.match(EnumExpressions.vtec) != null;
                const isUGC = message.match(EnumExpressions.ugc1) != null;
                const getType = GetAwipsType({ Attributes: attributes})
                if (getType.Type != null) {
                    return { 
                        Message: message, 
                        Attributes: attributes, 
                        CapEvent: isCapEvent, 
                        VTEC: isVTEC, 
                        UGC: isUGC, 
                        CapAreaDescription: isCapAreaDescription, 
                        Ignored: false, 
                        NWWS: true, 
                        Type: {
                            Type: getType.Type, 
                            Prefix: getType.Prefix,
                            Discovered: getType.Discovered
                        }
                    }
                }
            }
        }
    }
    return { Ignored: true}
}