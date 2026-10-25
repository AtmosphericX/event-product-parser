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

import { SetLog } from "@Components.Utilities/SetLog";
import { union } from "polygon-clipping"

interface GET_UNIONED_POLYGON_OPTIONS { 
    Polygons: number[][][][] | null
}

export const GetUnionedPolygon = ({ Polygons }: GET_UNIONED_POLYGON_OPTIONS): GeoJSON.MultiPolygon | null => {
    const dbgTickA = performance.now();

    if (!Polygons || Polygons.length == 0) return null;

    const cUnionFN = union as unknown as (...polygons: number[][][][]) => number[][][][];
    const cUnioned = cUnionFN(...Polygons);
    
    SetLog({ Type: `DEBUG`, Message: `[${(Math.round((performance.now() - dbgTickA) * 100) / 100).toFixed(1)}ms] GetUnionedPolygon` });

    return { 
        type: `MultiPolygon`,
        coordinates: cUnioned
    }
}