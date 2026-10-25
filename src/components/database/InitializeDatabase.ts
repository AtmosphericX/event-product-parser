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
import { SetLog } from "@Components.Utilities/SetLog"
import { existsSync, writeFileSync } from "node:fs"
import sqlite3 from "better-sqlite3"

export const InitializeDatabase = async (): Promise<void> => {
    const { Database } = Bootstrap.Settings;
    if (!existsSync(Database)) { 
        writeFileSync(Database, ``);
        SetLog({ Message: ENUM_STRINGS.DATABASE.CREATED + ` -> ${Database}` });
    }
    Bootstrap.Database = new sqlite3(Database);
    Bootstrap.Database.pragma('journal_mode = WAL');
    Bootstrap.Database.pragma('synchronous = NORMAL');
    Bootstrap.Database.pragma('cache_size = -20000');
    SetLog({ Message: ENUM_STRINGS.DATABASE.CONNECTED + ` -> ${Database}` });
}

