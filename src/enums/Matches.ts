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
        { match: /STRONG THUNDERSTORM/i, label: "Convective Special Weather Statement", statement: false },
        { match: /SPECIAL WEATHER STATEMENT/i, label: "Special Weather Statement", statement: false }
    ],
    TSU: [
        { match: /TSUNAMI WARNING/i, label: "Tsunami Warning", statement: false },
        { match: /TSUNAMI WATCH/i, label: "Tsunami Watch", statement: false },
        { match: /TSUNAMI ADVISORY/i, label: "Tsunami Advisory", statement: false },
        { match: /TSUNAMI INFORMATION STATEMENT/i, label: "Tsunami Information Statement", statement: false },
        { match: /TSUNAMI WARNING CANCELLATION/i, label: "Tsunami Cancellation", statement: false }
    ],
    //TCP: [
    //    { match: /HURRICANE WARNING /i, label: "Hurricane Warning", statement: false },
    //    { match: /HURRICANE WATCH/i, label: "Hurricane Watch", statement: false },
    //    { match: /TROPICAL STORM WARNING/i, label: "Tropical Storm Warning", statement: false },
    //    { match: /TROPICAL STORM WATCH/i, label: "Tropical Storm Watch", statement: false },
    //    { match: /STORM SURGE WARNING/i, label: "Storm Surge Warning", statement: false },
    //    { match: /STORM SURGE WATCH/i, label: "Storm Surge Watch", statement: false }
    //],
    MWW: [
        { match: /SMALL CRAFT ADVISORY/i, label: "Small Craft Advisory", statement: false },
        { match: /GALE WARNING/i, label: "Gale Warning", statement: false },
        { match: /STORM WARNING/i, label: "Storm Warning", statement: false },
        { match: /HURRICANE FORCE WIND WARNING/i, label: "Hurricane Force Wind Warning", statement: false },
        { match: /HAZARDOUS SEAS WARNING/i, label: "Hazardous Seas Warning", statement: false },
        { match: /DENSE FOG ADVISORY/i, label: "Dense Fog Advisory", statement: false },
        { match: /THUNDERSTORMS/i, label: "Convective Marine Weather Statement", statement: false },
        { match: /MARINE WEATHER STATEMENT/i, label: "Marine Weather Statement", statement: false },
    ],
    PNS: [
        { match: /NOAA WEATHER WIRE SERVICE/i, label: "NOAA Weather Wire Service Report", statement: true },
        { match: /Public Information Statement/i, label: "Public Information Statement", statement: true },
    ]
};