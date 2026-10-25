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
import { SetLog } from "@Components.Utilities/SetLog";

interface GET_EXPIRY_OPTIONS { 
    Message: string
}

export const GetExpiry = ({ Message }: GET_EXPIRY_OPTIONS): Date | null => {
    const dbgTickA = performance.now();
    const cMatch = Message.match(ENUM_REGULAR_EXPRESSIONS.TEXT_EXPIRY);
    if (!cMatch) return null;
    const [, cExpiry] = cMatch;
    const cTimestamp = new Date();
    const cDay = Number(cExpiry.slice(0, 2));
    const dHour = Number(cExpiry.slice(2, 4));
    const cMinute = Number(cExpiry.slice(4, 6));
    const cExpires = new Date(Date.UTC(cTimestamp.getUTCFullYear(), cTimestamp.getUTCMonth(), cDay, dHour, cMinute));
    SetLog({ Type: `DEBUG`, Message: `[${(Math.round((performance.now() - dbgTickA) * 100) / 100).toFixed(1)}ms] GetExpiry` });
    return cExpires;
}