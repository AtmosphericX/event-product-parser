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

import { TYPE_SETTINGS } from "Types.Components/Settings"
import { ENUM_STRINGS } from "@Enums/Strings"
import { Bootstrap } from "@Bootstrap"
import { SetLog } from "@Components.Utilities/SetLog";

export const SetSettings = (settings: TYPE_SETTINGS): TYPE_SETTINGS => {
    const callAssign = (TargetConfiguration: Record<string, unknown>, SourceConfiguration: Record<string, unknown>): void => {
        for (const cKey in SourceConfiguration) {
            const cSetting = cKey as keyof typeof TargetConfiguration;
            if (!Object.prototype.hasOwnProperty.call(TargetConfiguration, cSetting)) {
                SetLog({ Type: `ERROR`, Message: `${ENUM_STRINGS.CALLBACKS.SETTINGS_INVALID_KEY.replace(/%s/g, cSetting)}` });
                continue;
            }
            const cNewValue = SourceConfiguration[cKey];
            const cCurrentValue = TargetConfiguration[cSetting];
            if (cNewValue !== null && typeof cNewValue === "object" && !Array.isArray(cNewValue)) {
                const nextTarget = cCurrentValue && typeof cCurrentValue === "object" && !Array.isArray(cCurrentValue)
                    ? (cCurrentValue as Record<string, unknown>)
                    : {};
                TargetConfiguration[cSetting] = nextTarget as never;
                callAssign(nextTarget, cNewValue as Record<string, unknown>);
            } else {
                TargetConfiguration[cSetting] = cNewValue as never;
            }
        }
    };
    callAssign(Bootstrap.Settings as Record<string, unknown>, settings as Record<string, unknown>);
    return Bootstrap.Settings;
}

