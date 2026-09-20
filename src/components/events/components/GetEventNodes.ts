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
import { GetEventGeometry } from "@BuilderComponents/GetEventGeometry"
import { GetShapeNearestPoint } from "@Geometry/GetShapeNearestPoint"

interface GetEventNodesResponse { 
    nodes: {
        id?: string | number
        coordinates: [number, number]
        nearest: [number, number]
        miles: number | null
        kilometers: number | null
        proximity: boolean
    }[]
    filtered: boolean
    updated: number
}

export const GetEventNodes = async (event: TypeEvent): Promise<GetEventNodesResponse> => {
    const nodes = Bootstrap.Cache.Nodes.features;
    if (!nodes || nodes.length === 0) {
        return { nodes: [], filtered: false, updated: Date.now() };
    }
    const metadata = { nodes: [] as GetEventNodesResponse['nodes'], proximity: false, filtered: false };
    const geometry = await GetEventGeometry({ Event: event });;
    if (!geometry || !geometry.coordinates) {
        return { nodes: [], filtered: false, updated: Date.now() }
    }
    for (const node of nodes) {
        const [longitude, latitude] = (node?.geometry?.coordinates ?? []) as [number, number];
        
        const getPoint = GetShapeNearestPoint({ Coordinates: geometry.coordinates, Point: [longitude, latitude] });
        const miles = getPoint.Distance ?? null;
        const kilometers = miles != null ? Number((miles * 1.609344).toFixed(3)) : null;

        const info = {
            id: node.properties?.identifier,
            coordinates: [longitude, latitude] as [number, number],
            nearest: getPoint.Point as [number, number],
            miles,
            kilometers,
            proximity: false
        };
        
        if (miles != null && (miles < Bootstrap.Settings.GlobalSettings.NodeMaxDistance)) {
            info.proximity = true;
            metadata.proximity = true;
        }
        metadata.nodes.push(info);
    }
    return {
        nodes: metadata.nodes,
        filtered: metadata.proximity,
        updated: Date.now()
    }
}