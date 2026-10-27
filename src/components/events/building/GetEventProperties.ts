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

import { TYPE_ATTRIBUTES } from "Types.Stanza/StanzaAttributes"
import { TYPE_PROPERTIES } from "Types.Event/Properties"
import { TYPE_UGC } from "Types.Components/UniversalGeographicCode"
import { TYPE_VTEC } from "Types.Components/ValidTimeEventCode"
import { TYPE_HVTEC } from "Types.Components/HyrdrolicValidTimeEventCode"
import { ENUM_FORECAST_OFFICES } from "@Enums.Properties/Offices"
import { ENUM_REGULAR_EXPRESSIONS } from "@Enums/RegularExpressions"
import { GetEventLocationMetdata } from "@Components.Events.Building/GetEventLocationMetdata"
import { GetEventTags } from "@Components.Events.Building/GetEventTags"
import { GetStormMotion } from "@Components.Events.Building/GetStormMotion"
import { TextProductParsing } from "@Components.Events.Parsing.Classes/TextProductParsing"

interface GET_EVENT_PROPERTIES_OPTIONS {
    Message: string
    Attributes: TYPE_ATTRIBUTES
    VTEC?: TYPE_VTEC
    HVTEC?: TYPE_HVTEC
    UGC?: TYPE_UGC
}
    
