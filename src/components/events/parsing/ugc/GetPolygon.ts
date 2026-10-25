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
import { CreateQuery } from "@Components.Database/CreateQuery"
import { SetLog } from "@Components.Utilities/SetLog";
import { GetUnionedPolygon } from "@Components.Geometry/GetUnionedPolygon";
import { createHash } from "node:crypto";

interface GET_POLYGON_OPTIONS { 
    Zones: string[]
    Union: boolean
}

interface GET_POLYGON_RESPONSE {
    type: `Polygon` | `MultiPolygon`
    coordinates: number[][][] | number[][][][]
}

type TYPE_ROW = { ID: string, Location: string, Geometry: string }

export const GetPolygon = ({ Zones, Union }: GET_POLYGON_OPTIONS): GET_POLYGON_RESPONSE | null => {
    const dbgTickA = performance.now();
    const cPolygons: number[][][][] = [];
    const cGeometryHashes: Set<string> = new Set();
    const cUnique = [...new Set(Zones.map(z => z.trim()))]
        .filter(z => z === 'XX000' ? false : true);
    const cPlaceholders = cUnique.map(() => `?`).join(`,`);
    const cRows = CreateQuery({
        Query: ENUM_STRINGS.DB_STRINGS.QUERIES.ZONE_LOOKUP.replace(/%s/, cPlaceholders),
        Parameters: cUnique
    }) as TYPE_ROW[];
    for (const cRow of cRows) {
        const { Geometry } = cRow;
        if (!Geometry) continue;

        const cHash = createHash(`Sha256`).update(Geometry).digest(`hex`);
        if (cGeometryHashes.has(cHash)) continue;
        cGeometryHashes.add(cHash);

        const cGetometry = JSON.parse(Geometry);
        const { type, coordinates } = cGetometry;
        if (type == `Polygon`) { 
            cPolygons.push(coordinates);
        }
        if (type == `MultiPolygon`) {
            for (const cPolygon of coordinates) {
                cPolygons.push(cPolygon);
            }
        }
    }
    if (cPolygons.length == 0) return null;
    if (Union) { 
        SetLog({ Type: `DEBUG`, Message: `[${(Math.round((performance.now() - dbgTickA) * 100) / 100).toFixed(1)}ms] GetPolygon (Unioned)` });
        return GetUnionedPolygon({ Polygons: cPolygons });
    } else { 
        const cMultiPolygon: number[][][][] = [];
        for (const cPoly of cPolygons) { 
            if (Array.isArray(cPoly) && Array.isArray(cPoly[0])) {
                cMultiPolygon.push(cPoly);
            }
        }
        if (cMultiPolygon.length == 0) return null;
        SetLog({ Type: `DEBUG`, Message: `[${(Math.round((performance.now() - dbgTickA) * 100) / 100).toFixed(1)}ms] GetPolygon (Not Unioned)` });
        return { type: `MultiPolygon`, coordinates: cMultiPolygon };
    }
}