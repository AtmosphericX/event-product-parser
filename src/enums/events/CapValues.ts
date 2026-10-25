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

type CAP_MAPPING = {
    Keys: string[];
    Value: string;
    Array?: boolean;
};

export const ENUM_CAP_VALUES_DICT: CAP_MAPPING[] = [
    { Keys: ["identifier"], Value: "temp.id" },
    { Keys: ["VTEC"], Value: "temp.vtec" },
    { Keys: ["UGC"], Value: "properties.geography.zones", Array: true },
    { Keys: ["wmoidentifier"], Value: "properties.geography.wmo" },
    { Keys: ["areadesc"], Value: "temp.locations" },
    { Keys: ["expires"], Value: "properties.expires" },
    { Keys: ["sent"], Value: "properties.issued" },
    { Keys: ["msgtype"], Value: "properties.status" },
    { Keys: ["description", "instruction"], Value: "properties.description" },
    { Keys: ["event"], Value: "properties.event" },
    { Keys: ["sendername"], Value: "properties.geography.office.name" },
    { Keys: ["polygon"], Value: "temp.polygon" },
    { Keys: ["tornadodetection", "waterspoutdetection"], Value: "properties.parameters.tornado_indicator" },
    { Keys: ["maxhailsize"], Value: "properties.parameters.hail_size" },
    { Keys: ["maxwindgust"], Value: "properties.parameters.wind_gusts" },
    { Keys: ["windthreat"], Value: "properties.parameters.wind_indicator" },
    { Keys: ["hailthreat"], Value: "properties.parameters.hail_indicator" },
    { Keys: ["thunderstormdamagethreat", "tornadodamagethreat"], Value: "properties.parameters.damage_indicator" },
    { Keys: ["snowsqualldetection"], Value: "properties.parameters.snow_squall_indicator" },
    { Keys: ["snowsquallimpact"], Value: "properties.parameters.damage_indicator" },
    { Keys: ["flashflooddetection"], Value: "properties.parameters.flood_indicator" },
    { Keys: ["flooddetection"], Value: "properties.parameters.flood_indicator" }
];
