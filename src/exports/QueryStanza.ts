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

import { TypeStanza } from "TypesEvent/Stanza"
import { CreateQuery } from "@Database/CreateQuery"

interface QueryStanzaOptions {
    Search: string
    Max?: number
}

type QueryStanza = {
    rowid: number
    stanza: string
}

export const QueryStanza = async ({ Search, Max }: QueryStanzaOptions): Promise<TypeStanza[]> => {
    const query = CreateQuery({ 
        Query: `SELECT * FROM stanzas WHERE stanza LIKE ? LIMIT ?`, 
        Parameters: [`%${Search}%`, Max ?? 100] 
    }) as QueryStanza[];
    const events = query.map((row) => JSON.parse(row.stanza));
    return events as TypeStanza[];
}