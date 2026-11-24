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

import { TYPE_EVENT } from "Types.Event/Event"
import { ENUM_STRINGS } from "@Enums/Strings"
import { Bootstrap } from "@Bootstrap"
import { CreateFetchRequest } from "@Components.Utilities/CreateFetchRequest"
import { SetLog } from "@Components.Utilities/SetLog"

interface CONSTRUCT_NOTIFICATION_OPTIONS { 
    Product: TYPE_EVENT
    Message: string
    Topic: string
}

export const ConstructNotification = async ({ Product, Message, Topic}: CONSTRUCT_NOTIFICATION_OPTIONS): Promise<void> => {
    const { NTFY } = Bootstrap.Settings.Integrations;
    const { MediaDirectories, Credentials, DefaultServer, Enabled } = NTFY;
    const { Username, Password } = Credentials;
    
    if (!Enabled) return SetLog({ Type: `ERROR`, Message: ENUM_STRINGS.TASKS.NFTY_NOT_ENABLED });

    const { properties, geometry } = Product ?? {};
    const { event, status, parameters, components, attachments, tracking } = properties ?? {};
    const { tags } = parameters ?? {};

    const cTimestamp = new Date().getTime();
    const cFileStructure = `${event}_${components?.tracking}`;
    const cGeneratedImages = MediaDirectories.Graphics ? { link: `${MediaDirectories.Graphics}/${cFileStructure}.png` } : undefined;
    const cSPCGraphics = attachments?.find(lAttachment => lAttachment.name.includes(`Image: `))
    const cNodeNames = tracking?.nodes?.map(lNode => lNode.proximity && lNode.id ? String(lNode.id) : null).filter(Boolean);
    const cTopics = [Product ? `GLOBAL` : null, Topic, ...(tracking?.filtered ? [`${Topic}-LOCAL`, ...cNodeNames.map(lNodeName => `${Topic}-LOCAL-${lNodeName.toUpperCase().replace(/\s+/g, "_")}`)] : [])].filter(Boolean);
    
    const cActions = [
        ...(MediaDirectories.Audio ? [{
            action: `view`,
            label: `Play Content`,
            url: `${MediaDirectories.Audio}/${cFileStructure}.wav?unix=${cTimestamp}`
        }] : []),
        ...(MediaDirectories.Products ? [{
            action: `view`,
            label: `View Product`,
            url: `${MediaDirectories.Products}/${cFileStructure}.txt?unix=${cTimestamp}`
        }] : []),
        ...(cSPCGraphics ? [{
            action: `view`,
            label: `View Graphic`,
            url: `${cSPCGraphics.link}?unix=${cTimestamp}`
        }] : []),
        ...[{
            action: `copy`,
            label: `Copy Product`,
            value: `${event} (${status})\n\n${Message}\nTags: ${tags?.join(",") ?? "---"}`
        }]
    ]
    

    const cHeaders = { 
        Title: `${event} (${status})`,
        Tags: tags?.join(",") ?? `---`,
        Priority: "5",
        ...(cGeneratedImages && geometry?.coordinates && { Attach: `${cGeneratedImages.link}?unix=${cTimestamp}` }),
        ...(cActions.length > 0 && { Actions: JSON.stringify(cActions) })
    }
    const cAuthentication = Username && Password ? { Username, Password } : null;
    
    const cCallPush = async (lTopic: string) => {
        const { Error, StatusCode } = await CreateFetchRequest({
            Destination: `${DefaultServer.replace(/\/$/, "")}/${lTopic}`,
            Timeout: 5e3,
            Method: `POST`,
            Headers: cHeaders,
            Body: Message,
            ...(cAuthentication && { Authentication: cAuthentication })
        })
        if (Error) { 
            SetLog({ Type: `ERROR`, Message: ENUM_STRINGS.TASKS.NTFY_FAILED.replace(/%s/g, lTopic).replace(/%d/g, String(StatusCode)) })
        }
    }

    await Promise.all([...new Set(cTopics)].map(cCallPush));
}