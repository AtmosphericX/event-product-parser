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

import { ENUM_UPGRADED_EVENTS } from "@Enums.Events/UpgradeEvents"

interface GET_UPGRADED_EVENT_NAME_OPTIONS {
    Name: string
    Description: string
    DamageThreat?: string
    SnowSquallThreat?: string
    TornadoThreat?: string
}
    
export const GetUpgradedEventName = ({Name, Description, DamageThreat, SnowSquallThreat, TornadoThreat}: GET_UPGRADED_EVENT_NAME_OPTIONS): string => {
    const cHook = ENUM_UPGRADED_EVENTS[Name]?.find((lHook) => {
        if (DamageThreat && lHook.DamageMatch && !new RegExp(lHook.DamageMatch, "i").test(DamageThreat)) {
            return false;
        }
        if (SnowSquallThreat && lHook.SnowSquallMatch && !new RegExp(lHook.SnowSquallMatch, "i").test(SnowSquallThreat)) {
            return false;
        }
        if (TornadoThreat && lHook.TornadoMatch && !new RegExp(lHook.TornadoMatch, "i").test(TornadoThreat)) {
            return false;
        }
        if (Description && lHook.Match && !new RegExp(lHook.Match, "i").test(Description)) {
            return false;
        }
        return true;
    });
    return cHook?.Label ?? Name;
}