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

interface GetGeographicalCitiesOptions {
    Regions: string[] | null
}

interface GeographicalCitiesResponse {
    cities: { 
        id: string; 
        name: string; 
        state: string; 
        county: string; 
        population: number;
        lat: number; 
        lon: number 
    }[]
}

export const GetGeographicalCities = ({ Regions }: GetGeographicalCitiesOptions): GeographicalCitiesResponse => {
    const cities = []
    if (!Regions) {
        const cityBoundaries = CreateQuery({
            Query: `SELECT * FROM cities WHERE state NOT IN ('AK', 'HI')`,
        })
        cities.push(...cityBoundaries)
        return { cities }
    }
    for (const region of Regions) {
        const match = region.match(/^([A-Z]{2})[CZ](\d{3})$/i) ?? null
        if (!match) { 
            const parent = CreateQuery({ 
                Query: `SELECT * FROM cities WHERE state = ?`, 
                Parameters: [region] 
            })
            cities.push(...parent)
        }
    }
    return { cities }
}