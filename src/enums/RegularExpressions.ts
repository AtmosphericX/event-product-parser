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

type TYPE_REGULAR_EXPRESSIONS = { [key: string]: RegExp }

export const ENUM_REGULAR_EXPRESSIONS: TYPE_REGULAR_EXPRESSIONS = { 
    Location: new RegExp(/^([A-Za-z.\-' ]+),\s*([A-Z]{2})$/),
    VTEC: new RegExp(`[OTEX].(NEW|CON|EXT|EXA|EXB|UPG|CAN|EXP|COR|ROU).[A-Z]{4}.[A-Z]{2}.[WAYSFON].[0-9]{4}.[0-9]{6}T[0-9]{4}Z-[0-9]{6}T[0-9]{4}Z`, "g"),
    HVTEC: new RegExp(`[a-zA-Z0-9]{4}.[A-Z0-9].[A-Z]{2}.[0-9]{6}T[0-9]{4}Z.[0-9]{6}T[0-9]{4}Z.[0-9]{6}T[0-9]{4}Z.[A-Z]{2}`, "imu"),
    OFFICE: new RegExp(`[A-Z0-9]{6}\\s[A-Z]{4}\\s\\d{6}`, "imu"),
    UGC_PT1: new RegExp(`(\\w{2}[CZ](\\d{3}((-|>)\\s?(\\n\\n)?))+)`, "imu"),
    UGC_PT2: new RegExp(`(\\d{6}(-|>)\\s?(\\n\\n)?)`, "imu"),
    UGC_PT3: new RegExp(`(\\d{6})(?=-|$)`, "imu"),
    HEADLINE_INDEX: new RegExp(`(?:^|\\r?\\n)\\.[A-Z][A-Z .-]*(?:\\r?\\n|$)`, "imu"),
    UGC_INDEX: new RegExp(`\\r?\\n[A-Z]{2}[CZ]\\d{3}(?:>|-|$)`, "imu"),
    TEXT_EXPIRY: new RegExp(`\\b\\d{6}Z\\s*-\\s*(\\d{6})Z\\b`, "imu"),
    POLYGON_INDEX: new RegExp(`LAT\\.{3}LON\\s+([\\s\\S]*?)(?=\\r?\\n\\s*\\r?\\n\\s*[A-Z]|\\r?\\n\\s*\\/\\*|$)`, "imu"),
    POLYGON_COORDINATES: new RegExp(`(\\d{4,8})`, "g"),
    DATE: new RegExp(`\\d{3,4}\\s*(AM|PM)?\\s*[A-Z]{2,4}\\s+[A-Z]{3,}\\s+[A-Z]{3,}\\s+\\d{1,2}\\s+\\d{4}`, "gim"),
}