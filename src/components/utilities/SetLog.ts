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
import { SetTimeoutAction } from "@Components.Utilities/SetTimeoutAction"

const ENUM_LOGS_TYPES = {
    DEBUG: {Title: ENUM_STRINGS.DEBUG_PREFIX, Debug: true},
    ERROR: {Title: ENUM_STRINGS.ERROR_PREFIX, Debug: false},
    DEFAULT: {Title: ENUM_STRINGS.DEFAULT_PREFIX, Debug: false}
}

interface SET_LOG_OPTIONS {
    Type?: "DEFAULT" | "DEBUG" | "ERROR"
    Message: string | Record<string, any>
    Metadata?: Record<string, any>
    Limited?: boolean
    Event?: string
    Hidden?: boolean
}

export const SetLog = ({ Type = "DEFAULT", Message, Event, Metadata, Limited, Hidden }: SET_LOG_OPTIONS): void => {
    const { ConsoleMessages, DebugMessages, DebugMinimumTime } = Bootstrap.Settings.DeveloperSettings;
    const cType = ENUM_LOGS_TYPES[Type] ?? ENUM_LOGS_TYPES.DEFAULT;
    const cFullMessage = `[${cType.Title}] ${Message}`;
    const cCleanMessage = String(Message)?.replace(/\x1b\[[0-9;]*m/g, ``);
    const cEvent = Event ?? (cType.Debug ? `debug` : `log`);

    if (Limited) {
        const A = SetTimeoutAction({ 
            Identifier: `CE-${Event}`,
            AddTime: true,
            Max: 1,
            Interval: 1
        })
        if (A) { return }
    }

    Bootstrap.Listener.emit(cEvent, { Message: cCleanMessage, Headers: Metadata ?? {} });
    Bootstrap.Listener.emit(`*`, { Event: cEvent, Metadata: cCleanMessage, Headers: Metadata ?? {} });

    if (DebugMessages && cType.Debug) {
        const cDebugMatch = cCleanMessage.match(/^\[(\d+(?:\.\d+)?)ms\]/);
        if (cDebugMatch && parseFloat(cDebugMatch[1]) <= DebugMinimumTime) { return }
        console.log(cFullMessage);
        return 
    }

    if (!cType.Debug && ConsoleMessages && !Hidden) { 
        console.log(cFullMessage); 
    }
}