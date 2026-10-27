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

interface PROCESS_STANZA_OPTIONS { 
    Stanza: TYPE_STANZA_COMPILED
}

export const ProcessStanza = async ({ Stanza }: PROCESS_STANZA_OPTIONS): Promise<void> => {
    const { VTEC, CAP, Wire } = Stanza.Metadata;

    switch (true) { 
        case (!Wire):
            break;
        case (Wire && CAP):
            break;
        case (Wire && VTEC):
            //VTECProduct({ Stanza });
            break;
        case (Wire):
            //TextProduct({ Stanza });
    }
}
