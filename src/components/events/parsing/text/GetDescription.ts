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

import { ENUM_REGULAR_EXPRESSIONS } from "@Enums/RegularExpressions"
import { SetLog } from "@Components.Utilities/SetLog";

interface GET_DESCRIPTION_OPTIONS { 
    Message: string
    Handle?: string
}

const ENUM_END_MARKERS: string[] = ['&&', 'LAT...'];

export const GetDescription = ({ Message, Handle }: GET_DESCRIPTION_OPTIONS): string => {
    const dbgTickA = performance.now();
    const cMessage = Message;
    const cDates = Array.from(Message.matchAll(ENUM_REGULAR_EXPRESSIONS.DATE));
    const callFallback = (Message: string, Index: number): string => {
        const cHeadline = Message.search(ENUM_REGULAR_EXPRESSIONS.HEADLINE_INDEX);
        const cUGCIndex = Message.search(ENUM_REGULAR_EXPRESSIONS.UGC_INDEX);
        const cFallbackIndex = cUGCIndex >= 0 && cUGCIndex < Index ? cUGCIndex : Index;
        return Message.substring(cHeadline >= 0 ? cHeadline : 0, cFallbackIndex).trim();
    }
    const callIndexEnd = (Message: string, Index = 0): number => {
        const cEndMarkers = ENUM_END_MARKERS
            .map((marker) => Message.indexOf(marker, Index))
            .filter((idx) => idx !== -1);
        return cEndMarkers.length ? Math.min(...cEndMarkers) : -1;
    };
    if (cDates.length) {
        const cLastMatch = cDates[cDates.length - 1][0];
        const cIndex = Message.lastIndexOf(cLastMatch);
        if (cIndex !== -1) {
            const cEndIndex = callIndexEnd(Message, cIndex);
            Message = Message.substring(cIndex + cLastMatch.length, cEndIndex !== -1 ? cEndIndex : undefined).trimStart();
            if (Message.startsWith('/')) Message = Message.slice(1).trimStart();
            if (Handle && Message.includes(Handle)) {
                const cHandle = Message.indexOf(Handle);
                Message = Message.substring(cHandle + Handle.length).trimStart();
                if (Message.startsWith('/')) Message = Message.slice(1).trimStart();
            }
        }
    } else if (Handle) {
        const cHandle = Message.indexOf(Handle);
        if (cHandle !== -1) {
            let afterHandle = Message.substring(cHandle + Handle.length).trimStart();
            if (afterHandle.startsWith('/')) afterHandle = afterHandle.slice(1).trimStart();
            const cEndIndex = callIndexEnd(afterHandle);
            Message = cEndIndex !== -1 ? afterHandle.substring(0, cEndIndex).trim() : afterHandle.trim();
        }
    }
    if (Message == "" || Message == null) {
        const cHandle = Handle ? cMessage.indexOf(Handle) : -1;
        if (cHandle !== -1) {
            Message = callFallback(cMessage, cHandle);
            if (Message == "$$") {
                Message = `This product did not contain a valid description. Please check the product for more information`
            } 
        }
    }
    SetLog({ Type: `DEBUG`, Message: `[${(Math.round((performance.now() - dbgTickA) * 100) / 100).toFixed(1)}ms] GetDescription` });
    return Message.trim();
}