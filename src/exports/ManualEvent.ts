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
import { GetAwipsType } from "@Stanza/GetAwipsType"
import { ProcessStanza } from "@Builder/ProcessStanza"

interface CreateEventOptions {
    Message: string
    Awipsid?: string
}

export const ManualEvent = async ({ Message, Awipsid }: CreateEventOptions): Promise<void> => {
    const isCapEvent = Message.includes(`<?xml`);
    const isCapAreaDescription = Message.includes(`<areaDesc>`)
    const isVTEC = Message.match(EnumExpressions.vtec) != null;
    const isUGC = Message.match(EnumExpressions.ugc1) != null;
    const attributes = {
        "xmlns": "@atmosx/event-product-parser",
        "id": "manual_processor.0000",
        "issue": new Date().toISOString(),
        "ttaaii": "XXXXX",
        "cccc": "XXX",
        "awipsid": Awipsid ?? "XXXXXX",
    }
    const getType = GetAwipsType({ Attributes: attributes})
    const result = { 
        Message: Message, 
        Attributes: attributes,
        CapEvent: isCapEvent, 
        VTEC: isVTEC, 
        UGC: isUGC, 
        CapAreaDescription: isCapAreaDescription, 
        Ignored: false, 
        NWWS: true, 
        Type: getType, 
    }
    await ProcessStanza(result);
}
