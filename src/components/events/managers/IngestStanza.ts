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
import { IngestProduct as CAPProductIngestion } from "@Components.Events.Products/CommonAlertingProtocol"
import { IngestProduct as GeoJSONProductIngestion } from "@Components.Events.Products/GeoJSON"
import { IngestProduct as TextProductIngestion } from "@Components.Events.Products/Text"
import { IngestProduct as ValidTimeProductIngestion } from "@Components.Events.Products/ValidTimeCode"
import { SetLog } from "@Components.Utilities/SetLog"

interface PROCESS_STANZA_OPTIONS { 
    Stanza: TYPE_STANZA_COMPILED
}

export const IngestStanza = async ({ Stanza }: PROCESS_STANZA_OPTIONS): Promise<void> => {
    const { VTEC, CAP, Wire } = Stanza.Metadata;
    const cType = VTEC ? `ValidTimeEventCode` : CAP ? `CAP v1.2` : Wire ? `Text` : `GeoJSON`;
    SetLog({ Type: `DEBUG`, Message: `[Ingestion] ${cType} Product: ${Stanza.Product.Name} (${Stanza.Product.ID})` });
    switch (true) { 
        case (!Wire):
            GeoJSONProductIngestion(Stanza);
            break;
        case (Wire && CAP):
            CAPProductIngestion(Stanza);
            break;
        case (Wire && VTEC):
            ValidTimeProductIngestion(Stanza);
            break;
        case (Wire):
            TextProductIngestion(Stanza);
            break;
    }
    // TODO: FilterEventCaller
}
