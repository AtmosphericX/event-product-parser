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
import { Bootstrap } from "@Bootstrap";
import { GetZonePolygon } from "@ParsingUGC/GetZonePolygon";
import { SetEventLocationMetadata } from "@BuilderUtilities/SetEventLocationMetadata";
import { SetDebug } from "@Utilities/SetDebug";

interface GetMergedWatchOptions { 
    Event: TypeEvent
}

const getWatch = (Tracking: string) => {
    return Bootstrap.Cache.Watches.find(A => A.tracking === Tracking);
}

export const GetUpdatedWatch = async ({ Event }: GetMergedWatchOptions): Promise<TypeEvent> => {
    const tick = performance.now();
    const { properties } = Event;
    const { geocode, metadata, status_metadata } = properties;
    const UGCs = geocode?.ugc ?? [];
    const expires = properties?.expires;
    const isExpired = status_metadata?.is_expired ?? false;

    let watch = getWatch(metadata.tracking);

    if (!watch) {
        watch = { tracking: metadata.tracking, zones: [] };
        Bootstrap.Cache.Watches.push(watch);
    }

    if (!isExpired) {
        for (const UGC of UGCs) {
            if (watch.zones.some((z: { id: string }) => z.id === UGC)) continue;
            const zone = GetZonePolygon({ Zones: [UGC], Union: false });
            watch.zones.push({
                id: UGC, 
                expires: expires,
                polygon: zone
            })
        }
    } else { 
        const expiredUGCs = new Set(UGCs);
        watch.zones = watch.zones.filter((z: { id: string }) => !expiredUGCs.has(z.id));
    }


    const A = await SetEventLocationMetadata({ Event, Zones: watch.zones.map((z: { id: string; }) => z.id) });

    SetDebug({ Title: `GetUpdatedWatch`, Message: `${Math.round(performance.now() - tick)}ms` })
    return {
        ...Event,
        properties: {
            ...Event.properties,
            locations: A.Locations,
            locations_array: A.LocationsArray,
            regions: A.Regions,
            regions_string: A.RegionsString,
            geocode: {
                ...Event.properties.geocode,
                ugc: A.UGC,
            },
        }
    };
};
