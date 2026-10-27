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

import { TYPE_HVTEC } from "Types.Components/HyrdrolicValidTimeEventCode"
import { ENUM_REGULAR_EXPRESSIONS } from "@Enums/RegularExpressions"
import { ENUM_FLOOD_SEVERITY } from "@Enums.Flooding/FloodSeverity"
import { ENUM_FLOOD_CAUSES } from "@Enums.Flooding/FloodCauses"
import { ENUM_FLOOD_RECORDS } from "@Enums.Flooding/FloodRecords"
import { ConstructClassTimer } from "@Components.Utilities/ConstructClassTimer";

interface GET_OPTIONS { 
    Message?: string 
}

export class HydrolicValidTimeCodeParsing { 
    private pMessage: string;
    private pCollection: TYPE_HVTEC[] = [];

    public constructor({ Message }: GET_OPTIONS) {
        this.pMessage = Message;
        return this;
    }

    @ConstructClassTimer
    public GetReferences(): TYPE_HVTEC[] | null {
        if (!this.pMessage) return null;
        const cRegex = this.pMessage.match(ENUM_REGULAR_EXPRESSIONS.HVTEC) ?? [];
        for (const cHVTEC of cRegex) { 
            const [_, cSeverity, cCause, __, ___, ____, cRecord] = cHVTEC.split(`.`); 
            this.pCollection.push({
                Raw: cHVTEC,
                Severity: ENUM_FLOOD_SEVERITY[cSeverity] ?? `Unknown Severity`,
                Cause: ENUM_FLOOD_CAUSES[cCause] ?? `Unknown Cause`,
                Record: ENUM_FLOOD_RECORDS[cRecord] ?? `Unknown Record`
            });
        }
        return this.pCollection;
    }
}