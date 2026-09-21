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
import { Bootstrap } from "@Bootstrap"
import { GetEventNodes } from "@BuilderComponents/GetEventNodes"
import { SetEventEmit } from "@Utilities/SetEventEmit"

export const UpdateNode = async (selected?: TypeEvent): Promise<void> => {
    const events = Bootstrap.Cache.Events.features;
    const ttl = Bootstrap.Settings.GlobalSettings.NodePolygonTTL * 1e3;
    let total = 0;

    const TTLEvents = selected ? [selected] : events.filter((evt) => {
        const lastUpdate = evt?.properties?.metadata?.updated ?? null;
        return lastUpdate == null || (Date.now() - lastUpdate) >= ttl;
    });

    if (TTLEvents.length === 0) return;

    async function update(evt: TypeEvent) {
        const node = await GetEventNodes(evt);
        if (node.nodes.length > 0) {
            total++;
        }
        evt.properties.metadata.nodes = node.nodes;
        evt.properties.metadata.filtered_proximity = node.filtered;
        evt.properties.metadata.updated = node.updated;
    }

    const concurrency = 4;
    for (let index = 0; index < TTLEvents.length; index += concurrency) {
        const batch = TTLEvents.slice(index, index + concurrency);
        await Promise.all(batch.map((evt) => update(evt)));
    }

    if (total > 0) {
        SetEventEmit({
            Event: `onNodeUpdate`,
            Metadata: {
                Type: `global-update`,
                Updated: total
            },
        })
    }
}