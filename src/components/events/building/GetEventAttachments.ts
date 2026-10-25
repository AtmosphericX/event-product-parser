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

import { ENUM_REGULAR_EXPRESSIONS } from "@Enums/RegularExpressions"
import { ENUM_STATES_FULL_NAMES } from "@Enums/geographic/StateAbreviations"
import { ENUM_STRINGS } from "@Enums/Strings"
import { Bootstrap } from "@Bootstrap"
import { GetLatestIssuance } from "@Components.Events.Building/GetLatestIssuance"
import { CreateQuery } from "@Components.Database/CreateQuery"

interface GET_EVENT_ATTACHMENTS_OPTIONS {
    Event: string
    Locations?: string[]
    DiscussionNumber?: string | number
    WatchNumber?: string | number
}

interface GET_EVENT_ATTACHMENTS_RESPONSE { 
    name: string
    link: string
}

type BROADCASTIFY_RESPONSE = { 
    State: string
    County: string
    Feed: string
    Type: string
    Link: string
}

const ENUM_DIRECTIONS: string[] = [`Northern`, `Southern`, `Eastern`, `Western`, `Inland`, `Costal`, `County`]
const ENUM_BROADCASTIFY_TYPES: string[] = [`Other`, `Public Safety`]
    
export const GetEventAttachments = ({ Event, DiscussionNumber, WatchNumber, Locations }: GET_EVENT_ATTACHMENTS_OPTIONS): GET_EVENT_ATTACHMENTS_RESPONSE[] => {
    const { Broadcastify } = Bootstrap.Settings.Integrations
    const cAttachments: GET_EVENT_ATTACHMENTS_RESPONSE[] = [];
    const cIssuance = GetLatestIssuance();
    const cEvents = [
        { name: `Image: SPC Day 1 Outlook`, target: "Storm Prediction Center Day 1 Outlook", attachment: `https://www.spc.noaa.gov/products/outlook/day1otlk_${cIssuance}.png` },
        { name: `Image: SPC Day 1 Outlook (Tornado)`, target: "Storm Prediction Center Day 1 Outlook", attachment: `https://www.spc.noaa.gov/products/outlook/day1probotlk_${cIssuance}_torn.png` },
        { name: `Image: SPC Day 1 Outlook (Hail)`, target: "Storm Prediction Center Day 1 Outlook", attachment: `https://www.spc.noaa.gov/products/outlook/day1probotlk_${cIssuance}_hail.png` },
        { name: `Image: SPC Day 1 Outlook (Wind)`, target: "Storm Prediction Center Day 1 Outlook", attachment: `https://www.spc.noaa.gov/products/outlook/day1probotlk_${cIssuance}_wind.png` },
        { name: `Image: SPC Day 2 Outlook`, target: "Storm Prediction Center Day 2 Outlook", attachment: `https://www.spc.noaa.gov/products/outlook/day2otlk.png` },
        { name: `Image: SPC Day 2 Outlook (Tornado)`, target: "Storm Prediction Center Day 2 Outlook", attachment: `https://www.spc.noaa.gov/products/outlook/day2probotlk_torn.png` },
        { name: `Image: SPC Day 2 Outlook (Hail)`, target: "Storm Prediction Center Day 2 Outlook", attachment: `https://www.spc.noaa.gov/products/outlook/day2probotlk_hail.png` },
        { name: `Image: SPC Day 2 Outlook (Wind)`, target: "Storm Prediction Center Day 2 Outlook", attachment: `https://www.spc.noaa.gov/products/outlook/day2probotlk_wind.png` },
        { name: `Image: SPC Day 3 Outlook`, target: "Storm Prediction Center Day 3 Outlook", attachment: `https://www.spc.noaa.gov/products/outlook/day3otlk.png` },
        { name: `Image: Mesoscale Discussion`, target: "Mesoscale Discussion", attachment: `https://www.spc.noaa.gov/products/md/mcd${DiscussionNumber}.png` },
        { name: `Image: Tornado Watch`, target: "Tornado Watch", attachment: `https://www.spc.noaa.gov/products/watch/ww${WatchNumber}_radar_big.gif` },
        { name: `Image: PDS Tornado Watch`, target: "PDS Tornado Watch", attachment: `https://www.spc.noaa.gov/products/watch/ww${WatchNumber}_radar_big.gif` },
        { name: `Image: Severe Thunderstorm Watch`, target: "Severe Thunderstorm Watch", attachment: `https://www.spc.noaa.gov/products/watch/ww${WatchNumber}_radar_big.gif` },
        { name: `Image: PDS Severe Thunderstorm Watch`, target: "PDS Severe Thunderstorm Watch", attachment: `https://www.spc.noaa.gov/products/watch/ww${WatchNumber}_radar_big.gif` }
    ];

    cAttachments.push(...cEvents
        .filter(({ target }) => target.toLowerCase() === Event.toLowerCase())
        .map(({ name, attachment }) => ({ name, link: attachment })));

    if (Broadcastify.Attachments && Locations?.length > 0) {
        for (const cLocation of Locations) {
            if (ENUM_REGULAR_EXPRESSIONS.Location.test(cLocation)) {
                const cCount = cLocation?.split(',')[0]?.trim().replace(new RegExp(`^(${ENUM_DIRECTIONS.join('|')}) `), '')
                const cState = ENUM_STATES_FULL_NAMES[cLocation?.split(',')[1]?.trim()]
                const cFeeds = CreateQuery({
                    Query: ENUM_STRINGS.DB_STRINGS.QUERIES.BROADCASTIFY_LOOKUP,
                    Parameters: [cState, cCount]
                });
                const cTypes = cFeeds.sort((A: BROADCASTIFY_RESPONSE, B: BROADCASTIFY_RESPONSE) => {
                    const indexA = ENUM_BROADCASTIFY_TYPES.indexOf(A.Type);
                    const indexB = ENUM_BROADCASTIFY_TYPES.indexOf(B.Type);
                    return (indexA === -1 ? ENUM_BROADCASTIFY_TYPES.length : indexA) -
                        (indexB === -1 ? ENUM_BROADCASTIFY_TYPES.length : indexB);
                });
                const cFiltered = cTypes.filter((cFeed: BROADCASTIFY_RESPONSE) => Broadcastify.FilteredTags.includes(cFeed.Type));
                if (cFiltered.length > 0) {
                    cAttachments.push(...cFiltered.map((cBroadcastify: BROADCASTIFY_RESPONSE) => ({
                        name: `[${cBroadcastify.Type}] ${cBroadcastify.Feed}`,
                        link: cBroadcastify.Link
                    })));
                }
            }
        }
    }

    return cAttachments;
}