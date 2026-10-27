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

import { SetLog } from "@Components.Utilities/SetLog"

export function ConstructClassTimer(Target: any, Context?: ClassMethodDecoratorContext): any {
    if (Context) {
        return function (this: any, ...args: any[]) {
            const cStart = performance.now();
            try {
                return Target.apply(this, args);
            } finally {
                const cTickC = performance.now() - cStart;
                SetLog({ Type: `DEBUG`, Message: `[${(Math.round(cTickC * 100) / 100).toFixed(1)}ms] ${String(Context.name)}` });
            }
        };
    }
    return (Callback: (...args: any[]) => any) => (...args: any[]) => {
        const cStart = performance.now();
        try {
            return Callback(...args);
        } finally {
            const cTickC = performance.now() - cStart;
            SetLog({ Type: `DEBUG`, Message: `[${(Math.round(cTickC * 100) / 100).toFixed(1)}ms] ${String(Target)}` });
        }
    };
}