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

interface GetMergedEventOptions { 
    Event1: TypeEvent
    Event2: TypeEvent
}

const uniqueBy = <T>(items: T[], getKey: (item: T) => string ): T[] => {
    const seen = new Set<string>();
    return items.filter((item) => {
        const key = getKey(item);
        if (seen.has(key)) {
            return false;
        }
        seen.add(key);
        return true;
    });
};

export const GetEventMerged = ({ Event1, Event2 }: GetMergedEventOptions): TypeEvent => {
    const history = uniqueBy([ ...(Event1.properties.metadata?.history ?? []), ...(Event2.properties.metadata?.history ?? []) ],(item) => `${item.description}|${item.issued}`);
    return {
        ...Event2,
        properties: {
            ...Event2.properties,
            metadata: {
                ...Event2.properties?.metadata,
                history
            }
        }
    };
};
