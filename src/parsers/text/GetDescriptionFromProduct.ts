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

import { EnumExpressions } from "@Enums/Expressions"

interface GetDescriptionFromProductOptions { 
    Message: string
    Handle?: string
}

export const GetDescriptionFromProduct = ({ Message, Handle }: GetDescriptionFromProductOptions): string => {
    const originalMessage = Message;
    const predefinedEndMarkers = ['&&', 'LAT...'];
    const getFallbackDescription = (text: string, endIndex: number): string => {
        const headlineIndex = text.search(/(?:^|\r?\n)\.[A-Z][A-Z .-]*(?:\r?\n|$)/);
        const ugcIndex = text.search(/\r?\n[A-Z]{2}[CZ]\d{3}(?:>|-|$)/);
        const descriptionEnd = ugcIndex >= 0 && ugcIndex < endIndex ? ugcIndex : endIndex;
        return text.substring(headlineIndex >= 0 ? headlineIndex : 0, descriptionEnd).trim();
    };
    const getEndIndex = (text: string, fromIndex = 0): number => {
        const indices = predefinedEndMarkers
            .map((marker) => text.indexOf(marker, fromIndex))
            .filter((idx) => idx !== -1);
        return indices.length ? Math.min(...indices) : -1;
    };
    const dates = Array.from(Message.matchAll(EnumExpressions.dateline));
    if (dates.length) {
        const lastMatch = dates[dates.length - 1][0];
        const sIndx = Message.lastIndexOf(lastMatch);
        if (sIndx !== -1) {
            const endIndx = getEndIndex(Message, sIndx);
            Message = Message.substring(sIndx + lastMatch.length, endIndx !== -1 ? endIndx : undefined).trimStart();
            if (Message.startsWith('/')) Message = Message.slice(1).trimStart();
            if (Handle && Message.includes(Handle)) {
                const handleIdx = Message.indexOf(Handle);
                Message = Message.substring(handleIdx + Handle.length).trimStart();
                if (Message.startsWith('/')) Message = Message.slice(1).trimStart();
            }
        }
    } else if (Handle) {
        const handleIndx = Message.indexOf(Handle);
        if (handleIndx !== -1) {
            let afterHandle = Message.substring(handleIndx + Handle.length).trimStart();
            if (afterHandle.startsWith('/')) afterHandle = afterHandle.slice(1).trimStart();
            const latEnd = getEndIndex(afterHandle);
            Message = latEnd !== -1 ? afterHandle.substring(0, latEnd).trim() : afterHandle.trim();
        }
    }
    if (Message == "" || Message == null) {
        const handleIndex = Handle ? originalMessage.indexOf(Handle) : -1;
        if (handleIndex !== -1) {
            Message = getFallbackDescription(originalMessage, handleIndex);
            if (Message == "$$") {
                Message = `This product did not contain a valid description. Please check the product for more information`
            } 
        }
    }
    return Message.trim();
}