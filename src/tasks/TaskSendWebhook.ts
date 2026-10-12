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

import { TypeEvent } from "TypesEvent/Event"
import { CreateHttp } from "@Utilities/CreateHttp";
import { SetTimeoutAction } from "@Utilities/SetTimeoutAction";
import { GetEmbededText } from "@Formatting/GetEmbededText";
import { readFile } from "fs/promises"

interface TaskSendWebhookOptions {
    Event: TypeEvent;
    Webhook: {
        Enabled: boolean;
        Destination: string;
        Message: string;
        Title: string;
        Ratelimit: number;
    };
    Attachments: {
        Image?: string;
        Text?: string;
        Audio?: string;
        Json?: string;
    }
}

export const TaskSendWebhook = async function({ Event, Webhook, Attachments }: TaskSendWebhookOptions): Promise<void> { 
    const { Image, Text, Audio, Json } = Attachments;
    const { Title, Message, Destination, Ratelimit } = Webhook;
    
    const { properties } = Event;
    const { event, status, description, metadata, status_metadata } = properties;
    const { is_expired } = status_metadata;
    const { tracking, attachments } = metadata;

    const { Limited } = SetTimeoutAction({
        Identifier: Destination,
        Interval: (Ratelimit ?? 2) * 2,
        Max: (Ratelimit ?? 2), 
        AddTime: true 
    })

    if (Limited) { return }

    const form = new FormData();
    const embed = {
        title: `${event} (${status})`,
        description: GetEmbededText(Event),
        fields: [] as { name: string, value: string }[],
        color: 16711680,
        thumbnail: Image ? { url: `attachment://${event}_${status}_${tracking}.png` } : undefined,
        timestamp: new Date().toISOString(),
        footer: { text: Title ?? `AtmosphericX` }
    };

    if (description && !is_expired) {
        const body = description.length > 900
            ? description.substring(0, 900) + "\n\n[Message truncated due to length]"
            : description;
        embed.fields.push({
            name: "Description", 
            value: body ? '```' + '\n' + body.split('\n').map(l => l.trim()).filter(Boolean).join('\n') + '\n' + '```' : ""
        });
    }

    if (attachments?.length > 0) {
        const attach = attachments.slice(0, 5);
        embed.fields.push({
            name: "Attachments", 
            value: attach.map(attachment => `- [${attachment.name.length > 45 ? attachment.name.substring(0, 45) + '...' : attachment.name}](${attachment.link})`).join('\n')
        });
    }

    if (Image) {
        const file = await readFile(Image);
        form.append("attachmentImage", new Blob([Buffer.from(file)], {type: "image/png"}), `${properties.event}_${properties.status}_${properties.metadata.tracking}.png`)
    }

    if (Text) {
        form.append("attachmentText", new Blob([Buffer.from(Text)], {type: "application/text"}), `${properties.event}_${properties.status}_${properties.metadata.tracking}.txt`)
    }
    if (Json) {
        form.append("attachmentJson", new Blob([Buffer.from(Json)], {type: "application/json"}), `${properties.event}_${properties.status}_${properties.metadata.tracking}.json`)
    }
    if (Audio) {
        const file = await readFile(Audio);
        form.append("attachmentAudio", new Blob([Buffer.from(file)], {type: "application/wav"}), `${properties.event}_${properties.status}_${properties.metadata.tracking}.wav`)
    }

    form.append("payload_json", JSON.stringify({ 
        username: Title ?? `AtmosphericX`,
        content: Message ?? "",
        embeds: [embed]
    }));

    await CreateHttp({
        URL: Destination,
        Timeout: 15e3,
        Method: `POST`,
        Body: form
    })
}