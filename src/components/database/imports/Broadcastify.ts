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

import { Bootstrap } from "@Bootstrap"
import { CreateHttp } from "@Utilities/CreateHttp"
import { SetWarning } from "@Utilities/SetWarning"
import { CreateQuery } from "@Database/CreateQuery";

export const Broadcastify = async (): Promise<void> => {
    const settings = Bootstrap.Settings;
    const broadcastify = await CreateHttp({
        URL: settings.BroadcastifySettings.BroadcastifyDatabase,
        Timeout: 5000,
    });
    if (!broadcastify.error) {  
        const states = JSON.parse(broadcastify.message);
        const insert = `INSERT INTO broadcastify (state, county, feed, type, link) VALUES (?, ?, ?, ?, ?)`;
        const transaction = Bootstrap.Database.transaction((rows: any[]) => {
            for (const row of rows) {
                CreateQuery({ Query: insert, Parameters: row });
            }
        });
        const batch: any[] = [];
        for (const state of states) {
            SetWarning({ Message: `Importing ${state.counties.length} counties from ${state.state} for Broadcastify` });
            for (const county of state.counties) {
                const countyName = county.county;
                for (const feed of county.feeds) {
                    batch.push([
                        state.state,
                        countyName,
                        feed.name,
                        feed.type,
                        feed.link
                    ]);
                }
            }
        }
        transaction(batch);
    }
    if (broadcastify.error) {
        SetWarning({ Message: `Error importing Broadcastify data: ${broadcastify.message}` });
    }
};