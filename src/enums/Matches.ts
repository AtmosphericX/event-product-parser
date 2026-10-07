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

type EnumMatchesType = {
    match: RegExp;
    label: string;
    statement: boolean;
};

export const EnumMatches: Record<string, EnumMatchesType[]> = {
    SPS: [
        { match: /STRONG\s+THUNDERSTORM/i, label: "Convective Special Weather Statement", statement: false },
        { match: /SPECIAL\s+WEATHER\s+STATEMENT/i, label: "Special Weather Statement", statement: false }
    ],
    TSU: [
        { match: /TSUNAMI\s+WARNING/i, label: "Tsunami Warning", statement: false },
        { match: /TSUNAMI\s+WATCH/i, label: "Tsunami Watch", statement: false },
        { match: /TSUNAMI\s+ADVISORY/i, label: "Tsunami Advisory", statement: false },
        { match: /TSUNAMI\s+INFORMATION\s+STATEMENT/i, label: "Tsunami Information Statement", statement: false },
        { match: /TSUNAMI\s+WARNING\s+CANCELLATION/i, label: "Tsunami Cancellation", statement: false }
    ],
    TCP: [
        { match: /A\s+HURRICANE\s+WARNING\s+IS\s+IN\s+EFFECT/i, label: "Hurricane Warning", statement: false },
        { match: /A\s+HURRICANE\s+WATCH\s+IS\s+IN\s+EFFECT/i, label: "Hurricane Watch", statement: false },
        { match: /A\s+TROPICAL\s+STORM\s+WARNING\s+IS\s+IN\s+EFFECT/i, label: "Tropical Storm Warning", statement: false },
        { match: /A\s+TROPICAL\s+STORM\s+WATCH\s+IS\s+IN\s+EFFECT/i, label: "Tropical Storm Watch", statement: false },
        { match: /A\s+STORM\s+SURGE\s+WARNING\s+IS\s+IN\s+EFFECT/i, label: "Storm Surge Warning", statement: false },
        { match: /A\s+STORM\s+SURGE\s+WATCH\s+IS\s+IN\s+EFFECT/i, label: "Storm Surge Watch", statement: false }
    ],
    MWW: [
        { match: /\.\.\.HURRICANE\s+FORCE\s+WIND\s+WARNING/i, label: "Hurricane Force Wind Warning", statement: false },
        { match: /\.\.\.HURRICANE\s+WARNING/i, label: "Hurricane Warning", statement: false },
        { match: /\.\.\.STORM\s+WARNING/i, label: "Storm Warning", statement: false },
        { match: /\.\.\.GALE\s+WARNING/i, label: "Gale Warning", statement: false },
        { match: /\.\.\.SMALL\s+CRAFT\s+ADVISORY/i, label: "Small Craft Advisory", statement: false },
        { match: /\.\.\.HAZARDOUS\s+SEAS\s+WARNING/i, label: "Hazardous Seas Warning", statement: false },
        { match: /\.\.\.DENSE\s+FOG\s+ADVISORY/i, label: "Dense Fog Advisory", statement: false },
        { match: /THUNDERSTORMS/i, label: "Convective Marine Weather Statement", statement: false },
        { match: /MARINE\s+WEATHER\s+STATEMENT/i, label: "Marine Weather Statement", statement: false },
    ],
    PNS: [
        { match: /NOAA\s+WEATHER\s+WIRE\s+SERVICE/i, label: "NOAA Weather Wire Service Report", statement: true },
        { match: /Public\s+Information\s+Statement/i, label: "Public Information Statement", statement: true },
    ],
    OFF: [
        { match: /\.\.\.HURRICANE\s+FORCE\s+WIND\s+WARNING/i, label: "Hurricane Force Wind Warning", statement: false },
        { match: /\.\.\.HURRICANE\s+WARNING/i, label: "Hurricane Warning", statement: false },
        { match: /\.\.\.STORM\s+WARNING/i, label: "Storm Warning", statement: false },
        { match: /\.\.\.GALE\s+WARNING/i, label: "Gale Warning", statement: false }
    ]
};