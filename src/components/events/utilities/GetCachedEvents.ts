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

import { TypeSettings } from "TypesStandard/Settings"
import { Bootstrap } from "@Bootstrap"
import { SetWarning } from "@Utilities/SetWarning"
import { ProcessStanza } from "@Builder/ProcessStanza"
import { CreateQuery } from "@Database/CreateQuery"

export const GetCachedEvents = async (): Promise<void> => {
    try { 
        const settings = Bootstrap.Settings as TypeSettings;
        const tick = performance.now();
        if (settings.NOAAWeatherWireServiceSettings.CacheSettings.Enabled) {
            const max = settings.NOAAWeatherWireServiceSettings.CacheSettings.MaxRetentionHistory ?? 500;
            const get = await CreateQuery({ 
                Query: `SELECT * FROM stanzas ORDER BY rowid DESC LIMIT ?`, 
                Parameters: [max] 
            }) as { rowid: number; stanza: string }[];
            SetWarning({ Message: `Fetched ${get.length} cached stanzas from the database in ${Math.floor(performance.now() - tick)} ms` })
            let events = get.map((row) => JSON.parse(row.stanza))
                .filter(stanza => {
                    if (!stanza) { return }
                    const isSkippable = stanza.isIgnored ||
                        (stanza.isCapEvent) ||
                        (stanza.isCapEvent && !stanza.isCapAreaDescription)
                    return !isSkippable
                });
            events = events.sort((a, b) => b.issued - a.issued)
            await Promise.all(events.map(event => ProcessStanza(event)))
            SetWarning({ Message: `Processed ${events.length} cached stanzas in ${Math.floor(performance.now() - tick)} ms` })
        }
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        SetWarning({ Message: `An error occurred while fetching cached stanzas: ${message}` })
    }
}