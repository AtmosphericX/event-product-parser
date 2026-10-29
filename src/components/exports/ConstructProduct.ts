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

import { ENUM_REGULAR_EXPRESSIONS } from "@Enums/RegularExpressions"
import { GetStanzaType } from "@Components.Stanza/GetStanzaType"
import { IngestStanza } from "@Components.Events/managers/IngestStanza"

interface CONSTRUCT_PRODUCT {
    Message: string
    Tracking?: string
    PIL?: string
}

export const ConstructProduct = ({ Message, Tracking = `ATMSX.XX.XX.XXXX`, PIL = `XX`}: CONSTRUCT_PRODUCT): void => {
    const cCAP = Message.includes(`<?xml`) && Message.includes(`<areaDesc>`);
    const cVTEC = Message.match(ENUM_REGULAR_EXPRESSIONS.VTEC) != null;
    const cUGC = Message.match(ENUM_REGULAR_EXPRESSIONS.UGC_PT1) != null;
    const [ cOffice, cProduct, __, cID ] = Tracking.split(`.`);
    const cAttributes = { 
        xmlns: `manual_product.${cID ?? Math.random().toString(36).substring(2, 10)}`,
        id: cID ?? Math.random().toString(36).substring(2, 10),
        issue: new Date().toISOString(),
        ttaaii: cOffice ?? `XXXX`,
        cccc: cProduct ?? `XXXX`,
        awipsid: PIL
    }
    const { Raw, Name, ID, Discovered } = GetStanzaType({ Attributes: cAttributes });
    if (Name == null) return null;
    const cValidated = {
        Message: Message,
        Attributes: cAttributes,
        Metadata: { CAP: cCAP, VTEC: cVTEC, UGC: cUGC, Wire: true },
        Product: { Raw, Name, ID, Discovered: Discovered }
    }
    IngestStanza({ Stanza: cValidated });
}