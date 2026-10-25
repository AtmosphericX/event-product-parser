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

import { ENUM_STRINGS } from "@Enums/Strings"
import { Bootstrap } from "@Bootstrap"

interface CREATE_QUERY_OPTIONS { 
    Query: string
    Parameters?: unknown[]
}

export const CreateQuery = ({ Query, Parameters }: CREATE_QUERY_OPTIONS): any => {
    try { 
        const cParameters = Array.isArray(Parameters) ? Parameters : [];
        const cStatement = Bootstrap?.Database?.prepare(Query);
        return /^\s*select/i.test(Query)
            ? cStatement?.all(...cParameters)
            : cStatement?.run(...cParameters);
    } catch (error) {
        throw new Error(`${ENUM_STRINGS.DATABASE.QUERY_FAILED}: ${Query}\n${Parameters}\nError: ${error}`);
    }
}

