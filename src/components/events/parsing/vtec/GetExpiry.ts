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

import { SetLog } from "@Components.Utilities/SetLog";

interface GET_EXPIRY_OPTIONS { 
    Dates: string[]
}

export const GetExpiry = ({ Dates }: GET_EXPIRY_OPTIONS): string => {
    const dbgTickA = performance.now();
    const callPad = (n: number) => n.toString().padStart(2, '0');
    if (Dates?.[1] == `000000T0000Z`) return 'Invalid Date Format'
    const expires = `${new Date().getFullYear().toString().substring(0, 2)}${Dates[1].substring(0, 2)}-${Dates[1].substring(2, 4)}-${Dates[1].substring(4, 6)}T${Dates[1].substring(7, 9)}:${Dates[1].substring(9, 11)}:00`;
    const local = new Date(new Date(expires).getTime() - 4 * 60 * 60000);
    SetLog({ Type: `DEBUG`, Message: `[${(Math.round((performance.now() - dbgTickA) * 100) / 100).toFixed(1)}ms] GetExpiry (VTEC)` });
    return `${local.getFullYear()}-${callPad(local.getMonth() + 1)}-${callPad(local.getDate())}T${callPad(local.getHours())}:${callPad(local.getMinutes())}:00.000-04:00`;
   
}