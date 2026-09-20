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

import { CreateQuery } from "@Database/CreateQuery"
import { GetUnionPolygon } from "@Geometry/GetUnionPolygon"
import { createHash } from "crypto";

interface CoordinatesOptions {
    Zones: string[]
    Union: boolean
}

interface CoordinatesResponse { 
    type: `Polygon` | `MultiPolygon`
    coordinates: any[]
}

export const GetZonePolygon = ({ Zones, Union }: CoordinatesOptions): CoordinatesResponse | null => {
    const list = [...new Set(Zones.map(z => z.trim()))].filter(z => z === 'XX000' ? false : true);
    if (list.length === 0) return null;

    const placeholders = list.map(() => "?").join(",");
    const rows = CreateQuery({
        Query: `SELECT geometry FROM shapefiles WHERE id IN (${placeholders})`,
        Parameters: list
    });
    const polygons: any[] = [];
    const geometryHashes = new Set<string>();
    for (const row of rows) {
        if (!row?.geometry) continue;
        const geometryHash = createHash("sha256").update(row.geometry).digest("hex");
        if (geometryHashes.has(geometryHash)) continue;
        geometryHashes.add(geometryHash);
        const geom = JSON.parse(row.geometry);
        if (geom?.type === "Polygon") {
            polygons.push(geom.coordinates);
        }
        if (geom?.type === "MultiPolygon") {
            for (const poly of geom.coordinates) {
                polygons.push(poly);
            }
        }
    }
    if (polygons.length === 0) return null;
    if (Union) {
        return GetUnionPolygon({ Polygons: polygons });
    } else {
        const multi: any[] = [];
        for (const polyCoords of polygons) {
            if (Array.isArray(polyCoords) && Array.isArray(polyCoords[0])) {
                multi.push(polyCoords);
            }
        }
        if (multi.length === 0) return null;
        return {type: "MultiPolygon", coordinates: multi};
    }
}