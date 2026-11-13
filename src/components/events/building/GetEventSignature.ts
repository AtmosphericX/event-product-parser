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

import { TYPE_EVENT } from "Types.Event/Event"
import { ENUM_STATUS_CORRELATIONS } from "@Enums.Events/StatusCorrelations"
import { ENUM_CANCELLATION_MESSAGES } from "@Enums.Events/CancellationMessages"
import { ENUM_TEST_MESSAGES } from "@Enums.Events/TestMessages"
import { ENUM_VTEC_TYPES } from "@Enums.Products/VTECTypes"
import { ENUM_HAIL } from "@Enums.Properties/Hail"

interface GET_EVENT_SIGNATURE_OPTIONS {
    Product: TYPE_EVENT
}

export const GetEventSignature = ({ Product }: GET_EVENT_SIGNATURE_OPTIONS): TYPE_EVENT => {
    const { properties } = Product;
    const { description, status, expires, parameters, components } = properties;
    const { hail_size } = parameters ?? {};
    const { vtec } = components;

    const cTestProduct = ENUM_VTEC_TYPES[vtec] === `Test Product`;
    const cStatus = ENUM_STATUS_CORRELATIONS.find((lColumn: { Type: string }) => lColumn.Type === status);
    const cCancellation = ENUM_CANCELLATION_MESSAGES.find(lColumn => description?.toLowerCase().includes(lColumn));
    
    const cTesting = ENUM_TEST_MESSAGES.some(lColumn => 
        properties.description?.toLowerCase().includes(lColumn.toLowerCase()) ?? 
        properties?.parameters?.instructions?.toLowerCase().includes(lColumn.toLowerCase())
    );

    const statusName = cStatus?.Name ?? status;
    const isCancelled = Boolean(cCancellation);
    const isTest = cTestProduct || cTesting;
    const isExpired = (new Date(expires).getTime() < Date.now()) || Boolean(cStatus?.Cancel);

    properties.status = statusName;
    properties.status_parameters = {
        ...properties.status_parameters,
        issued: cStatus?.Issued,
        updated: cStatus?.Update,
        statement: cStatus?.Statement,
        test: isTest,
        expired: isExpired || isCancelled,
        ...(cStatus?.Cancel && { expired: true })
    };

    if (hail_size) { 
        properties.parameters.hail_size += ` (${ENUM_HAIL[hail_size] ?? '--'})`;
    }

    return Product;
}