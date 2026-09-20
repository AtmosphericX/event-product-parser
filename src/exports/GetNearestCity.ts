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

interface GetNearestCityOptions { 
    Radius?: number
    Coordinates: { 
        Latitude: number
        Longitude: number 
    }
}

export const GetNearestCity = ({ Radius = 15, Coordinates }: GetNearestCityOptions): any => {
   const A = CreateQuery({
        Query: `SELECT * FROM cities WHERE lat BETWEEN ? AND ? AND lon BETWEEN ? AND ? AND population > 0 ORDER BY ((lat - ?) * (lat - ?) + (lon - ?) * (lon - ?)) ASC LIMIT 1`,
        Parameters: [
            Coordinates.Latitude - (Radius / 69),
            Coordinates.Latitude + (Radius / 69),
            Coordinates.Longitude - (Radius / 69),
            Coordinates.Longitude + (Radius / 69),
            Coordinates.Latitude,
            Coordinates.Latitude,
            Coordinates.Longitude,
            Coordinates.Longitude
        ]
    })
    return A?.[0] ?? null
}