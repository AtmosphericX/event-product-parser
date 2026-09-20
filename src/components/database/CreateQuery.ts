/*
              _                             _               _     __   __
         /\  | |                           | |             (_)    \ \ / /
        /  \ | |_ _ __ ___   ___  ___ _ __ | |__   ___ _ __ _  ___ \ V / 
       / /\ \| __| '_ ` _ \ / _ \/ __| '_ \| '_ \ / _ \ '__| |/ __| > <  
      / ____ \ |_| | | | | | (_) \__ \ |_) | | | |  __/ |  | | (__ / . \ 
     /_/    \_\__|_| |_| |_|\___/|___/ .__/|_| |_|\___|_|  |_|\___/_/ \_\
                                     | |                            
                                     |_|                                                                                                                

    Created with ♥ by the AtmosphericX Team (KiyoWx, StarflightWx, & CJ Ziegler)
    Discord: https://atmosphericx-discord.scriptkitty.cafe
    Ko-Fi: https://ko-fi.com/k3yomi
    Documentation: https://atmosphericx.scriptkitty.cafe/documentation

    Independent Package: @atmosx/event-product-parser

*/

import { Bootstrap } from "@Bootstrap"
import { SetWarning } from "@Utilities/SetWarning"

interface CreateQueryOptions {
    Query: string
    Parameters?: unknown[]
}

export const CreateQuery = function({ Query, Parameters }: CreateQueryOptions): any {
    try {
        const parameters = Array.isArray(Parameters) ? Parameters : [];
        const statement = Bootstrap?.Database?.prepare(Query);
        return /^\s*select/i.test(Query)
            ? statement?.all(...parameters)
            : statement?.run(...parameters);
    } catch (error) {
        SetWarning({Message: `Database Query Error: ${error instanceof Error ? error.stack ?? error.message : String(error)}`})
        throw error;
    }
};
