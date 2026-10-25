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

import { ENUM_REGULAR_EXPRESSIONS } from "@Enums/RegularExpressions"
import { SetLog } from "@Components.Utilities/SetLog";

interface GET_POLYGON_OPTIONS { 
    Message: string
}

type TYPE_POINT = { lat: number; lon: number };
type TYPE_POLYGON = number[][];

export const GetPolygon = ({ Message }: GET_POLYGON_OPTIONS): TYPE_POLYGON => {
    const dbgTickA = performance.now();
    const cCoordinates: TYPE_POLYGON = [];
    const cPoints: TYPE_POINT[] = [];
    const cMatch = Message.match(ENUM_REGULAR_EXPRESSIONS.POLYGON_INDEX);
    const cRegion = cMatch?.[1]
        ?.split(/\r?\n/).map(l => l.trim())
        ?.filter(l => l && !/[A-Za-z]/.test(l))
        ?.join(' ').trim();
    const cValues = cRegion?.match(ENUM_REGULAR_EXPRESSIONS.POLYGON_COORDINATES);
    if (!cRegion || !cValues || cValues.length === 0) return cCoordinates;
    if (cValues.every(v => v.length === 8)) {
        for (const value of cValues) {
            let lLatitude = Number(value.slice(0, 4)) / 100;
            let lLongitude = Number(value.slice(4, 8)) / 100;
            if (lLongitude < 20) lLongitude += 100;
            cPoints.push({ lat: lLatitude, lon: lLongitude });
        }
    } else if (cValues.every(v => v.length === 4)) {
        for (let i = 0; i + 1 < cValues.length; i += 2) {
            let lLatitude = Number(cValues[i]) / 100;
            let lLongitude = Number(cValues[i + 1]) / 100;
            cPoints.push({ lat: lLatitude, lon: lLongitude });
        }
    } else {
        for (let i = 0; i + 1 < cValues.length; i += 2) {
            const cLatitude = String(cValues[i]);
            const cLongitude = String(cValues[i + 1]);
            let lLatitude = Number(cLatitude) / 100;
            let lLongitude = Number(cLongitude) / 100;
            if (cLatitude.length !== 4) continue;
            if (cLongitude.length < 4 || cLongitude.length > 5) continue;
            cPoints.push({ lat: lLatitude, lon: lLongitude });
        }
    }
    if (cPoints.length === 0) return cCoordinates;
    for (const p of cPoints) {
        const lon = cPoints.some(p => p.lon > 130 && p.lon < 180) ? p.lon : -p.lon;
        if (Number.isFinite(p.lat) && Number.isFinite(lon) && p.lat >= -90 && p.lat <= 90 && lon >= -180 && lon <= 180) {
            cCoordinates.push([lon, p.lat]);
        }
    }
    if (cCoordinates.length > 2 && (cCoordinates[0][0] !== cCoordinates[cCoordinates.length - 1][0] || cCoordinates[0][1] !== cCoordinates[cCoordinates.length - 1][1])) {
        cCoordinates.push([...cCoordinates[0]]);
    }
    SetLog({ Type: `DEBUG`, Message: `[${(Math.round((performance.now() - dbgTickA) * 100) / 100).toFixed(1)}ms] GetPolygon` });
    return cCoordinates;
}