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

import { TYPE_STANZA } from "Types.Stanza/Stanza"
import { TYPE_STANZA_COMPILED } from "Types.Stanza/StanzaValidated"
import { ENUM_REGULAR_EXPRESSIONS } from "@Enums/RegularExpressions"
import { GetStanzaType } from "@Components.Stanza/GetStanzaType"

interface VALIDATE_OPTIONS { 
    Stanza: TYPE_STANZA
}

export const ValidateStanza = ({ Stanza }: VALIDATE_OPTIONS): TYPE_STANZA_COMPILED => {
    if (!Stanza.is(`message`)) return null;
    const cb = Stanza?.getChild(`x`) as TYPE_STANZA;
    if ((!cb || !cb.children) || !cb.attrs?.awipsid || !cb.attrs?.awipsid.length) return null;
    const cAttributes = cb.attrs;
    const cMessage = unescape(cb.children?.[0]);
    const cCAP = cMessage.includes(`<?xml`) && cMessage.includes(`<areaDesc>`);
    const cVTEC = cMessage.match(ENUM_REGULAR_EXPRESSIONS.VTEC) != null;
    const cUGC = cMessage.match(ENUM_REGULAR_EXPRESSIONS.UGC_PT1) != null;
    const { Raw, Name, ID, Discovered } = GetStanzaType({ Attributes: cAttributes });
    if (Name == null) return null;
    return { 
        Message: cMessage,
        Attributes: cAttributes,
        Ignored: false,
        Metadata: { CAP: cCAP, VTEC: cVTEC, UGC: cUGC, Wire: true },
        Product: { Raw, Name, ID, Discovered: Discovered }
    }
}