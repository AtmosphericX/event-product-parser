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
import { ENUM_REGEX_EVENTS } from "@Enums.Events/RegexEvents"
import { TextProductParsing } from "@Components.Events.Parsing.Classes/TextProductParsing"


interface GET_TEXT_PRODUCT_EVENT_OPTIONS { 
    Message: string
    Stanza: TYPE_STANZA_COMPILED
    Issuance: Date
    Expiration: Date
}

interface GET_TEXT_PRODUCT_EVENT_RESPONSE { 
    Label: string
    Status?: string
    Issuance?: Date
    Expiry?: Date
}

export const GetTextProductEvent = ({ Message, Stanza, Issuance, Expiration }: GET_TEXT_PRODUCT_EVENT_OPTIONS): GET_TEXT_PRODUCT_EVENT_RESPONSE => {
    const { Product } = Stanza
    const { ID, Name, Discovered } = Product;
    const { Label, Statement } = ENUM_REGEX_EVENTS[ID]
        ?.find(A => A.Match.test(Message)) ?? { Label: `${Discovered ? Name : `${ID} (Unknown)`}`, Statement: false };
    
    const cTextProductParsing = new TextProductParsing({ Message });
    const cGetExpiry = cTextProductParsing.GetExpiry({});
    const cIssuanceValid = (!isNaN(Issuance.getTime())) ? Issuance.toISOString() : new Date().toISOString();
    const cExpirationValid = (cGetExpiry && !isNaN(cGetExpiry.getTime())) ? cGetExpiry.toISOString() : Expiration.toISOString();

    return { 
        Label: Label,
        Status: Statement ? `Statement` : `Issued`,
        Issuance: new Date(cIssuanceValid),
        Expiry: Statement ? new Date(Issuance.getTime() + 120 * 1e3) : new Date(cExpirationValid)
    }
}
