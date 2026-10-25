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

import { SetLog } from "@Components.Utilities/SetLog";

interface GET_ZONE_OPTIONS { 
    Header: string
}

export const GetZones = ({ Header }: GET_ZONE_OPTIONS): string[] => {
    const dbgTickA = performance.now();
    const cSplitter = Header.split(`-`);
    const cZones: string[] = [];
    const cFormat = cSplitter[0].substring(2, 3);
    let lState = cSplitter[0].substring(0, 2);
    for (const cPart of cSplitter) {
        if (/^[A-Z]/.test(cPart)) {
            lState = cPart.substring(0, 2);
            if (cPart.includes('>')) {
                const [cStart, cEnd] = cPart.split(`>`);
                const cStartNumber = Number(cStart.substring(3));
                const cEndNumber = Number(cEnd);
                for (let i = cStartNumber; i <= cEndNumber; i++) {
                    cZones.push(`${lState}${cFormat}${i.toString().padStart(3, '0')}`);
                }
            } else { 
                cZones.push(cPart);
            }
            continue;
        }
        if (cPart.includes(`>`)) { 
            const [cStart, cEnd] = cPart.split(`>`);
            const cStartNumber = Number(cStart);
            const cEndNumber = Number(cEnd);
            for (let i = cStartNumber; i <= cEndNumber; i++) {
                cZones.push(`${lState}${cFormat}${i.toString().padStart(3, '0')}`);
            }
        } else { 
            cZones.push(`${lState}${cFormat}${cPart.padStart(3, '0')}`);
        }
    }
    SetLog({ Type: `DEBUG`, Message: `[${(Math.round((performance.now() - dbgTickA) * 100) / 100).toFixed(1)}ms] GetZones` });
    return cZones.filter(item => item !== '');
}