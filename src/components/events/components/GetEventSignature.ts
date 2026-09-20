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

import { TypeEvent } from "TypesEvent/Event"
import { EnumCorrelations } from "@Enums/Correlations"
import { EnumCancellation } from "@Enums/Cancellation"
import { EnumTesting} from "@Enums/Testing"
import { EnumProducts } from "@Enums/Products"
import { EnumHail } from "@Enums/Hail"

export const GetEventSignature = (event: TypeEvent): TypeEvent => {
    const properties = event?.properties;
    const vtec = event?.properties?.metadata?.vtec
    const status = EnumCorrelations
        .find((c: { type: string }) => c.type === properties?.status);
    const csig = EnumCancellation.find(sig => properties.description.toLowerCase().includes(sig.toLowerCase()));
    properties.status_metadata = { ...properties.status_metadata, is_issued: true, is_test: false};

    if (properties?.parameters?.estimated_hail_size) { 
        properties.parameters.estimated_hail_size += ` (${EnumHail[properties?.parameters?.estimated_hail_size] ?? '--'})`
    }

    if (status) { 
        properties.status = status.name ?? properties.status; 
        properties.status_metadata = { ...properties.status_metadata, is_updated: !!status.isUpdate, is_issued: !!status.isIssued, is_expired: !!status.isCancel, is_statement: !!status.isStatement };
    }
    if (csig) {
        properties.status_metadata = { ...properties.status_metadata, is_expired: true };
    }
    
    const getProduct = vtec?.raw?.split(`.`)[0]?.replace(`/`, ``)
    const isTestProduct = EnumProducts[getProduct] == `Test Product`
    if (isTestProduct || EnumTesting.some(sig => properties.description?.toLowerCase().includes(sig.toLowerCase()) ?? properties?.parameters?.instructions?.toLowerCase().includes(sig.toLowerCase()))) {
        properties.status_metadata = { ...properties.status_metadata, is_test: true }
    }    
    
    if (new Date(properties.expires).getTime() < Date.now()) {
        properties.status_metadata = { ...properties.status_metadata, is_expired: true };
    }  
    properties.status_metadata = {
        ...properties.status_metadata,
    }
    
    return event
}