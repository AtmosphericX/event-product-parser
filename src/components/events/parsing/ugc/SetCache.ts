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

import { Bootstrap } from "@Bootstrap";

interface SET_CACHE_OPTIONS { 
    Key: string
    Value: string[]
}

export const SetCache = ({ Key, Value }: SET_CACHE_OPTIONS): void => {
    const { Zones } = Bootstrap.CacheControl.Manager;
    if (Zones.size >= 5000) { 
        const cFirstKey = Zones.keys().next().value;
        Bootstrap.CacheControl.Manager.Zones.delete(cFirstKey);
    }
    Bootstrap.CacheControl.Manager.Zones.set(Key, Value);
}