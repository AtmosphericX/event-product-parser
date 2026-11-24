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
import { CreateFetchRequest } from "@Components.Utilities/CreateFetchRequest"
import { SetLog } from "@Components.Utilities/SetLog"
import { SetTimeoutAction } from "@Components.Utilities/SetTimeoutAction"
import { readFile } from "fs/promises"

interface CONSTRUCT_WEBHOOK_OPTIONS { 
    Product: TYPE_EVENT
    Webhook: {
        URL: string
        Ratelimit: number
        Title: string
        Message: string
    }
    Attachments: {
        Graphics: string
        Product: string
        Audio: string
        GeoJSON: string
    }
}

type TYPE_FIELDS = { 
    name: string
    value: string
}

export const ConstructWebhook = async ({ Product, Webhook, Attachments }: CONSTRUCT_WEBHOOK_OPTIONS): Promise<void> => {
    const { properties } = Product ?? {};
    const { event, status, components, attachments, status_parameters, description } = properties ?? {};
    const { expired } = status_parameters ?? {}

    const cTimeout = SetTimeoutAction({ 
        Identifier: `Webhook.${Webhook.URL}`, 
        Max: Webhook.Ratelimit ?? 2, 
        Interval: (Webhook.Ratelimit ?? 2) * 2, 
        AddTime: true
    });

    if (cTimeout) return;

    const cTimestamp = new Date().toISOString();
    const cFileStructure = `${event}_${components?.tracking}`;
    const cCreateForm = new FormData();
    const cCreateEmbed = { 
        title: `${event} (${status})`,
        description: ``, // TODO: Implement a description for the webhook message (GetWebhookText)
        fields: [] as TYPE_FIELDS[],
        color: 16711680,
        thumbnail: Attachments?.Graphics ? { url: `attachment://${cFileStructure}.png` } : null,
        timestamp: cTimestamp,
        footer: { text: Webhook.Title ?? `@atmosx/event-product-parser`}
    }

    if (description && !expired) {
        const cBodyField = description.length > 900
            ? description.substring(0, 900) + "\n\n[Message truncated due to length]"
            : description;
        cCreateEmbed.fields.push({
            name: `Description`,
            value: cBodyField ? `\`\`\`${cBodyField
                .split('\n').map(lField => lField.trim())
                .filter(Boolean).join('\n')}\`\`\`` : ``
        });
    }

    if (attachments?.length > 0) { 
        const cAttachmentField = attachments.slice(0, 5);
        cCreateEmbed.fields.push({
            name: `Attachments`,
            value: cAttachmentField
                .map(lAttachment => `- [${lAttachment.name.length > 45 ? lAttachment.name.substring(0, 45) + '...' : lAttachment.name}](${lAttachment.link})`)
                .join('\n')
        });
    }

    if (Attachments.Audio) {
        const cAudioBlob = await readFile(Attachments.Audio);
        cCreateForm.append(`attachment.audio`, new Blob([Buffer.from(cAudioBlob)], {type: "application/wav"}), `${cFileStructure}.wav`);
    }
    if (Attachments.Graphics) { 
        const cGraphicBlob = await readFile(Attachments.Graphics);
        cCreateForm.append(`attachment.graphic`, new Blob([Buffer.from(cGraphicBlob)], {type: "image/png"}), `${cFileStructure}.png`);
    }
    if (Attachments.Product) { 
        cCreateForm.append(`attachment.product`, new Blob([Buffer.from(Attachments.Product)], {type: "application/text"}), `${cFileStructure}.txt`);
    }
    if (Attachments.GeoJSON) { 
        cCreateForm.append(`attachment.geojson`, new Blob([Buffer.from(Attachments.GeoJSON)], {type: "application/json"}), `${cFileStructure}.json`);
    }

    cCreateForm.append(`payload_json`, JSON.stringify({
        username: Webhook.Title ?? `@atmosx/event-product-parser`,
        content: Webhook.Message ?? ``,
        embeds: [cCreateEmbed]
    }));

    const { Error, StatusCode } = await CreateFetchRequest({
        Destination: Webhook.URL,
        Timeout: 5e3,
        Method: `POST`,
        Body: cCreateForm
    });

    if (Error) { 
        SetLog({ Type: `ERROR`, Message: ENUM_STRINGS.TASKS.WEBHOOK_FAILED.replace(/%s/g, Webhook.URL).replace(/%d/g, String(StatusCode)) });
    }
}