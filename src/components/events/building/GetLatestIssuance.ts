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

const ENUM_ISSUANCES: number[] = [100, 600, 1300, 1630, 2000];

export const GetLatestIssuance = (): string => {
    const cTimestamp = new Date();
    const cCurrent = cTimestamp.getUTCHours() * 100 + cTimestamp.getUTCMinutes();
    let lLatest = ENUM_ISSUANCES[0];
    for (const cIssuance of ENUM_ISSUANCES) {
        if (cCurrent >= cIssuance) {
            lLatest = cIssuance;
        }
    }
    return lLatest.toString().padStart(4, "0");
}