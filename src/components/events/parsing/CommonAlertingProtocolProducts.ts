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
import { TYPE_CAP_PRODUCT_PROPERTIES } from "Types.Components/CapProductProperties"
import { CommonAlertingProtocolParsing } from "@Components.Events.Parsing.Classes/CommonAlertingProtocolParsing"

export const IngestProduct = async (Stanza: TYPE_STANZA_COMPILED): Promise<void> => {
    const { Message } = Stanza;
    const cMessages = Message
        ?.split(/(?=\$\$)/g)
        ?.map(lMsg => lMsg.trim())
        ?.filter(lMsg => lMsg && lMsg !== "$$")
        ?.filter(lMsg => lMsg.length > 25)
    if (!cMessages?.length || cMessages?.length == 0) return;
    for (const cMessage of cMessages) { 
        const cParsing = new CommonAlertingProtocolParsing({ Message: cMessage });
        const cFilter = cParsing.GetFilteredMessage({});
        const cJSON = await cParsing.GetJSON({Message: cFilter});
        const cProperties = cParsing.GetPropertyValues({ JSON: cJSON }) as TYPE_CAP_PRODUCT_PROPERTIES;
    }
}