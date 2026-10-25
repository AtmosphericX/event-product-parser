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

type TYPE_UPGRADED_EVENTS = {
    Match: RegExp
    Label: string
    DamageMatch?: string
    SnowSquallMatch?: string
    TornadoMatch?: string
}

export const ENUM_UPGRADED_EVENTS: Record<string, TYPE_UPGRADED_EVENTS[]> = {
    ["Tornado Warning"]: [
        { Match: /TORNADO\s+EMERGENCY/i, Label: "Tornado Emergency", DamageMatch: `CATASTROPHIC`, TornadoMatch: `OBSERVED` },
        { Match: /TORNADO\s+EMERGENCY/i, Label: "Radar Indicated Tornado Emergency", DamageMatch: `CATASTROPHIC`, TornadoMatch: `RADAR INDICATED` },
        { Match: /PARTICULARLY\s+DANGEROUS\s+SITUATION/i, Label: "PDS Tornado Warning", DamageMatch: `CONSIDERABLE`, TornadoMatch: `OBSERVED` },
        { Match: /PARTICULARLY\s+DANGEROUS\s+SITUATION/i, Label: "PDS Radar Indicated Tornado Warning", DamageMatch: `CONSIDERABLE`, TornadoMatch: `RADAR INDICATED` },
        { Match: /SOURCE\.\.\.RADAR\s+CONFIRMED\s+TORNADO\./i, Label: "Radar Confirmed Tornado Warning", TornadoMatch: `OBSERVED` },
        { Match: /TORNADO\s+WARNING/i, Label: "Confirmed Tornado Warning", TornadoMatch: `OBSERVED` },
        { Match: /TORNADO\s+WARNING/i, Label: "Radar Indicated Tornado Warning" }
    ],
    ['Severe Thunderstorm Warning']: [
        { Match: /EXTREMELY\s+DANGEROUS\s+SITUATION/i, Label: "EDS Severe Thunderstorm Warning", DamageMatch: `DESTRUCTIVE`, TornadoMatch: `OBSERVED` },
        { Match: /EXTREMELY\s+DANGEROUS\s+SITUATION/i, Label: "EDS Severe Thunderstorm Warning (TPROB)", DamageMatch: `DESTRUCTIVE`, TornadoMatch: `POSSIBLE` },
        { Match: /DESTRUCTIVE\s+SEVERE\s+THUNDERSTORM/i, Label: "Destructive Severe Thunderstorm Warning", DamageMatch: `DESTRUCTIVE`, TornadoMatch: `OBSERVED` },
        { Match: /DESTRUCTIVE\s+SEVERE\s+THUNDERSTORM/i, Label: "Destructive Severe Thunderstorm Warning (TPROB)", DamageMatch: `DESTRUCTIVE`, TornadoMatch: `POSSIBLE` },
        { Match: /CONSIDERABLE\s+SEVERE\s+THUNDERSTORM/i, Label: "Considerable Severe Thunderstorm Warning", DamageMatch: `CONSIDERABLE`, TornadoMatch: `OBSERVED` },
        { Match: /CONSIDERABLE\s+SEVERE\s+THUNDERSTORM/i, Label: "Considerable Severe Thunderstorm Warning (TPROB)", DamageMatch: `CONSIDERABLE`, TornadoMatch: `POSSIBLE` },
        { Match: /SEVERE\s+THUNDERSTORM\s+WARNING/i, Label: "Severe Thunderstorm Warning", TornadoMatch: `OBSERVED` },
        { Match: /SEVERE\s+THUNDERSTORM\s+WARNING/i, Label: "Severe Thunderstorm Warning (TPROB)", TornadoMatch: `POSSIBLE` }
    ],
    ['Flash Flood Warning']: [
        { Match: /FLASH\s+FLOOD\s+EMERGENCY/i, Label: "Flash Flood Emergency", DamageMatch: `CATASTROPHIC` },
        { Match: /FLASH\s+FLOOD\s+WARNING/i, Label: "Flash Flood Warning", DamageMatch: `CONSIDERABLE` }
    ],
    ['Snow Squall Warning']: [
        { Match: /EXTREMELY\s+DANGEROUS\s+SITUATION/i, Label: "Observed Snow Squall Warning (SIG)", DamageMatch: `SIGNIFICANT`, SnowSquallMatch: `OBSERVED` },
        { Match: /EXTREMELY\s+DANGEROUS\s+SITUATION/i, Label: "Radar Indicated Snow Squall Warning (SIG)", DamageMatch: `SIGNIFICANT`, SnowSquallMatch: `RADAR INDICATED` },
    ],
    ['Blizzard Warning']: [
        { Match: /PARTICULARLY\s+DANGEROUS\s+SITUATION/i, Label: "PDS Blizzard Warning" }
    ],
    ['Ice Storm Warning']: [
        { Match: /PARTICULARLY\s+DANGEROUS\s+SITUATION/i, Label: "PDS Ice Storm Warning" }
    ],
    ['Fire Weather Warning']: [
        { Match: /PARTICULARLY\s+DANGEROUS\s+SITUATION/i, Label: "PDS Fire Weather Warning" }
    ],
    ['Special Marine Warning']: [
        { Match: /SPECIAL\s+MARINE\s+WARNING/i, Label: "Special Marine Warning", TornadoMatch: `OBSERVED` },
        { Match: /SPECIAL\s+MARINE\s+WARNING/i, Label: "Special Marine Warning (WPROB)", TornadoMatch: `POSSIBLE` }
    ],
    ['Special Weather Statement']: [
        { Match: /STRONG\s+THUNDERSTORM/i, Label: "Convective Special Weather Statement" }
    ],
    ['Severe Thunderstorm Watch']: [
        { Match: /PARTICULARLY\s+DANGEROUS\s+SITUATION/i, Label: "PDS Severe Thunderstorm Watch" }
    ],
    ['Tornado Watch']: [
        { Match: /PARTICULARLY\s+DANGEROUS\s+SITUATION/i, Label: "PDS Tornado Watch" }
    ],
}