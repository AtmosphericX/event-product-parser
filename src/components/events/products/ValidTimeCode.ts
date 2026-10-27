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
import { ValidTimeEventCodeParsing } from "@Components.Events.Parsing/ValidTimeEventCode"

export const IngestProduct = async (Stanza: TYPE_STANZA_COMPILED): Promise<void> => {
    const { Message } = Stanza;
    const cMessages = Message
        ?.split(/(?=\$\$)/g)
        ?.map(lMsg => lMsg.trim())
        ?.filter(lMsg => lMsg && lMsg !== "$$")
        ?.filter(lMsg => lMsg.length > 25)
    if (!cMessages?.length) return;
    for (const cMessage of cMessages) { 
        const cGeoParser = new GeographicalCodeParsing({ Message: cMessage }).GetReferences();
        const cTimeParser = new ValidTimeEventCodeParsing({ Message: cMessage }).GetReferences();
        if (cGeoParser != null && cTimeParser != null) { }
    }
}