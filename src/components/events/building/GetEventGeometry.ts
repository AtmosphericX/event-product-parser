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

import { TYPE_EVENT } from "Types.Event/Event"
import { Bootstrap } from "@Bootstrap"
import { GeographicalCodeParsing } from "@Components.Events.Parsing/GeographicalCode"

interface GET_EVENT_GEOMETRY_OPTIONS {
    Product: TYPE_EVENT,
    Union?: boolean
}

interface GET_EVENT_GEOMETRY_RESPONSE {
    type: `Polygon` | `MultiPolygon`,
    coordinates: number[][][] | number[][][][]
}
    
export const GetEventGeometry = ({ Product, Union = false }: GET_EVENT_GEOMETRY_OPTIONS): GET_EVENT_GEOMETRY_RESPONSE => {
    const { GeometryShapefileFallback } = Bootstrap.Settings.GlobalSettings;
    const { properties } = Product;
    const { polygon, zones } = properties?.geography ?? {};

    let lGeometry: GET_EVENT_GEOMETRY_RESPONSE = { 
        type: `Polygon`,
        coordinates: polygon != null ? JSON.parse(Buffer.from(polygon, 'base64').toString('utf-8')) : []
    }

    if (GeometryShapefileFallback && polygon == null && zones?.length > 0) {
        const cGeoParsing = new GeographicalCodeParsing({});
        lGeometry = cGeoParsing.GetPolygon({ Zones: zones, Union: Union }) ?? lGeometry; 
    }
    
    return lGeometry;
}