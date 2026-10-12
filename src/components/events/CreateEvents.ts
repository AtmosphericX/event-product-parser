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
import { TypeSettings } from "TypesStandard/Settings"
import { EnumGlobalFilter } from "@Enums/GlobalFilter"
import { Bootstrap } from "@Bootstrap"
import { SetEventPolygonNodes } from "@BuilderUtilities/SetEventPolygonNodes"
import { SetHash } from "@BuilderUtilities/SetHash"
import { GetEventGeometry } from "@BuilderComponents/GetEventGeometry"
import { GetEventMerged } from "@BuilderComponents/GetEventMerged"
import { GetUpdatedWatch } from "@BuilderComponents/GetUpdatedWatch"
import { SetEventEmit } from "@Utilities/SetEventEmit"
import { SetTimeoutAction } from "@Utilities/SetTimeoutAction"
import { GetStringText } from "@Formatting/GetStringText"
import { CreateTasks } from "@Tasks/CreateTasks"

export const CreateEvents = async (events: TypeEvent[]): Promise<void> => {
    let tasks = [] as TypeEvent[];
    const settings = Bootstrap.Settings as TypeSettings;
    if (events.length === 0) return
    const eventGroups = new Map<string, TypeEvent[]>();
    for (const event of events) {
        const tracking = event.properties.metadata.tracking;
        const group = eventGroups.get(tracking) ?? [];
        group.push(event);
        eventGroups.set(tracking, group);
    }

    await Promise.all([...eventGroups.values()].map(async group => {
    for (const event of group) {
        const active = Bootstrap.Cache.Events;
        const hashes = Bootstrap.Cache.Hashes;
        const nodes = Bootstrap.Cache.Nodes;
        const { EventFiltering } = settings.GlobalSettings;
        const { properties } = event;
        const { metadata, status_metadata } = properties;
        const { hash, tracking, filtered_proximity, vtec } = metadata;

        const isEntry = hashes?.find(hash => hash.Tracking === tracking)
        const isHashed = isEntry?.Hashes?.includes(hash) ?? false;
        const isNodeFiltering = EventFiltering.NodeLocationFiltering

        if (isHashed || status_metadata.is_expired) {
            continue
        }

        SetHash({ Event: event, Entry: isEntry })
        await SetEventPolygonNodes(event);

        if (isNodeFiltering && nodes.features.length > 0 && !filtered_proximity && !EnumGlobalFilter.includes(properties.event.toLowerCase())) { 
            continue
        }
        
        const isRatelimited = SetTimeoutAction({ Identifier: tracking, Interval: 1, Max: 1, AddTime: true })
        const isLocalProximity = filtered_proximity ? `[LOCAL] ` : ``;
        const isCachedAlert = active.features.find(alert => alert?.properties?.metadata?.tracking === tracking);    

        if (!isRatelimited.Limited) {
            SetEventEmit({
                Event: `onEventStatus`,
                Metadata: {
                    Type: isCachedAlert ? `Updated` : `New`,
                    Event: event
                },
                Tree: Bootstrap.Settings.DeveloperEventLogging ? GetStringText(event).split('\n').filter(line => line.trim() !== '') : [],
                Message: `${isLocalProximity}[${isCachedAlert ? 'Updated' : 'New'}] ${event.properties.event} (${event.properties.status}) (${event.properties.metadata.tracking})`
            })
        }

        if (status_metadata.is_issued || status_metadata.is_updated) {
            const isWatch = vtec?.watch?.severe ?? vtec?.watch?.tropical ?? false;
            const isNational = vtec?.watch?.national ?? false;

            if (isWatch && isNational) {
                const A = await GetUpdatedWatch({ Event: event })
                if (isCachedAlert) {
                    const B = active.features.indexOf(isCachedAlert);
                    const C = await GetEventGeometry({ Event: A })
                    Bootstrap.Cache.Events.features[B] = GetEventMerged({ Cached: isCachedAlert, New: { ...A, geometry: C } })
                    tasks.push(Bootstrap.Cache.Events.features[B])
                } else { 
                    const C = await GetEventGeometry({ Event: A })
                    const D = { ...A, geometry: C }
                    active.features.push(D)
                    tasks.push(D)
                }
            } else { 
                if (isCachedAlert) {
                    const B = active.features.indexOf(isCachedAlert);
                    Bootstrap.Cache.Events.features[B] = GetEventMerged({ Cached: isCachedAlert, New: event })
                    tasks.push(Bootstrap.Cache.Events.features[B])
                } else { 
                    active.features.push(event);
                    tasks.push(event)
                }
            }
        }
    }
    }))

    tasks = tasks
        .filter((v, i, a) => a
        .reduce((last, t, index) => t.properties.metadata.tracking === v.properties.metadata.tracking ? index : last, -1) === i)

    SetEventEmit({ 
        Event: `onEventCache`, 
        Metadata: Bootstrap.Cache.Events, 
        Limited: true 
    })
    return await CreateTasks(tasks)
}