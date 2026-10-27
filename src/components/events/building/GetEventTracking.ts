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

import { TYPE_EVENT } from "Types.Event/Event"
import { TYPE_STANZA_COMPILED } from "Types.Stanza/StanzaValidated"
import { TYPE_PROPERTIES } from "Types.Event/Properties"
import { TYPE_VTEC } from "Types.Components/ValidTimeEventCode"
import { createHash } from "node:crypto"

interface GET_EVENT_TRACKING_OPTIONS {
    Type: `CAP` | `VTEC` | `TEXT`
    Stanza?: TYPE_STANZA_COMPILED
    Properties?: TYPE_PROPERTIES
    Office?: string
    VTEC?: TYPE_VTEC
    ID?: string
}

export const GetEventTracking = ({ Type, Stanza, Properties, Office, VTEC, ID }: GET_EVENT_TRACKING_OPTIONS): string => {
    if (Type === `CAP`) { 
        if (VTEC) { 
            const cArray = Array.isArray(VTEC) ? VTEC[0]?.Raw : VTEC?.Raw;
            const cSplit = cArray.split(`.`);
            return `${cSplit[2]}.${cSplit[3]}.${cSplit[4]}.${cSplit[5]}`;
        }
        const cOffice = Office?.match(/([A-Z]{4}\d{2})\s+([A-Z]{4})/);
        const cAbbreviation = cOffice?.[2] ?? `---`;
        const cHash = createHash(`sha1`).update(JSON.stringify(Stanza ?? Properties ?? {})).digest(`hex`);
        return `${cAbbreviation}.CAPv1.2.${ID?.match(/([a-f0-9]{40})/)?.[1] ?? cHash}`;
    }
    if (Type == `TEXT`) { 
        const { number } = Properties?.watch_parameters ?? {};
        const { abbreviation } = Properties?.geography?.office ?? {};
        const { ttaaii, id } = Stanza?.Attributes ?? {};
        const { ID } = Stanza?.Product ?? {};
        if (number) { 
            return `${abbreviation}.${ID}.A.${number}`;
        }
        return `${abbreviation}.${ttaaii}.${id.slice(-4).replace(`.`, ``) ?? '0'}`;
    }
    if (Type == `VTEC`) {
        return VTEC.Tracking;
    }

}
    