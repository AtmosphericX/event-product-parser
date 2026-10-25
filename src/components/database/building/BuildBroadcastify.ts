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
import { CreateQuery } from "@Components.Database/CreateQuery"
import { SetLog } from "@Components.Utilities/SetLog"
import { CreateFetchRequest } from "@Components.Utilities/CreateFetchRequest"

type TYPE_COUNT_RESULT = { count: number };
type TYPE_BROADCASTIFY_ROW = {
    State: string
    County: string
    Feed: string
    Type: string
    Link: string
}

export const BuildBroadcastify = async (): Promise<void> => {
    const dbgTickA = performance.now();

    const { Database, Settings } = Bootstrap;
    const { Broadcastify } = Settings.Integrations;
    const { count } = CreateQuery({ Query: ENUM_STRINGS.DB_STRINGS.COUNTS.BROADCASTIFY })[0] as TYPE_COUNT_RESULT;
    
    if (count == 0) { 
        const cResponse = await CreateFetchRequest({
            Destination: Broadcastify.Download,
            Timeout: 5e3,
        });

        if (cResponse.Error) {
            return SetLog({ Type: `ERROR`, Message: `${ENUM_STRINGS.CALLBACKS.HTTP_REQUEST_FAILED} for broadcastify download (Status: ${cResponse.StatusCode})` })
        }

        const cBatch: TYPE_BROADCASTIFY_ROW[] = [];
        const cDatabase = JSON.parse(cResponse.Body)
        const callTransaction = Database.transaction((cEntries: TYPE_BROADCASTIFY_ROW[]) => {
            for (const cEntry of cEntries) {
                const { State, County, Feed, Type, Link } = cEntry;
                CreateQuery({
                    Query: ENUM_STRINGS.DB_STRINGS.IMPORTS.BROADCASTIFY,
                    Parameters: [State, County, Feed, Type, Link]
                })
            }
        })
        
        for (const cBroadcastify of cDatabase) {
            const { counties, state } = cBroadcastify;
            SetLog({ Message: ENUM_STRINGS.DATABASE.BROADCASTIFY_BUILD.replace(/%s/g, String(counties.length)).replace(`%d`, String(state)) })
            for (const cCounty of counties) { 
                const { county, feeds} = cCounty;
                for (const cFeed of feeds) {
                    const { name, type, link } = cFeed;
                    const cDuplicate = cBatch.some(lEntry => lEntry.State === state && lEntry.County === county && lEntry.Feed === name && lEntry.Type === type && lEntry.Link === link);
                    if (!cDuplicate) {
                        cBatch.push({ State: state, County: county, Feed: name, Type: type, Link: link })
                    }
                }
            }
        }
        callTransaction(cBatch);
        SetLog({ Type: `DEBUG`, Message: `[${(Math.round((performance.now() - dbgTickA) * 100) / 100).toFixed(1)}ms] BuildBroadcastify` })
    }  
}

