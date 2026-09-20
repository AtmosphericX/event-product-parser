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

import { TypeAttributes } from "TypesEvent/Attributes"
import { TypeEventProperties } from "TypesEvent/Properties"
import { TypeStanzaCompiled } from "TypesStandard/StanzaCompiled"
import { TypeVTEC } from "TypesEvent/VTEC"

interface GetTrackingOptions { 
    Type: `RAW` | `VTEC` | `API`
    Stanza?: TypeStanzaCompiled
    Attributes?: TypeAttributes
    Properties?: TypeEventProperties
    WMO?: {
        Identifier: string
        ID: string
    }
    VTEC?: TypeVTEC
}

export const GetEventTracking = ({ Type, Stanza, Attributes, Properties, WMO, VTEC }: GetTrackingOptions): string => {
    if (Type === `RAW`) { 
        const getWatchNumber = Properties?.watch_parameters?.watch_number ?? null
        if (getWatchNumber) {
            return `${Properties.geocode.office.office}.${Stanza.Type.Prefix}.A.${getWatchNumber}`
        }
        return `${Properties.geocode.office.office}.${Attributes.ttaaii}.${Attributes.id.slice(-4).replace(`.`, ``) ?? '0'}`
    }
    if (Type === `VTEC`) {
        return VTEC?.tracking;
    }
    if (Type === `API`) {
        if (VTEC) { 
            const vtecValue = Array.isArray(VTEC) 
                ? VTEC[0].vtec : VTEC?.raw;
            const splitVTEC = vtecValue.split('.');
            return `${splitVTEC[2]}.${splitVTEC[3]}.${splitVTEC[4]}.${splitVTEC[5]}`;
        }
        const wmoMatch = WMO?.Identifier?.match(/([A-Z]{4}\d{2})\s+([A-Z]{4})/);
        const station = wmoMatch?.[2] ?? '---';
        if (WMO?.ID) {
            const idMatch = WMO?.ID.match(/([a-f0-9]+)\.(\d+)\.(\d+)$/);
            return `${station}.${idMatch?.[0]?.replace(/\./g, '') ?? '---'}`;
        }
        const id = wmoMatch?.[1] ?? '---';
        return `${station}.${id?.replace(/\./g, '') ?? '---'}`;
    }
}