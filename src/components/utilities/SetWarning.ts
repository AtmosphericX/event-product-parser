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
import { TypeSettings } from "TypesStandard/Settings"

interface SetWarningOptions { 
    Title?: string
    Message: string
    Tree?: string[]
}

export const SetWarning = ({ Title, Message, Tree }: SetWarningOptions): void => {
    const settings = Bootstrap.Settings as TypeSettings;
    const title = Title ?? (`[${Bootstrap.Colors.Yellow}@atmosx/event-product-parser${Bootstrap.Colors.Reset}]`);
    const log = (message: string): void => {
        Bootstrap.Listener.emit(`log`, message);
        if (settings.EnableJournal) { console.log(message); }
    };
    log(`${title} ${Message}`);

    if (!Tree?.length) return;

    const cleanTitle = title.replace(/\x1b\[[0-9;]*m/g, ``);
    const padding = ` `.repeat(cleanTitle.length + 1);
    const entries = Tree.filter((entry): entry is NonNullable<typeof entry> => entry !== undefined && entry !== null);
    entries.forEach((entry, index) => {
        const prefix = index === entries.length - 1 ? `└─` : `├─`;
        log(`${padding}${prefix} ${entry}`);
    });
};