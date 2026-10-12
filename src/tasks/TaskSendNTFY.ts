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
import { Bootstrap } from "@Bootstrap"
import { CreateHttp } from "@Utilities/CreateHttp";
import { SetDebug } from "@Utilities/SetDebug";

interface TaskSendNTFYOptions {
    Event: TypeEvent
    Priority: string | number
    Body: string
    Topic: string
}

export const TaskSendNTFY = async function({ Event, Priority, Body, Topic }: TaskSendNTFYOptions): Promise<void> { 
    const { properties, geometry } = Event;
    const { event, status, metadata, parameters } = properties;
    const { tags } = parameters;
    const { tracking, filtered_proximity, attachments } = metadata;

    const { NotifyServer} = Bootstrap.Settings
    const { MediaStorage } = NotifyServer ?? {};
    const { Username, Password } = NotifyServer?.Credentials ?? {};

    const image = MediaStorage?.IMAGE ? { link: `${MediaStorage.IMAGE}/${event}_${tracking}.png` } : undefined;
    const graphic = attachments?.find(a => a.name === "Image: SPC Graphic") 
    const topics = [`GLOBAL`, Topic, ...(filtered_proximity ? [`${Topic}-LOCAL`] : [])];
    const actions = [
        ...(MediaStorage?.AUDIO ? [{ "action": "view", "label": "View Audio", "url": `${MediaStorage.AUDIO}/${event}_${tracking}.wav?unix=${new Date().getTime()}` }] : []),
        ...(MediaStorage?.TEXT ? [{ "action": "view", "label": "View Text", "url": `${MediaStorage.TEXT}/${event}_${tracking}.txt?unix=${new Date().getTime()}` }] : []),
        ...(graphic ? [{ "action": "view", "label": "View Graphic", "url": graphic.link + `?unix=${new Date().getTime()}` }] : []),
        ... [{ "action": "copy", "label": "Copy Card", "value": `${event} (${status})\n${Body}\nTags: ${tags?.join(",") ?? "N/A"}` }]
    ];
    const headers = {
        "Title": `${properties.event} (${properties.status})`,
        "Tags": properties.parameters.tags?.join(",") ?? "N/A",
        "Priority": Priority ?? "5",
        ...(image && geometry.coordinates.length > 0 && { "Attach": image.link + `?unix=${new Date().getTime()}` }),
        ...(actions.length > 0 && { "Actions": JSON.stringify(actions) }),
    };
    const authentication = Username && Password ? { Username: Username, Password: Password } : undefined;

    const push = async (topic: string) => {
        const { error, message} = await CreateHttp({
            URL: `${NotifyServer?.Server?.replace(/\/$/, "")}/${topic}`,
            Timeout: 15_000, Method: "PUT",
            ...(authentication && { Auth: authentication }),
            Headers: headers, Body: Body
        })
        if (error) { 
            SetDebug({ Title: `Tasks/NTFY`, Message: `Failed to send notification to topic "${topic}": ${message}` })
        }
    }
    await Promise.all([...new Set(topics)].map(push));
}