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
import { TypeStanzaCompiled } from "TypesStandard/StanzaCompiled"
import { Bootstrap } from "@Bootstrap"
import { SetWarning } from "@Utilities/SetWarning"
import { CreateQuery } from "@Database/CreateQuery"

export const ImportStanza = async (Stanza: TypeStanzaCompiled): Promise<void> => {
    const settings = Bootstrap.Settings as TypeSettings;
    try { 
        if (!settings.NOAAWeatherWireServiceSettings.CacheSettings.Enabled) { return }
        CreateQuery({ Query: `INSERT OR IGNORE INTO stanzas (type, stanza, issued) VALUES (?, ?, ?)`, Parameters: [Stanza.Type.Type, JSON.stringify(Stanza), Stanza.Attributes.issue] })
        const count = CreateQuery({ Query: `SELECT COUNT(*) as total FROM stanzas` }) as { total: number };
        const max = settings.NOAAWeatherWireServiceSettings.CacheSettings.MaxDatabaseHistory;
        if (count.total > max) { 
            const toDelete = count.total - max;
            if (toDelete > 0) {
                CreateQuery({ Query: `DELETE FROM stanzas WHERE id IN (SELECT id FROM stanzas ORDER BY issued ASC LIMIT ?)`, Parameters: [toDelete] })
            }
        }
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        SetWarning({ Message: `An error occurred while importing stanza: ${message}` })
    }
}