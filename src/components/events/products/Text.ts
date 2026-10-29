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

import { TYPE_STANZA_COMPILED } from "Types.Stanza/StanzaValidated"
import { GeographicalCodeParsing } from "@Components.Events.Parsing/GeographicalCode"
import { TextProductParsing } from "@Components.Events.Parsing/TextProduct"
import { GetEventProperties } from "@Components.Events.Building/GetEventProperties"
import { GetEventHeader } from "@Components.Events.Building/GetEventHeader"
import { GetEventTracking } from "@Components.Events.Building/GetEventTracking"
import { GetCleanGeoJSON } from "@Components.Events.Building/GetCleanGeoJSON"

export const IngestProduct = async (Stanza: TYPE_STANZA_COMPILED): Promise<void> => {
    const { Message, Attributes, Product } = Stanza ?? {};
    const { ID } = Product ?? {};
    const cMessages = Message
        ?.split(/(?=\$\$)/g)
        ?.map(lMsg => lMsg.trim())
        ?.filter(lMsg => lMsg && lMsg !== "$$")
        ?.filter(lMsg => lMsg.length > 25)
    if (!cMessages?.length) return;
    for (const cMessage of cMessages) {   
        const cTextParser = new TextProductParsing({ Message: cMessage });
        const cUGC = new GeographicalCodeParsing({ Message: cMessage }).GetReferences();
        const cIssuance = new Date(Attributes.issue)
        const cExpiration = cUGC?.Expires ?? new Date(Date.now() + 12 * 60 * 60 * 1000)
        const cProperties = GetCleanGeoJSON(GetEventProperties({ Message: cMessage, Attributes, UGC: cUGC }))
        const cTracking = GetEventTracking({ Type: `TEXT`, Stanza, Properties: cProperties, ID });
        const cHeader = GetEventHeader({ Tracking: cTracking });
        const { Label, Status, Issuance, Expiry } = cTextParser.GetTextProductEvent({ Stanza: Stanza, Issuance: cIssuance, Expiration: cExpiration });
        console.log(Label, Status, Issuance, Expiry, cUGC)
    }
}