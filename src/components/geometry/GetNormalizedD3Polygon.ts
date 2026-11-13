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

import { geoArea } from "d3-geo";

interface GET_NORMALIZED_D3_POLYGON_OPTIONS { 
    Geometry: GeoJSON.Polygon | GeoJSON.MultiPolygon
}

export const GetNormalizedD3Polygon = ({ Geometry }: GET_NORMALIZED_D3_POLYGON_OPTIONS): GeoJSON.Polygon | GeoJSON.MultiPolygon  => {
    const cArea = geoArea(Geometry);
    if (cArea > 2 * Math.PI) {
        if (Geometry.type === `Polygon`) {
            return {
                type: `Polygon`,
                coordinates: Geometry.coordinates.map(ring => ring.slice().reverse())
            };
        }
        return {
            type: `MultiPolygon`,
            coordinates: Geometry.coordinates.map(polygon => polygon.map(ring => ring.slice().reverse()))
        };
    }
    return Geometry;
}