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

export const GetCleanGeoJSON = <T extends Record<string, any>>(GeoJSON: T): T => {
    for (const cKey of Object.keys(GeoJSON)) {
        const cValue = GeoJSON[cKey];
        if (cValue === null || cValue === undefined) {
            delete GeoJSON[cKey];
        } else if (typeof cValue === "object" && cValue !== null && !Array.isArray(cValue)) {
            (GeoJSON as Record<string, any>)[cKey] = GetCleanGeoJSON(cValue as Record<string, any>) as any;
        }
    }
    return GeoJSON;
};