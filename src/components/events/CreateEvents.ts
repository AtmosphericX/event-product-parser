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
import { CreateTasks } from "@Tasks/CreateTasks"
import { SetHash } from "@BuilderUtilities/SetHash"
import { UpdateNode } from "@BuilderUtilities/UpdateNode"
import { SetEventEmit } from "@Utilities/SetEventEmit"
import { SetTimeoutAction } from "@Utilities/SetTimeoutAction"
import { GetStringText } from "@Formatting/GetStringText"
import { GetEventMerged } from "@BuilderComponents/GetEventMerged"

export const CreateEvents = async (events: TypeEvent[]): Promise<void> => {
    let tasked = [] as TypeEvent[];
    const settings = Bootstrap.Settings as TypeSettings;
    if (events.length === 0) return
    await Promise.all(events.map(async event => {
        const features = Bootstrap.Cache.Events.features;
        const getHash = event.properties.metadata.hash;
        const getTracking = event.properties.metadata.tracking;
        const isEntry = Bootstrap.Cache.Hashes?.find(hash => hash.Tracking === getTracking)
        const isHashed = isEntry?.Hashes?.includes(getHash) ?? false;
        const isNodeFiltering = settings.GlobalSettings.EventFiltering.NodeLocationFiltering
        const getNodes = Bootstrap.Cache.Nodes.features;
        

        if (isHashed || event.properties.status_metadata.is_expired) return
        SetHash({ Event: event, Entry: isEntry })
        await UpdateNode(event);
        if (isNodeFiltering && getNodes.length > 0) {
            if (!event.properties.metadata.filtered_proximity && !EnumGlobalFilter.includes(event.properties.event.toLowerCase())) { 
                return
            }
        }
        
        const isRatelimited = SetTimeoutAction({ Identifier: getTracking, Interval: 1, Max: 1, AddTime: true })
        const isLocal = event?.properties?.metadata?.filtered_proximity ? `[LOCAL] ` : ``;
        const getFeature = features.find(feature => feature.properties.metadata.tracking === getTracking);    
        const isWatch = event?.properties?.metadata?.vtec?.watch
        const isWOU = event?.properties?.metadata?.vtec?.wou

        if (!isRatelimited.Limited) {
            SetEventEmit({
                Event: `onEventStatus`,
                Metadata: {
                    Type: getFeature ? `Updated` : `New`,
                    Event: event
                },
                Tree: Bootstrap.Settings.EnhancedEventJournaling ? GetStringText(event).split('\n').filter(line => line.trim() !== '') : [],
                Message: `${isLocal}[${getFeature ? 'Updated' : 'New'}] ${event.properties.event} (${event.properties.status}) (${event.properties.metadata.tracking})`
            })
        }
        if (event.properties.status_metadata.is_issued || event.properties.status_metadata.is_updated) {
            if (getFeature) {
                const getIndex = features.indexOf(getFeature);
                if (isWatch && isWOU) { return }
                Bootstrap.Cache.Events.features[getIndex] = GetEventMerged({ Event1: getFeature, Event2: event })
                tasked.push(Bootstrap.Cache.Events.features[getIndex])
            } else { 
                features.push(event);
                tasked.push(event)
            }
        }
    }))

    tasked = tasked.filter((v, i, a) => a.reduce((last, t, index) => t.properties.metadata.tracking === v.properties.metadata.tracking ? index : last, -1) === i)
    SetEventEmit({ Event: `onEventCache`, Metadata: Bootstrap.Cache.Events, Limited: true })
    return await CreateTasks(tasked)
}