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

import { SetLog } from "@Components.Utilities/SetLog";
import { Parser } from "xml2js"

interface GET_OPTIONS { 
    Message?: string 
}

interface GET_PROPERTY_VALUES { 
    JSON: Record<string, any> 
}

export class CommonAlertingProtocolParsing { 
    private pMessage: string;
    private prTickA = performance.now();
    private ENUM_KEYS = [
        { Keys: ["identifier"], Value: "temp.id" },
        { Keys: ["VTEC"], Value: "temp.vtec" },
        { Keys: ["UGC"], Value: "properties.geography.zones", Array: true },
        { Keys: ["wmoidentifier"], Value: "properties.geography.wmo" },
        { Keys: ["areadesc"], Value: "temp.locations" },
        { Keys: ["expires"], Value: "properties.expires" },
        { Keys: ["sent"], Value: "properties.issued" },
        { Keys: ["msgtype"], Value: "properties.status" },
        { Keys: ["description", "instruction"], Value: "properties.description" },
        { Keys: ["event"], Value: "properties.event" },
        { Keys: ["sendername"], Value: "properties.geography.office.name" },
        { Keys: ["polygon"], Value: "temp.polygon" },
        { Keys: ["tornadodetection", "waterspoutdetection"], Value: "properties.parameters.tornado_indicator" },
        { Keys: ["maxhailsize"], Value: "properties.parameters.hail_size" },
        { Keys: ["maxwindgust"], Value: "properties.parameters.wind_gusts" },
        { Keys: ["windthreat"], Value: "properties.parameters.wind_indicator" },
        { Keys: ["hailthreat"], Value: "properties.parameters.hail_indicator" },
        { Keys: ["thunderstormdamagethreat", "tornadodamagethreat"], Value: "properties.parameters.damage_indicator" },
        { Keys: ["snowsqualldetection"], Value: "properties.parameters.snow_squall_indicator" },
        { Keys: ["snowsquallimpact"], Value: "properties.parameters.damage_indicator" },
        { Keys: ["flashflooddetection"], Value: "properties.parameters.flood_indicator" },
        { Keys: ["flooddetection"], Value: "properties.parameters.flood_indicator" }
    ]

    public constructor({ Message }: GET_OPTIONS) {
        this.pMessage = Message;
        return this;
    }

    public async GetJSON ({ Message = this.pMessage }: GET_OPTIONS): Promise<unknown> { 
        const cParser =  new Parser({ explicitArray: false, mergeAttrs: false, trim: true });
        const cPromise = await cParser.parseStringPromise(Message);
        this.onFinish(`GetJSON -> ${Message.length} bytes`);
        return cPromise;
    }

    public GetPropertyValues({ JSON }: GET_PROPERTY_VALUES): Record<string, unknown> {
        const cExtracted: Record<string, any> = {};
        const callFindValue = (lObject: any, lKey: string): unknown[] => {
            if (!lObject || typeof lObject !== 'object') return [];
            const cLowerKey = lKey.toLowerCase();
            const cCurrent = Object.entries(lObject).flatMap(([k, v]) => k.toLowerCase() === cLowerKey ? [v] : (v && (v as any).valueName?.toLowerCase() === cLowerKey && (v as any).value !== undefined) ? [(v as any).value] : []);
            const cChildren = Object.values(lObject).flatMap(v => callFindValue(v, lKey));
            return [...cCurrent, ...cChildren];
        };
        const cMappings = Array.isArray(this.ENUM_KEYS) ? this.ENUM_KEYS : Object.entries(this.ENUM_KEYS).map(([k, v]) => ({ Keys: [k], Value: v, Array: Array.isArray(v) }));
        for (const { Keys, Value, Array: isArr } of cMappings) {
            if (typeof Value !== 'string' || !Value) continue;
            const cUnique = [...new Set(Keys.flatMap(k => callFindValue(JSON, k)))];
            if (!cUnique.length) continue;
            const cValue = isArr ? cUnique : (cUnique.length === 1 ? cUnique[0] : cUnique);
            const cParts = Value.split('.').filter(Boolean);
            let lCurrent = cExtracted;
            cParts.slice(0, -1).forEach((p: any) => lCurrent = (lCurrent[p] && typeof lCurrent[p] === 'object' && !Array.isArray(lCurrent[p])) ? lCurrent[p] : (lCurrent[p] = {}));
            const last = cParts[cParts.length - 1];
            if (last) {
                lCurrent[last] = lCurrent[last] !== undefined ? [...(Array.isArray(lCurrent[last]) ? lCurrent[last] : [lCurrent[last]]), ...(Array.isArray(cValue) ? cValue : [cValue])] : cValue;
            }
        }
        return cExtracted;
    }

    private onFinish(Context: string): void { 
        const cTickB = performance.now();
        const cTickC = cTickB - this.prTickA;
        SetLog({ Type: `DEBUG`, Message: `[${(Math.round((cTickC) * 100) / 100).toFixed(1)}ms] ${Context}` });
    }
}