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

import { TYPE_UGC } from "Types/components/UniversalGeographicCode"
import { SetLog } from "@Components.Utilities/SetLog";
import { GetExpiry } from "@Components.Events.UGC/GetExpiry";
import { GetHeader } from "@Components.Events.UGC/GetHeader";
import { GetZones } from "@Components.Events.UGC/GetZones";
import { GetLocations } from "@Components.Events.UGC/GetLocations";

interface GET_EXTRACTED_OPTIONS { 
    Message: string
}

export const GetExtracted = ({ Message }: GET_EXTRACTED_OPTIONS): TYPE_UGC | null => {
    const dbgTickA = performance.now();
    const cExpires = GetExpiry({ Message });
    const cHeader = GetHeader({ Message });
    const cZones = GetZones({ Header: cHeader });
    const cLocations = GetLocations({ Zones: cZones });
    if (!cHeader || cZones?.length == 0) return null;
    SetLog({ Type: `DEBUG`, Message: `[${(Math.round((performance.now() - dbgTickA) * 100) / 100).toFixed(1)}ms] GetExtracted (UGC)` });
    return {
        Zones: cZones,
        Locations: cLocations,
        Expires: cExpires
    }
}