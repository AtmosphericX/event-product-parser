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

import { Bootstrap } from "@Bootstrap"
import { SetWarning } from "@Utilities/SetWarning"
import { SetEventEmit } from "@Utilities/SetEventEmit"
import { GetNearestCity } from "@Exports/GetNearestCity"

interface GetNodeOptions {
    Identifier: string
    Delete?: boolean
    Coordinates: { Longitude: number; Latitude: number }
}

export const SetNode = ({ Identifier, Delete, Coordinates }: GetNodeOptions) => {
    const nodes = Bootstrap.Cache.Nodes.features;
    const exists = nodes.find((node) => node.properties.identifier === Identifier);
    const nearest = GetNearestCity({ Coordinates, Radius: 25 });
    if (Delete) {
        if (exists) {
            const index = nodes.indexOf(exists);
            nodes.splice(index, 1);
            SetWarning({ Message: `Node with identifier '${Identifier}' deleted.` })
            return SetEventEmit({
                Event: `onNodeDelete`,
                Metadata: {
                    Type: `node-delete`,
                    Node: exists
                }
            })
        }
        return SetWarning({ Message: `Node with identifier '${Identifier}' not found.` })
    }
    if (exists) {
        const index = nodes.indexOf(exists);
        if (exists.geometry.coordinates[0] === Coordinates.Longitude && exists.geometry.coordinates[1] === Coordinates.Latitude) {
            return;
        }
        nodes[index] = {
            ...exists,
            geometry: {
                type: "Point",
                coordinates: [Coordinates.Longitude, Coordinates.Latitude]
            },
            properties: {
                ...exists.properties,
                city: nearest?.name ?? null,
                county: nearest?.county ?? null,
                state: nearest?.state ?? null,
                population: nearest?.population ?? null
            }
        };
        SetWarning({ Message: `Node with identifier '${Identifier}' updated. (${nearest?.name ?? "---"}, ${nearest?.county ?? "---"}, ${nearest?.state ?? "---"})` })
        return SetEventEmit({
            Event: `onNodeUpdate`,
            Metadata: {
                Type: `node-update`,
                Node: nodes[index]
            }
        })
    }
    nodes.push({
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: [Coordinates.Longitude, Coordinates.Latitude]
        },
        properties: {
            identifier: Identifier,
            city: nearest?.name ?? null,
            county: nearest?.county ?? null,
            state: nearest?.state ?? null,
            population: nearest?.population ?? null
        }
    });
    SetWarning({ Message: `Node with identifier '${Identifier}' added. (${nearest?.name ?? "---"}, ${nearest?.county ?? "---"}, ${nearest?.state ?? "---"})` })
    return SetEventEmit({
        Event: `onNodeAdd`,
        Metadata: {
            Type: `node-add`,
            Node: nodes[nodes.length - 1]
        }
    })
}