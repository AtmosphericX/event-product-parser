/*
              _                             _               _     __   __
         /\  | |                           | |             (_)    \ \ / /
        /  \ | |_ _ __ ___   ___  ___ _ __ | |__   ___ _ __ _  ___ \ V / 
       / /\ \| __| '_ ` _ \ / _ \/ __| '_ \| '_ \ / _ \ '__| |/ __| > <  
      / ____ \ |_| | | | | | (_) \__ \ |_) | | | |  __/ |  | | (__ / . \ 
     /_/    \_\__|_| |_| |_|\___/|___/ .__/|_| |_|\___|_|  |_|\___/_/ \_\
                                     | |                            
                                     |_|                                                                                                                

    Created with ♥ by the AtmosphericX Team (KiyoWx, StarflightWx, & CJ Ziegler)
    Discord: https://atmosphericx-discord.scriptkitty.cafe
    Ko-Fi: https://ko-fi.com/k3yomi
    Documentation: https://atmosphericx.scriptkitty.cafe/documentation

    Independent Package: @atmosx/event-product-parser

*/

import { TypeEventProperties as BaseTypeEventProperties } from "TypesEvent/Properties"
import { TypeHVTEC } from "TypesEvent/HVTEC"
import { TypeVTEC } from "TypesEvent/VTEC"

export type TypeEvent = {
    type: string
    geometry: {
        type: "Polygon" | "MultiPolygon"
        coordinates: number[][]
    }
    properties: {
        event: string
        parent: string
        status: string
        issued: string
        expires: string
        theme: string
        status_metadata?: {
            is_issued?: boolean
            is_updated?: boolean
            is_expired?: boolean
            is_test?: boolean
            is_statement?: boolean
        }
        metadata: {
            ms: number
            source: string
            tracking: string
            hash?: string
            header: string
            vtec?: TypeVTEC | null
            hvtec?: TypeHVTEC[] | null
            nodes?: {
                id?: string | number
                coordinates: [number, number]
                nearest: [number, number]
                miles: number | null
                kilometers: number | null
                proximity: boolean
            }[],
            filtered_proximity?: boolean
            updated?: number
            history: {
                description: string
                issued: string
                status: string
            }[]
            attachments?: { name: string; link: string }[]
            raw: string
        }
    } & BaseTypeEventProperties
}