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

import { TYPE_ATTRIBUTES } from "Types.Stanza/StanzaAttributes"
import { ENUM_LEGACY_AWIPS } from "@Enums.Products/LegacyAWIPS"

interface GET_STANZA_TYPE_OPTIONS { 
    Attributes: TYPE_ATTRIBUTES
}

interface GET_STANZA_TYPE_RESPONSE { 
    Raw: string
    Name: string
    ID: string
    Discovered: boolean
}

export const GetStanzaType = ({ Attributes }: GET_STANZA_TYPE_OPTIONS): GET_STANZA_TYPE_RESPONSE => {
    if (!Attributes.awipsid) { 
        return { 
            Raw: Attributes.awipsid,
            Name: null, 
            ID: null,
            Discovered: false
        }
    }
    for (const [cPrefix, cName] of Object.entries(ENUM_LEGACY_AWIPS)) {
        if (Attributes.awipsid.startsWith(cPrefix)) {
            return { Raw: Attributes.awipsid, Name: cName, ID: cPrefix, Discovered: true }
        }
    }
    return { Raw: Attributes.awipsid, Name: Attributes.awipsid, ID: Attributes.awipsid, Discovered: false }
}
