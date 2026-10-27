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

import { TYPE_PROPERTIES } from "Types.Event/Properties"
import { TYPE_ATTRIBUTES } from "Types.Stanza/StanzaAttributes"

export type TYPE_EVENT = {
    type?: string
    geometry?: {
        type?: "Polygon" | "MultiPolygon"
        coordinates?: number[][]
    }
    temp?: any
    properties: {
        event?: string
        parent?: string
        status?: string
        issued?: string
        expires?: string
        theme?: string
        source?: string
        status_parameters?: {
            issued?: boolean
            updated?: boolean
            expired?: boolean
            test?: boolean
            statement?: boolean
        }
        components?: {
            attributes?: TYPE_ATTRIBUTES
            vtec?: string
            ugc?: string
            hvtec?: string
            tracking?: string
            header?: string
            hash?: string
        }
        tracking?: {
            nodes?: {
                id?: string | number
                coordinates?: [number, number]
                nearest?: [number, number]
                miles?: number | null
                kilometers?: number | null
                proximity?: boolean
            }
            filtered?: boolean
            updated?: number
        }
        history?: {
            message?: string
            issuance?: string
            status?: string
        }[]
        attachments?: { name?: string; link?: string }[]
        message?: string
        completed?: number
    } & TYPE_PROPERTIES
}