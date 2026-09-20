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

import { TypeAttributes } from "TypesEvent/Attributes"
import { TypeStanzaCompiled } from "TypesStandard/StanzaCompiled"
import { EnumMatches } from "@Enums/Matches"
import { Bootstrap } from "@Bootstrap"
import { UGCExtract } from "@ParsingUGC/UGCExtract"
import { GetEventProperties } from "@BuilderComponents/GetEventProperties"
import { GetEventHeader } from "@BuilderComponents/GetEventHeader"
import { GetEventTracking } from "@BuilderComponents/GetEventTracking"
import { GetEventTheme } from "@BuilderComponents/GetEventTheme"
import { SetDebug } from "@Utilities/SetDebug"

export const ParseUGC = async (Stanza: TypeStanzaCompiled): Promise<void> => {
    const getMessages = Stanza?.Message
        ?.split(/(?=\$\$)/g)
        ?.map(message => message.trim())
        ?.filter(message => message && message !== "$$");
    if (!getMessages || getMessages?.length == 0 ) return;
    for (const message of getMessages) {
        const tick = performance.now();
        const attributes = Stanza?.Attributes as TypeAttributes
        const ugc = await UGCExtract(message)

        if (ugc != null ) {
            const props = GetEventProperties({ Message: message, Attributes: attributes, UGC: ugc })
            const issued = new Date(attributes.issue)
            const expires = new Date(ugc.Expires)
            const header = GetEventHeader({ Properties: props, VTEC: null, Type: Stanza.Type })
            const matches = EnumMatches[Stanza.Type.Prefix]?.find(match => match.match.test(message.toUpperCase()));
            
            let event = matches?.label;
            let isStatement = matches?.statement ?? false;
            
            if (!event) { 
                event = Stanza.Type.Type;
                if (!Stanza.Type.Discovered) {
                    event += ` (AWIPSID)`
                }
                isStatement = true;
            }
            
            Bootstrap.Cache.Parsed.push({
                type: `Feature`,
                geometry: {
                    type: `Polygon`,
                    coordinates: []
                },
                properties: { 
                    event: event,
                    parent: event,
                    status: isStatement ? `Statement` : `Issued`,
                    issued: (!isNaN(issued.getTime())) ? issued.toISOString() : new Date().toISOString(),
                    expires: isStatement ? new Date(issued.getTime() + 120 * 1000).toISOString() : (!isNaN(expires.getTime())) ? expires.toISOString() : new Date(Date.now() + 60 * 60 * 1000).toISOString(),
                    theme: GetEventTheme(event),
                    ...props,
                    metadata: {
                        ms: performance.now() - tick,
                        source: `events.ugc`,
                        tracking: GetEventTracking({ Type: `RAW`, Stanza, Attributes: attributes, Properties: props }),
                        header: header,
                        vtec: null,
                        hvtec: null,
                        raw: message,
                        history: [
                            {
                                description: props.description,
                                issued: (!isNaN(issued.getTime())) ? issued.toISOString() : new Date().toISOString(),
                                status: `Issued`
                            }
                        ]
                    }
                }
            })
            SetDebug({ Title: `ParseUGC`, Message: `${Math.round(performance.now() - tick)}ms` })
        }
    }
}