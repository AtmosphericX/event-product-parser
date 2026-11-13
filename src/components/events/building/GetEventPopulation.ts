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
import { TYPE_CITIES } from "Types.Event/Properties"
import { Bootstrap } from "@Bootstrap"
import { GetNormalizedPolygon } from "@Components.Geometry/GetNormalizedPolygon"
import { ExecuteQuery } from "@Components.Database/ExecuteQuery"

interface GET_EVENT_POPULATION_OPTIONS {
    Geometry: GeoJSON.Polygon | GeoJSON.MultiPolygon | null,
}

interface GET_EVENT_POPULATION_RESPONSE {
    population: number,
    towns: TYPE_CITIES[]
}

export const GetEventPopulation = ({ Geometry}: GET_EVENT_POPULATION_OPTIONS): GET_EVENT_POPULATION_RESPONSE => {
    let lMinimumLatitude = Infinity;
    let lMaximumLatitude = -Infinity;
    let lMinimumLongitude = Infinity;
    let lMaximumLongitude = -Infinity;
    
    const { CityPopulationAttachments } = Bootstrap.Settings.GlobalSettings;
    const { coordinates } = Geometry;

    if (!CityPopulationAttachments || !Array.isArray(coordinates) || coordinates.length === 0) { 
        return { population: 0, towns: [] };
    }

    const cNormalized = GetNormalizedPolygon({ Geometry: Geometry });
    const cPoints = cNormalized.type === `Polygon` ? cNormalized.coordinates[0] : cNormalized.coordinates.flatMap(polygon => polygon[0]);

    for (const [cLongitude, cLatitude] of cPoints) {
        lMinimumLatitude = Math.min(lMinimumLatitude, cLatitude);
        lMaximumLatitude = Math.max(lMaximumLatitude, cLatitude);
        lMinimumLongitude = Math.min(lMinimumLongitude, cLongitude);
        lMaximumLongitude = Math.max(lMaximumLongitude, cLongitude);
    }

    const cQuery = ExecuteQuery({
        Query: ENUM_STRINGS.DB_STRINGS.QUERIES.NEAREST_CITY_LOOKUP_2,
        Parameters: [
            lMinimumLatitude, lMaximumLatitude,
            lMinimumLongitude, lMaximumLongitude
        ]
    })

    const cPopulation = cQuery.reduce((lAcc: number, lRow: TYPE_CITIES) => {
        const cCensus = Number(lRow.population);
        return lAcc + (isNaN(cCensus) ? 0 : cCensus);
    }, 0);
    
    const cCities = cQuery.map((lRow: TYPE_CITIES) => ({
        name: lRow.name,
        state: lRow.state,
        county: lRow.county,
        population: lRow.population
    }));

    return { population: cPopulation, towns: cCities };
}