export const GetEventProperties = ({ Message, Attributes, VTEC, HVTEC, UGC }: GET_EVENT_PROPERTIES_OPTIONS): TYPE_PROPERTIES => {
    const cTextProductParsing = new TextProductParsing({ Message });
    const cPolygons = cTextProductParsing.GetPolygon({});
    const { Severity, Cause, Record } = HVTEC ?? {};
    const cOffice = VTEC?.Office ?? Attributes?.cccc ?? null;
    const cProperties: TYPE_PROPERTIES = { 
        ...GetEventLocationMetdata({ Zones: UGC?.Zones, UGC }),
        description: cTextProductParsing.GetDescription({}),
        geography: {
            office: {
                abbreviation: cOffice,
                name: ENUM_FORECAST_OFFICES[cOffice] ?? null
            },
            wmo: Message.match(ENUM_REGULAR_EXPRESSIONS.OFFICE)?.[0] ?? null,
            zones: UGC?.Zones ?? [],
            population: {},
            polygon: cPolygons.length > 0 ? Buffer.from(JSON.stringify([cPolygons])).toString('base64') : null,
        },
        parameters: {
            tags: GetEventTags({ Message }),
            instructions: cTextProductParsing.GetTextReference({ Grep: [`For your protection`, `do not`, `use extreme caution`], Append: `...`, Exclude: [`.`]}) ?? null,
            source: cTextProductParsing.GetTextReference({ Grep: [`SOURCE...`], Exclude: [`.`]}) ?? null,
            hazards: cTextProductParsing.GetTextReference({ Grep: [`HAZARD...`], Exclude: [`.`]}) ?? null,
            impacts: cTextProductParsing.GetTextReference({ Grep: [`IMPACTS...`], Exclude: [`.`]}) ?? null,
            hail_size: cTextProductParsing.GetTextReference({ Grep: [`MAX HAIL SIZE...`, `HAIL...`], Exclude: [`in`]}) ?? null,
            wind_gusts: cTextProductParsing.GetTextReference({ Grep: [`MAX WIND GUST...`, `WIND...`], Exclude: [`mph`]}) ?? null,
            damage_indicator: cTextProductParsing.GetTextReference({ Grep: [`DAMAGE THREAT...`, `SNOW SQUALL IMPACT...`], Exclude: []}) ?? null,
            snow_squall_indicator: cTextProductParsing.GetTextReference({ Grep: [`SNOW SQUALL...`], Exclude: []}) ?? null,
            tornado_indicator: cTextProductParsing.GetTextReference({ Grep: [`TORNADO...`, `WATERSPOUT...`], Exclude: []}) ?? null,
            flood_indicator: cTextProductParsing.GetTextReference({ Grep: [`FLASH FLOOD...`], Exclude: []}) ?? null,
            wind_indicator: cTextProductParsing.GetTextReference({ Grep: [`WIND THREAT...`], Exclude: []}) ?? null,
            hail_indicator: cTextProductParsing.GetTextReference({ Grep: [`HAIL THREAT...`], Exclude: []}) ?? null,
            storm_motion: GetStormMotion({ Message }) ?? null,
        },
        flood_parameters: {
            severity: Severity ?? null,
            cause: Cause ?? null,
            record: Record ?? null,
        },
        discussion_parameters: {
            number: cTextProductParsing.GetTextReference({ Grep: [`Mesoscale Discussion `], Exclude: [`Mesoscale Discussion`, `Number`, `...`]})?.toString()?.padStart(4, "0") ?? null,
            issuance: cTextProductParsing.GetTextReference({ Grep: [`Probability of Watch Issuance...`], Exclude: [`percent`]}) ?? null,
            concerning: cTextProductParsing.GetTextReference({ Grep: [`Concerning...`], Exclude: []}) ?? null,
            max_tornado: cTextProductParsing.GetTextReference({ Grep: [`MOST PROBABLE PEAK TORNADO INTENSITY...`], Exclude: []}) ?? null,
            max_hail: cTextProductParsing.GetTextReference({ Grep: [`MOST PROBABLE PEAK HAIL SIZE...`], Exclude: []}) ?? null,
            max_gust: cTextProductParsing.GetTextReference({ Grep: [`MOST PROBABLE PEAK WIND GUST...`], Exclude: []}) ?? null,
        },
        watch_parameters: {
            number: VTEC?.Watch?.Status ? cTextProductParsing.GetTextReference({ Grep: [`ITIES FOR`, `UPDATE FOR`, `Watch Number `], Exclude: [`%`, `<`, `:`]})?.replace(/(WT|WS|)/g, '')?.trim()?.toString()?.padStart(4, "0") ?? VTEC?.Tracking?.slice(-4)?.toString()?.padStart(4, "0") ?? null : null,
            type: Message.includes(`TORNADO WATCH`) ? `TORNADO` : Message.includes(`SEVERE THUNDERSTORM WATCH`) ? `SEVERE THUNDERSTORM` : null,
            tornado_probability: cTextProductParsing.GetTextReference({ Grep: [`PROB OF 2 OR MORE TORNADOES`], Exclude: [`%`, `<`, `:`]}) ?? null,
            strong_tornado_probability: cTextProductParsing.GetTextReference({ Grep: [`PROB OF 1 OR MORE STRONG /EF2-EF5/ TORNADOES`], Exclude: [`%`, `<`, `:`]}) ?? null,
            severe_wind_probability: cTextProductParsing.GetTextReference({ Grep: [`PROB OF 10 OR MORE SEVERE WIND EVENTS`], Exclude: [`%`, `<`, `:`]}) ?? null,
            severe_hail_probability: cTextProductParsing.GetTextReference({ Grep: [`PROB OF 10 OR MORE SEVERE HAIL EVENTS`], Exclude: [`%`, `<`, `:`]}) ?? null,
            hail_2in_probability: cTextProductParsing.GetTextReference({ Grep: [`PROB OF 1 OR MORE HAIL EVENTS >= 2 INCHES`], Exclude: [`%`, `<`, `:`]}) ?? null,
            combined_hail_wind_probability: cTextProductParsing.GetTextReference({ Grep: [`PROB OF 6 OR MORE COMBINED SEVERE HAIL/WIND EVENTS`], Exclude: [`%`, `<`, `:`]}) ?? null,
            max_hail_inches: cTextProductParsing.GetTextReference({ Grep: [`MAX HAIL /INCHES/`], Exclude: [`%`, `<`, `:`]}) ?? null,
            max_wind_surface: cTextProductParsing.GetTextReference({ Grep: [`MAX WIND GUSTS SURFACE /KNOTS/`], Exclude: [`%`, `<`, `:`]}) ?? null,
            max_tops_x100feet: cTextProductParsing.GetTextReference({ Grep: [`MAX TOPS /X 100 FEET/`], Exclude: [`%`, `<`, `:`]}) ?? null,
            pds: cTextProductParsing.GetTextReference({ Grep: [`PARTICULARLY DANGEROUS SITUATION`], Exclude: [`%`, `<`, `:`]}) === `YES` ? true : null,
        }
    }
    if (isNaN(Number(cProperties.watch_parameters?.number))) {
        cProperties.watch_parameters.number = null;
    }
    return cProperties;
}