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

import { TypeSettings } from "TypesStandard/Settings"
import { Bootstrap } from "@Bootstrap"

export const SetSettings = (imported: TypeSettings): TypeSettings => {
    const settings = Bootstrap.Settings as Record<string, unknown>;
    const merge = (target: Record<string, unknown>, source: Record<string, unknown>) => {
        for (const key in source) {
            if (!Object.prototype.hasOwnProperty.call(source, key)) continue;
            const srcVal = source[key];
            const tgtVal = target[key];
            if (srcVal && typeof srcVal === 'object' && !Array.isArray(srcVal)) {
                if (!tgtVal || typeof tgtVal !== 'object' || Array.isArray(tgtVal)) {
                    target[key] = {};
                }
                merge(target[key] as Record<string, unknown>, srcVal as Record<string, unknown>);
            } else {
                target[key] = srcVal;
            }
        }
    };
    merge(settings, imported as Record<string, unknown>);
    return settings as TypeSettings;
}
