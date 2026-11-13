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

interface GET_NORMALIZED_POLYGON_OPTIONS { 
    Geometry: GeoJSON.Polygon | GeoJSON.MultiPolygon
}

export const GetNormalizedPolygon = ({ Geometry }: GET_NORMALIZED_POLYGON_OPTIONS): GeoJSON.Polygon | GeoJSON.MultiPolygon  => {
    const cReverseRing = (lRing: number[][]) => { return lRing.slice().reverse() };
    if (Geometry.type === `Polygon`) { 
        return { 
            type: `Polygon`,
            coordinates: Geometry.coordinates.map((ring, index) => index === 0 ? cReverseRing(ring) : ring.slice().reverse())
        }
    }
    if (Geometry.type === `MultiPolygon`) {
        return {
            type: `MultiPolygon`,
            coordinates: Geometry.coordinates.map(polygon => polygon.map((ring, index) => index === 0 ? cReverseRing(ring) : ring.slice().reverse()))
        }
    }
}