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

export type TYPE_STANZA_COMPILED = {
    Message?: string
    Attributes?: TYPE_ATTRIBUTES
    Metadata: {
        CAP: boolean
        VTEC: boolean
        UGC: boolean
        Wire: boolean
    }
    Ignored?: boolean
    Product?: {
        Raw: string
        Name: string
        ID: string
        Discovered: boolean
    }
}