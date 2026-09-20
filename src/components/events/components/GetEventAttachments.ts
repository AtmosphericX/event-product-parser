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

import { TypeEvent } from "TypesEvent/Event"
import { EnumStates } from "@Enums/States"
import { Bootstrap } from "@Bootstrap"
import { EnumExpressions } from "@Enums/Expressions"
import { GetLatestIssuance } from "@Utilities/GetLatestIssuance"
import { CreateQuery } from "@Database/CreateQuery"

interface GetEventAttachmentsResponse { 
    name: string
    link: string
}

type BroadcastifyResponse = { 
    state: string
    county: string
    feed: string
    type: string
    link: string
}

export const GetEventAttachments = (event: TypeEvent): GetEventAttachmentsResponse[] | null => {
    let attachments = [];
    const settings = Bootstrap.Settings;
    const issuanceTime = GetLatestIssuance();
    const spcNumber = event?.properties?.discussion_parameters?.discussion_number;
    const watchNumber = event?.properties?.watch_parameters?.watch_number;
    const locations = event?.properties?.locations_array;
    const events = [
        { target: "Storm Prediction Center Day 1 Outlook", attachment: `https://www.spc.noaa.gov/products/outlook/day1otlk_${issuanceTime}.png` },
        { target: "Storm Prediction Center Day 2 Outlook", attachment: `https://www.spc.noaa.gov/products/outlook/day2otlk.png` },
        { target: "Storm Prediction Center Day 3 Outlook", attachment: `https://www.spc.noaa.gov/products/outlook/day3otlk.png` },
        { target: "Mesoscale Discussion", attachment: `https://www.spc.noaa.gov/products/md/mcd${spcNumber}.png` },
        { target: "Tornado Watch", attachment: `https://www.spc.noaa.gov/products/watch/ww${watchNumber}_radar_big.gif` },
        { target: "PDS Tornado Watch", attachment: `https://www.spc.noaa.gov/products/watch/ww${watchNumber}_radar_big.gif` },
        { target: "Severe Thunderstorm Watch", attachment: `https://www.spc.noaa.gov/products/watch/ww${watchNumber}_radar_big.gif` },
        { target: "PDS Severe Thunderstorm Watch", attachment: `https://www.spc.noaa.gov/products/watch/ww${watchNumber}_radar_big.gif` }
    ]

    if (events.find((e) => e.target === event.properties.event)) {
        attachments.push({ name: `Image: Graphic`, link: events.find((e) => e.target.toLowerCase() === event.properties.event.toLowerCase()).attachment });
    }

    if (settings.BroadcastifySettings.BroadcastifyAttachments) {
        for (const location of locations) {
            if (EnumExpressions.location.test(location)) {
                const lines = [`Northern`, `Southern`, `Eastern`, `Western`, `Inland`, `Costal`, `County`]
                const county = location?.split(',')[0]?.trim().replace(new RegExp(`^(${lines.join('|')}) `), '')
                const state = EnumStates[location?.split(',')[1]?.trim()]
                const feeds = CreateQuery({ Query: `SELECT * FROM broadcastify WHERE state = ? AND county = ?`, Parameters: [state, county] }) as BroadcastifyResponse[];
                const so = feeds.sort((a: BroadcastifyResponse, b: BroadcastifyResponse) => {
                    const typeOrder = ['Other', 'Public Safety'];
                    const indexA = typeOrder.indexOf(a.type);
                    const indexB = typeOrder.indexOf(b.type);
                    return indexA - indexB;
                });
                const tags = Bootstrap.Settings.BroadcastifySettings.BroadcastifyTags;
                const filtered = so.filter((feed: BroadcastifyResponse) => tags.includes(feed.type));
                if (filtered.length > 0) {
                    filtered.map((filtered: BroadcastifyResponse) => {
                        if (!attachments.some((a) => a.link === filtered.link)) {
                            attachments.push({ name: `${filtered.type}: ${filtered.feed}`, link: filtered.link });
                        }
                    });
                }
            }
        }
    }
    return attachments;
}