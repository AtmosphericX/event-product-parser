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

import { ENUM_STRINGS } from "@Enums/Strings"
import { Bootstrap } from "@Bootstrap"
import { SetLog } from "@Components.Utilities/SetLog"
import { GetNearestCity } from "@Components.Exports/GetNearestCity"

interface MANAGE_TRACKING_NODE_OPTIONS {
    Identifier: string
    Coordinates: { 
        Latitude: number
        Longitude: number
    }
    Delete?: boolean
}

export const ManageTrackingNode = ({ Identifier, Coordinates, Delete }: MANAGE_TRACKING_NODE_OPTIONS): void => {
    const { Latitude, Longitude } = Coordinates;
    const { Name, State, County, Population } = GetNearestCity({ Coordinates, Radius: 25 });
    const cTrackingNodes = Bootstrap.CacheControl.Manager.Nodes;
    const cNode = cTrackingNodes.features.find((lNode) => lNode.properties.identifier === Identifier);
    const cIndex = cTrackingNodes.features.indexOf(cNode);
    const cLoationString = `${Name ?? `---`}, ${County ?? `---`}, ${State ?? `---`}, ${Population ?? `---`}`;

    if (Delete && cNode) {
        cTrackingNodes.features.splice(cIndex, 1);
        return SetLog({ 
            Message: ENUM_STRINGS.CALLBACKS.TRACKING_NODE_DELETED.replace(/%s/g, Identifier),
            Event: `onTrackingNodeDeleted`,
            Metadata: {
                Action: `Deleted`,
                Identifier: Identifier,
                Node: cNode,
            } 
        });
    }
    
    if (cNode) { 
        cTrackingNodes.features[cIndex] = {
            ...cNode,
            geometry: {
                type: `Point`,
                coordinates: [Longitude, Latitude]
            },
            properties: {
                ...cNode.properties,
                city: Name ?? null,
                state: State ?? null,
                county: County ?? null,
                population: Population ?? null
            }
        }
        return SetLog({ 
            Message: ENUM_STRINGS.CALLBACKS.TRACKING_NODE_UPDATED.replace(/%s/g, Identifier).replace(/%d/g, cLoationString),
            Event: `onTrackingNodeUpdated`,
            Metadata: {
                Action: `Updated`,
                Identifier: Identifier,
                Node: cTrackingNodes.features[cIndex],
            } 
        });
    }

    cTrackingNodes.features.push({
        type: `Feature`,
        geometry: {
            type: `Point`,
            coordinates: [Longitude, Latitude]
        },
        properties: {
            identifier: Identifier,
            city: Name ?? null,
            state: State ?? null,
            county: County ?? null,
            population: Population ?? null
        }
    });
    return SetLog({ 
        Message: ENUM_STRINGS.CALLBACKS.TRACKING_NODE_ADDED.replace(/%s/g, Identifier).replace(/%d/g, cLoationString),
        Event: `onTrackingNodeAdded`,
        Metadata: {
            Action: `Added`,
            Identifier: Identifier,
            Node: cTrackingNodes.features[cTrackingNodes.features.length - 1],
        } 
    });
}