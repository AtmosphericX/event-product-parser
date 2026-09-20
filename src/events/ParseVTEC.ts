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
import { TypeVTEC } from "TypesEvent/VTEC"
import { TypeHVTEC } from "TypesEvent/HVTEC"
import { Bootstrap } from "@Bootstrap"
import { VTECExtract } from "@ParsingVTEC/VTECExtract"
import { HVExtract } from "@ParsingHVTEC/HVExtract"
import { UGCExtract } from "@ParsingUGC/UGCExtract"
import { GetEventProperties } from "@BuilderComponents/GetEventProperties"
import { GetEventHeader } from "@BuilderComponents/GetEventHeader"
import { GetEventTracking } from "@BuilderComponents/GetEventTracking"
import { GetEventTheme } from "@BuilderComponents/GetEventTheme"
import { SetDebug } from "@Utilities/SetDebug"

export const ParseVTEC = async (Stanza: TypeStanzaCompiled): Promise<void> => {
    const getMessages = Stanza?.Message
        ?.split(/(?=\$\$)/g)
        ?.map(message => message.trim())
        ?.filter(message => message && message !== "$$");
    if (!getMessages || getMessages?.length == 0 ) return;
    for (const message of getMessages) {
        const tick = performance.now();
        const attributes = Stanza?.Attributes as TypeAttributes
        const VTEC = VTECExtract(message) as TypeVTEC[];
        const hVTEC = HVExtract(message) as TypeHVTEC[];
        const ugc = await UGCExtract(message)
        if (VTEC != null && ugc != null ) {
            for (const vtec of VTEC) {
                const props = GetEventProperties({ Message: message, Attributes: attributes, UGC: ugc, VTEC: vtec })
                const header = GetEventHeader({ Properties: props, VTEC: vtec, Type: Stanza.Type })
                const issued = new Date(attributes.issue)?? new Date()
                const expires = new Date(vtec.expires)
                Bootstrap.Cache.Parsed.push({
                    type: `Feature`,
                    geometry: {
                        type: `Polygon`,
                        coordinates: []
                    },
                    properties: { 
                        event: vtec.event,
                        parent: vtec.event,
                        status: vtec.status,
                        issued: (!isNaN(issued.getTime())) ? issued.toISOString() : new Date().toISOString(),
                        expires: (!isNaN(expires.getTime())) ? expires.toISOString() : ugc.Expires ??  new Date(issued.getTime() + 60 * 60 * 1000).toISOString(),
                        theme: GetEventTheme(vtec.event),
                        ...props,
                        metadata: {
                            ms: performance.now() - tick,
                            source: `events.vtec`,
                            tracking: GetEventTracking({ Type: `VTEC`, Stanza, Attributes: attributes, Properties: props, VTEC: vtec }),
                            header: header,
                            vtec: vtec,
                            hvtec: hVTEC,
                            raw: message,
                            history: [
                                {
                                    description: props.description,
                                    issued: (!isNaN(issued.getTime())) ? issued.toISOString() : new Date().toISOString(),
                                    status: vtec.status
                                }
                            ]
                        }
                    }
                })
                SetDebug({ Title: `ParseVTEC`, Message: `${Math.round(performance.now() - tick)}ms` })
            }
        }
    }
}