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

import { union } from "polygon-clipping";

interface GetUnionPolygonOptions {
    Polygons: number[][][][] | null;
}

export const GetUnionPolygon = ({ Polygons }: GetUnionPolygonOptions): GeoJSON.MultiPolygon | null => {
    if (!Polygons || Polygons.length === 0) {
        return null;
    }
    const unionFn = union as unknown as (...polygons: number[][][][]) => number[][][][];
    const unioned = unionFn(...Polygons)
    return {
        type: `MultiPolygon`,
        coordinates: unioned
    }
};