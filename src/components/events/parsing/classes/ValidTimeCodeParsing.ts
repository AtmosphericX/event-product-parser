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

import { TYPE_VTEC } from "Types/components/ValidTimeEventCode"
import { ENUM_REGULAR_EXPRESSIONS } from "@Enums/RegularExpressions"
import { ENUM_VTEC_PRODUCTS } from "@Enums.Products/VTECProducts"
import { ENUM_VTEC_STATUS } from "@Enums.Products/VTECStatus"
import { ENUM_VTEC_ACTIONS } from "@Enums.Products/VTECActions"
import { ENUM_VTEC_TYPES } from "@Enums.Products/VTECTypes"
import { SetLog } from "@Components.Utilities/SetLog";

interface GET_OPTIONS { Message?: string }
interface GET_EXPIRY_DATE_OPTIONS { VTEC: string }

export class ValidTimeCodeParsing { 
    private pMessage: string;
    private pCollection: TYPE_VTEC[] = [];
    private prTickA = performance.now();

    public constructor({ Message }: GET_OPTIONS) {
        this.pMessage = Message;
        return this;
    }

    public GetReferences(): TYPE_VTEC[] | null {
        if (!this.pMessage) return null;
        this.prTickA = performance.now();
        const cRegex = this.pMessage.match(ENUM_REGULAR_EXPRESSIONS.VTEC) ?? [];
        for (const cVTEC of cRegex) { 
            const cExpiryDate = this.GetExpiryDate({ VTEC: cVTEC });
            const [cType, cStatus, cOffice, cProduct, cAction, cCode] = cVTEC.split(`.`);
            this.pCollection.push({
                Raw: cVTEC,
                Product: ENUM_VTEC_TYPES[cType] ?? `Unknown Product Type`,
                Name: `${ENUM_VTEC_PRODUCTS[cProduct]} ${ENUM_VTEC_ACTIONS[cAction]}`,
                Status: ENUM_VTEC_STATUS[cStatus] ?? `Unknown Status Type`,
                Office: cOffice,
                Expires: new Date(cExpiryDate),
                Watch: {
                    SPC: (cAction == `A` || cAction == `Y`) && (cProduct == `TO` || cProduct == `SV`),
                    NHC: (cAction == `A` || cAction == `Y`) && (cProduct == `HU` || cProduct == `TR`),
                    Status: [`KWNS`, `KNHC`].includes(cOffice)
                },
                Tracking: `${cOffice}.${cProduct}.${cAction}.${cCode}`,
            });
        }
        this.onFinish(`GetReferences -> ${cRegex.length} VTEC Codes Found`);
        return this.pCollection;
    }

    public GetExpiryDate({ VTEC }: GET_EXPIRY_DATE_OPTIONS): string {
        this.prTickA = performance.now();
        const cSub = VTEC.split(`.`);
        const cDates = cSub[6]?.split(`-`);
        const isInvalid = cDates?.[1] == `000000T0000Z`;

        if (isInvalid) return null

        const cGetYear = new Date().getFullYear().toString().substring(0, 2);
        const cGetDayMonth = `${cDates[1].substring(0, 2)}-${cDates[1].substring(2, 4)}-${cDates[1].substring(4, 6)}`;
        const cGetTime = `${cDates[1].substring(7, 9)}:${cDates[1].substring(9, 11)}:00`
        const cGetDate = new Date(`${cGetYear}${cGetDayMonth}T${cGetTime}`);
        const cLocalTime = new Date(new Date(cGetDate).getTime() - 4 * 60 * 60000);

        this.onFinish(`GetExpiryDate -> ${VTEC}`);
        return [
            `${cLocalTime.getFullYear()}-`,
            `${this.CreatePadding(cLocalTime.getMonth() + 1)}-`,
            `${this.CreatePadding(cLocalTime.getDate())}T`,
            `${this.CreatePadding(cLocalTime.getHours())}:`,
            `${this.CreatePadding(cLocalTime.getMinutes())}:00.000-04:00`
        ].join(``);  
    }

    private CreatePadding(cNumber: number): string { 
        return cNumber.toString().padStart(2, `0`);
    }

    private onFinish(Context: string): void { 
        const cTickB = performance.now();
        const cTickC = cTickB - this.prTickA;
        SetLog({ Type: `DEBUG`, Message: `[${(Math.round((cTickC) * 100) / 100).toFixed(1)}ms] ${Context}` });
    }
}