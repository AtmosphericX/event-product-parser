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
import { ExecuteQuery } from "@Components.Database/ExecuteQuery"

interface GET_NEAREST_CITY_OPTIONS {
    Coordinates: {
        Latitude: number
        Longitude: number
    }
    Radius?: number
}

interface GET_NEAREST_CITY_RESPONSE { 
    ID: string
    Name: string
    State: string
    County: string
    Population: number
    Latitude: number
    Longitude: number
}

export const GetNearestCity = ({ Coordinates, Radius }: GET_NEAREST_CITY_OPTIONS): GET_NEAREST_CITY_RESPONSE | null => {
    const { Latitude, Longitude } = Coordinates
    const cScaleLatMildes = Radius / 69.0;
    const cScaleLonMoiles = Radius / (69.0 * Math.cos(Latitude * (Math.PI / 180)));

    const cQuery = ExecuteQuery({
        Query: ENUM_STRINGS.DB_STRINGS.QUERIES.NEAREST_CITY_LOOKUP,
        Parameters: [
            Latitude - (cScaleLatMildes), Latitude + (cScaleLatMildes),
            Longitude - (cScaleLonMoiles), Longitude + (cScaleLonMoiles),
            Latitude, Latitude, Longitude, Longitude
        ]
    })

    return cQuery?.[0] ?? null;
}