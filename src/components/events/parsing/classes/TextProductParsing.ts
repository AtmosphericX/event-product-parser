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

interface GET_OPTIONS { 
    Message?: string 
}

interface GET_POLYGON_OPTIONS {
    Message?: string
    Handle?: string 
}

interface GET_TEXT_REFERENCES_OPTIONS { 
    Message?: string
    Append?: string
    Grep: string[]
    Exclude?: string[] 
}

type TYPE_POINT = { lat: number; lon: number };
type TYPE_POLYGON = number[][];

export class TextProductParsing { 
    private pMessage: string;
    private prTickA = performance.now();
    private ENUM_END_MARKERS: string[] = ['&&', 'LAT...'];

    public constructor({ Message }: GET_OPTIONS) { 
        this.pMessage = Message;
        return this;
    }

    public GetTextReference({ Message = this.pMessage, Grep, Append, Exclude}: GET_TEXT_REFERENCES_OPTIONS): string {
        this.prTickA = performance.now();
        const cSplitter = Message.split(`\n`);
        for (const cLine of cSplitter) { 
            const cFind = Grep.find((s: string) => cLine.includes(s));
            if (cFind) {
                let lResult = cLine.slice(cLine.indexOf(cFind) + cFind.length).trim();
                if (Exclude) { 
                    for (const cString of Exclude) {
                        lResult = lResult.toLowerCase().split(cString.toLowerCase()).join('');
                    }
                    lResult = lResult.replace(cFind, '').replace('<', '').trim();
                }
                this.onFinish(`GetTextReference -> ${Grep.join(`, `)}`);
                return lResult.toUpperCase() + (Append ? ` ${Append}` : ``);
            }
        }
        this.onFinish(`GetTextReference (Not found) -> ${Grep.join(`, `)}`);
    }

    public GetPolygon({ Message = this.pMessage }: GET_OPTIONS): TYPE_POLYGON {
        this.prTickA = performance.now();
        const cCoordinates: TYPE_POLYGON = [];
        const cPoints: TYPE_POINT[] = [];
        const cMatch = Message.match(ENUM_REGULAR_EXPRESSIONS.POLYGON_INDEX);
        const cRegion = cMatch?.[1]
            ?.split(/\r?\n/).map(l => l.trim())
            ?.filter(l => l && !/[A-Za-z]/.test(l))
            ?.join(' ').trim();
        const cValues = cRegion?.match(ENUM_REGULAR_EXPRESSIONS.POLYGON_COORDINATES);
        if (!cRegion || !cValues || cValues.length === 0) return cCoordinates;
        if (cValues.every(v => v.length === 8)) {
            for (const value of cValues) {
                let lLatitude = Number(value.slice(0, 4)) / 100;
                let lLongitude = Number(value.slice(4, 8)) / 100;
                if (lLongitude < 20) lLongitude += 100;
                cPoints.push({ lat: lLatitude, lon: lLongitude });
            }
        } else if (cValues.every(v => v.length === 4)) {
            for (let i = 0; i + 1 < cValues.length; i += 2) {
                let lLatitude = Number(cValues[i]) / 100;
                let lLongitude = Number(cValues[i + 1]) / 100;
                cPoints.push({ lat: lLatitude, lon: lLongitude });
            }
        } else {
            for (let i = 0; i + 1 < cValues.length; i += 2) {
                const cLatitude = String(cValues[i]);
                const cLongitude = String(cValues[i + 1]);
                let lLatitude = Number(cLatitude) / 100;
                let lLongitude = Number(cLongitude) / 100;
                if (cLatitude.length !== 4) continue;
                if (cLongitude.length < 4 || cLongitude.length > 5) continue;
                cPoints.push({ lat: lLatitude, lon: lLongitude });
            }
        }
        if (cPoints.length === 0) return cCoordinates;
        for (const p of cPoints) {
            const lon = cPoints.some(p => p.lon > 130 && p.lon < 180) ? p.lon : -p.lon;
            if (Number.isFinite(p.lat) && Number.isFinite(lon) && p.lat >= -90 && p.lat <= 90 && lon >= -180 && lon <= 180) {
                cCoordinates.push([lon, p.lat]);
            }
        }
        if (cCoordinates.length > 2 && (cCoordinates[0][0] !== cCoordinates[cCoordinates.length - 1][0] || cCoordinates[0][1] !== cCoordinates[cCoordinates.length - 1][1])) {
            cCoordinates.push([...cCoordinates[0]]);
        }
        this.onFinish(`GetPolygon -> ${cCoordinates.length} Coordinates Found`);
        return cCoordinates;
    }

    public GetDescription({ Message = this.pMessage, Handle}: GET_POLYGON_OPTIONS): string | null {
        this.prTickA = performance.now();
        const cMessage = Message;
        if (cMessage == "" || cMessage == null) return `This product did not contain a valid description. Please check the product for more information`;
        const cDates = Array.from(Message.matchAll(ENUM_REGULAR_EXPRESSIONS.DATE));
        const callFallback = (Message: string, Index: number): string => {
            const cHeadline = Message.search(ENUM_REGULAR_EXPRESSIONS.HEADLINE_INDEX);
            const cUGCIndex = Message.search(ENUM_REGULAR_EXPRESSIONS.UGC_INDEX);
            const cFallbackIndex = cUGCIndex >= 0 && cUGCIndex < Index ? cUGCIndex : Index;
            return Message.substring(cHeadline >= 0 ? cHeadline : 0, cFallbackIndex).trim();
        }
        const callIndexEnd = (Message: string, Index = 0): number => {
            const cEndMarkers = this.ENUM_END_MARKERS
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
        this.onFinish(`GetDescription -> ${Message}`);
        return Message.trim();
    }

    public GetExpiry({ Message = this.pMessage }: GET_OPTIONS): Date | null {
        this.prTickA = performance.now();
        const cMatch = Message.match(ENUM_REGULAR_EXPRESSIONS.TEXT_EXPIRY);
        if (!cMatch) return null;
        const [, cExpiry] = cMatch;
        const cTimestamp = new Date();
        const cDay = Number(cExpiry.slice(0, 2));
        const dHour = Number(cExpiry.slice(2, 4));
        const cMinute = Number(cExpiry.slice(4, 6));
        const cExpires = new Date(Date.UTC(cTimestamp.getUTCFullYear(), cTimestamp.getUTCMonth(), cDay, dHour, cMinute));
        this.onFinish(`GetExpiry -> ${cExpires.toISOString()}`);
        return cExpires;
    }

    private onFinish(Context: string): void { 
        const cTickB = performance.now();
        const cTickC = cTickB - this.prTickA;
        SetLog({ Type: `DEBUG`, Message: `[${(Math.round((cTickC) * 100) / 100).toFixed(1)}ms] ${Context}` });
    }
}