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

type Themes = { 
    Event: string;
    RGB: string;
}

export const EnumThemes: Themes[] = [
    { Event: `Tornado Emergency`, RGB: `rgb(166, 0, 255)` },
    { Event: `Flash Flood Emergency`, RGB: `rgb(21, 216, 37)` },
    { Event: `*PDS Tornado Warning*`, RGB: `rgb(208, 0, 255)` },
    { Event: `*Tornado Warning*`, RGB: `rgb(255, 0, 0)` },
    { Event: `Confirmed Tornado Warning`, RGB: `rgb(220, 20, 20)` },
    { Event: `Radar Indicated Tornado Warning`, RGB: `rgb(200, 30, 30)` },
    { Event: `Tornado Warning`, RGB: `rgb(180, 40, 40)` },
    { Event: `*EDS Severe Thunderstorm Warning*`, RGB: `rgb(255, 51, 0)` },
    { Event: `*Destructive Severe Thunderstorm Warning*`, RGB: `rgb(255, 51, 0)` },
    { Event: `Destructive Severe Thunderstorm Warning (TPROB)`, RGB: `rgb(240, 60, 0)` },
    { Event: `EDS Severe Thunderstorm Warning (TPROB)`, RGB: `rgb(240, 60, 0)` },
    { Event: `Considerable Severe Thunderstorm Warning (TPROB)`, RGB: `rgb(230, 100, 0)` },
    { Event: `*Severe Thunderstorm Warning*`, RGB: `rgb(197, 159, 32)` },
    { Event: `Severe Thunderstorm Warning (TPROB)`, RGB: `rgb(210, 140, 20)` },
    { Event: `Considerable Severe Thunderstorm Warning`, RGB: `rgb(204, 160, 0)` },
    { Event: `Severe Thunderstorm Warning`, RGB: `rgb(204, 132, 0)` },
    { Event: `Flash Flood Warning`, RGB: `rgb(97, 204, 30)` },
    { Event: `Flood Warning`, RGB: `rgb(0, 204, 0)` },
    { Event: `Hurricane Warning`, RGB: `rgb(16, 125, 176)` },
    { Event: `Tsunami Warning`, RGB: `rgb(93, 27, 158)` },
    { Event: `Tsunami Watch`, RGB: `rgb(72, 16, 128)` },
    { Event: `Tsunami Advisory`, RGB: `rgb(80, 48, 160)` },
    { Event: `Tropical Storm Warning`, RGB: `rgb(101, 194, 238)` },
    { Event: `Hurricane Watch`, RGB: `rgb(204, 84, 144)` },
    { Event: `*PDS Blizzard Warning*`, RGB: `rgb(5, 115, 151)` },
    { Event: `Blizzard Warning`, RGB: `rgb(0, 152, 204)` },
    { Event: `Snow Squall Warning`, RGB: `rgb(56, 104, 144)` },
    { Event: `*PDS Ice Storm Warning*`, RGB: `rgb(86, 67, 196)` },
    { Event: `Ice Storm Warning`, RGB: `rgb(58, 49, 111)` },
    { Event: `Lake Effect Snow Warning`, RGB: `rgb(0, 111, 111)` },
    { Event: `Winter Storm Warning`, RGB: `rgb(24, 115, 204)` },
    { Event: `Extreme Cold Warning`, RGB: `rgb(47, 47, 137)` },
    { Event: `Tornadic Special Marine Warning`, RGB: `rgb(3, 134, 134)` },
    { Event: `Special Marine Warning`, RGB: `rgb(0, 204, 204)` },
    { Event: `Special Weather Statement`, RGB: `rgb(70, 130, 180)` },
    { Event: `Mesoscale Discussion`, RGB: `rgb(255, 0, 0)` },
    { Event: `Mesoscale Precipitation Discussion`, RGB: `rgb(0, 255, 0)` },
    { Event: `*PDS Tornado Watch*`, RGB: `rgb(255, 0, 0)` },
    { Event: `*Tornado Watch*`, RGB: `rgb(151, 23, 23)` },
    { Event: `*PDS Severe Thunderstorm Watch*`, RGB: `rgb(255, 81, 0)` },
    { Event: `*Severe Thunderstorm Watch*`, RGB: `rgb(255, 204, 0)` },
    { Event: `*Excessive Heat Warning*`, RGB: `rgb(255, 255, 255)` },
    { Event: `*Flood*`, RGB: `rgb(0, 255, 128)` },
    { Event: `*Heat*`, RGB: `rgb(240, 197, 119)` },
    { Event: `*Special Weather Statement*`, RGB: `rgb(211, 191, 125)` },
    { Event: `Default`, RGB: `rgb(86, 125, 165)` },
];