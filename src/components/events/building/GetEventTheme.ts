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
import { GetWildcardSet } from "@Components.Utilities/GetWildcardSet"

interface GET_EVENT_THEME_OPTIONS {
    Event: string
}

export const GetEventTheme = ({ Event }: GET_EVENT_THEME_OPTIONS): string => {
    const { Themes } = Bootstrap.Settings.GlobalSettings;
    return Themes.find(lTheme => GetWildcardSet({Input: [lTheme.Event], Wildcard: Event}))?.RGB ?? `rgb(56, 72, 88)`
}