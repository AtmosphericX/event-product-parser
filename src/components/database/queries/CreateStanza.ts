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

import { TYPE_STANZA_COMPILED } from "Types.Stanza/StanzaValidated"
import { ENUM_STRINGS } from "@Enums/Strings"
import { Bootstrap } from "@Bootstrap"
import { SetLog } from "@Components.Utilities/SetLog"
import { CreateQuery } from "@Components.Database/CreateQuery"

type TYPE_COUNT_RESULT = { count: number };
interface CREATE_STANZA_OPTIONS {
    Stanza: TYPE_STANZA_COMPILED
}

export const CreateStanza = ({ Stanza }: CREATE_STANZA_OPTIONS): void => {
    const dbgTickA = performance.now();
    
    const { MaxStanzas } = Bootstrap.Settings.WeatherWireServiceSettings.CacheControl
    const { count } = CreateQuery({ Query: ENUM_STRINGS.DB_STRINGS.COUNTS.STANZA })[0] as TYPE_COUNT_RESULT;
    const { Name } = Stanza.Product;
    const { issue } = Stanza.Attributes;

    CreateQuery({ 
        Query: ENUM_STRINGS.DB_STRINGS.IMPORTS.STANZA,
        Parameters: [Name, issue, JSON.stringify(Stanza)],
    });

    if (count >= MaxStanzas) {
        CreateQuery({
            Query: ENUM_STRINGS.DB_STRINGS.DELETE.STANZA_OLD,
            Parameters: [count - MaxStanzas]
        })
    }

    SetLog({ Type: `DEBUG`, Message: `[${(Math.round((performance.now() - dbgTickA) * 100) / 100).toFixed(1)}ms] CreateStanza ${Name} (#${count + 1})` })
}

