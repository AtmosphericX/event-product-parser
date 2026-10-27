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
import { IngestProduct as CAPProductIngestion } from "@Components.Events.Parsing/CommonAlertingProtocolProducts"
import { IngestProduct as GeoJSONProductIngestion } from "@Components.Events.Parsing/GeoJSONProduct"
import { IngestProduct as TextProductIngestion } from "@Components.Events.Parsing/TextProduct"
import { IngestProduct as ValidTimeProductIngestion } from "@Components.Events.Parsing/ValidTimeProducts"

interface PROCESS_STANZA_OPTIONS { 
    Stanza: TYPE_STANZA_COMPILED
}

export const ProcessStanza = async ({ Stanza }: PROCESS_STANZA_OPTIONS): Promise<void> => {
    const { VTEC, CAP, Wire } = Stanza.Metadata;

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
}
