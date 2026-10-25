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

import { Bootstrap } from "@Bootstrap"

interface SET_TIMEOUT_ACTION_OPTIONS {
    Identifier: string
    AddTime?: boolean
    Max?: number
    Interval?: number
    Expire?: boolean
}

export const SetTimeoutAction = ({ Identifier, AddTime, Max, Interval, Expire }: SET_TIMEOUT_ACTION_OPTIONS): boolean => {
    const { CacheControl } = Bootstrap;  
    let lTarget = Bootstrap.CacheControl.Limits?.[Identifier];

    if (!lTarget) {
        CacheControl.Limits[Identifier] = [];
        lTarget = CacheControl.Limits?.[Identifier];
    }
    if (Expire) {
        delete CacheControl.Limits?.[Identifier];
        return false
    }
    if (lTarget?.length > 0) {
       CacheControl.Limits[Identifier] = lTarget.filter((ts: number) => Date.now() - ts < Interval * 1000);
       lTarget = CacheControl.Limits?.[Identifier];
    }

    const cTimetstamp = lTarget?.[0];
    const mWait = cTimetstamp ? Math.ceil((Interval * 1000) - (Date.now() - cTimetstamp)) : 0;
    const cMaxRequests = Max ?? 1;
    
    if (lTarget?.length >= cMaxRequests && mWait > 0) {
        return true
    }
    CacheControl.Limits?.[Identifier].push(Date.now());
    return false
}