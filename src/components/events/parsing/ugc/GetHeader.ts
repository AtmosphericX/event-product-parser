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

interface GET_HEADER_OPTIONS { 
    Message: string
}

export const GetHeader = ({ Message }: GET_HEADER_OPTIONS): string | null => {
    const dbgTickA = performance.now();
    const cStart = Message.search(ENUM_REGULAR_EXPRESSIONS.UGC_PT1);
    const cSub = Message.substring(cStart);
    const cEnd = cSub.search(ENUM_REGULAR_EXPRESSIONS.UGC_PT2);
    SetLog({ Type: `DEBUG`, Message: `[${(Math.round((performance.now() - dbgTickA) * 100) / 100).toFixed(1)}ms] GetHeader` });
    const cFinal = cSub.substring(0, cEnd)
        .replace(/\s+/g, '')
        .slice(0, -1);
    return cFinal ?? null;
}