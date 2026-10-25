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

type TYPE_REGEX_EVENTS = {
    Match: RegExp
    Label: string
    Statement: boolean
}

export const ENUM_REGEX_EVENTS: Record<string, TYPE_REGEX_EVENTS[]> = {
    SPS: [
        { Match: /STRONG\s+THUNDERSTORM/i, Label: "Convective Special Weather Statement", Statement: false },
        { Match: /SPECIAL\s+WEATHER\s+STATEMENT/i, Label: "Special Weather Statement", Statement: false }
    ],
    TSU: [
        { Match: /TSUNAMI\s+WARNING/i, Label: "Tsunami Warning", Statement: false },
        { Match: /TSUNAMI\s+WATCH/i, Label: "Tsunami Watch", Statement: false },
        { Match: /TSUNAMI\s+ADVISORY/i, Label: "Tsunami Advisory", Statement: false },
        { Match: /TSUNAMI\s+INFORMATION\s+STATEMENT/i, Label: "Tsunami Information Statement", Statement: false },
        { Match: /TSUNAMI\s+WARNING\s+CANCELLATION/i, Label: "Tsunami Cancellation", Statement: false }
    ],
    TCP: [
        { Match: /A\s+HURRICANE\s+WARNING\s+IS\s+IN\s+EFFECT/i, Label: "Hurricane Warning", Statement: false },
        { Match: /A\s+HURRICANE\s+WATCH\s+IS\s+IN\s+EFFECT/i, Label: "Hurricane Watch", Statement: false },
        { Match: /A\s+TROPICAL\s+STORM\s+WARNING\s+IS\s+IN\s+EFFECT/i, Label: "Tropical Storm Warning", Statement: false },
        { Match: /A\s+TROPICAL\s+STORM\s+WATCH\s+IS\s+IN\s+EFFECT/i, Label: "Tropical Storm Watch", Statement: false },
        { Match: /A\s+STORM\s+SURGE\s+WARNING\s+IS\s+IN\s+EFFECT/i, Label: "Storm Surge Warning", Statement: false },
        { Match: /A\s+STORM\s+SURGE\s+WATCH\s+IS\s+IN\s+EFFECT/i, Label: "Storm Surge Watch", Statement: false }
    ],
    MWW: [
        { Match: /\.\.\.HURRICANE\s+FORCE\s+WIND\s+WARNING/i, Label: "Hurricane Force Wind Warning", Statement: false },
        { Match: /\.\.\.HURRICANE\s+WARNING/i, Label: "Hurricane Warning", Statement: false },
        { Match: /\.\.\.STORM\s+WARNING/i, Label: "Storm Warning", Statement: false },
        { Match: /\.\.\.GALE\s+WARNING/i, Label: "Gale Warning", Statement: false },
        { Match: /\.\.\.SMALL\s+CRAFT\s+ADVISORY/i, Label: "Small Craft Advisory", Statement: false },
        { Match: /\.\.\.HAZARDOUS\s+SEAS\s+WARNING/i, Label: "Hazardous Seas Warning", Statement: false },
        { Match: /\.\.\.DENSE\s+FOG\s+ADVISORY/i, Label: "Dense Fog Advisory", Statement: false },
        { Match: /THUNDERSTORMS/i, Label: "Convective Marine Weather Statement", Statement: false },
        { Match: /MARINE\s+WEATHER\s+STATEMENT/i, Label: "Marine Weather Statement", Statement: false },
    ],
    PNS: [
        { Match: /NOAA\s+WEATHER\s+WIRE\s+SERVICE/i, Label: "NOAA Weather Wire Service Report", Statement: true },
        { Match: /Public\s+Information\s+Statement/i, Label: "Public Information Statement", Statement: true },
    ],
    OFF: [
        { Match: /\.\.\.HURRICANE\s+FORCE\s+WIND\s+WARNING/i, Label: "Hurricane Force Wind Warning", Statement: false },
        { Match: /\.\.\.HURRICANE\s+WARNING/i, Label: "Hurricane Warning", Statement: false },
        { Match: /\.\.\.STORM\s+WARNING/i, Label: "Storm Warning", Statement: false },
        { Match: /\.\.\.GALE\s+WARNING/i, Label: "Gale Warning", Statement: false }
    ]
};