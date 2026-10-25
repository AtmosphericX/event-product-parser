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

import { TYPE_ATTRIBUTES } from "Types/stanza/StanzaAttributes"
import { ENUM_AWIP_PRODUCTS } from "@Enums.Products/AWIPProducts"

interface GET_AWIPS_TYPE_OPTIONS { 
    Attributes: TYPE_ATTRIBUTES
}

interface GET_AWIPS_TYPE_RESPONSE { 
    Name: string
    ID: string
    Discovered: boolean
}

export const GetAwipsType = ({ Attributes }: GET_AWIPS_TYPE_OPTIONS): GET_AWIPS_TYPE_RESPONSE => {
    if (!Attributes.awipsid) { 
        return { 
            Name: null, 
            ID: null,
            Discovered: false
        }
    }
    for (const [cPrefix, cName] of Object.entries(ENUM_AWIP_PRODUCTS)) {
        if (Attributes.awipsid.startsWith(cPrefix)) {
            return { Name: cName, ID: cPrefix, Discovered: true }
        }
    }
    return { Name: Attributes.awipsid, ID: Attributes.awipsid, Discovered: false }
}
