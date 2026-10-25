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

interface GET_TEXT_OPTIONS { 
    Message: string
    Grep: string[]
    Append?: string
    Exclude?: string[]
}

export const GetText = ({ Message, Grep, Append, Exclude }: GET_TEXT_OPTIONS): string => {
    const dbgTickA = performance.now();
    const cLines = Message.split(`\n`);
    for (const cLine of cLines) { 
        const cFind = Grep.find((s: string) => cLine.includes(s));
        if (cFind) {
            let lResult = cLine.slice(cLine.indexOf(cFind) + cFind.length).trim();
            if (Exclude) { 
                for (const cString of Exclude) {
                    lResult = lResult.toLowerCase().split(cString.toLowerCase()).join('');
                }
                lResult = lResult.replace(cFind, '').replace('<', '').trim();
            }
            return lResult.toUpperCase() + (Append ? ` ${Append}` : ``);
        }
    }
    SetLog({ Type: `DEBUG`, Message: `[${(Math.round((performance.now() - dbgTickA) * 100) / 100).toFixed(1)}ms] GetText` });
}