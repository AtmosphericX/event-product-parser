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

import { TypeActions } from "TypesStandard/Actions"
import { TypeEvent } from "TypesEvent/Event"
import { Bootstrap } from "@Bootstrap"
import { SetDebug } from "@Utilities/SetDebug"
import { GetMatched } from "@Utilities/GetMatched"
import { QueueManager } from "@Utilities/QueueManager"
import { GetStringText } from "@Formatting/GetStringText"
import { GetCleanedEvent } from "@BuilderComponents/GetCleanedEvent"
import { GenerateAudioMessage } from "@Audio/GenerateAudioMessage"
import { TaskGenerateFile } from "@Tasks/TaskGenerateFile"
import { TaskSendNTFY } from "@Tasks/TaskSendNTFY"
import { TaskSendWebhook } from "@Tasks/TaskSendWebhook"
import { GenerateGraphic } from "@Image/GenerateGraphic"

const Webhooks = new QueueManager({ Concurrency: 1 });
const NTFY = new QueueManager({ Concurrency: 5 });
const taskChains = new Map<string, Promise<void>>();

export const CreateTasks = async (events: TypeEvent[]): Promise<void> => {
    const { ActionSettings, GlobalSettings, NotifyServer } = Bootstrap.Settings;
    const actions = ActionSettings as TypeActions[];

    const run = async (event: TypeEvent): Promise<void> => {
        const tick = performance.now()
        const { properties } = event;
        const isActioning = Array.isArray(actions) && actions.length > 0;

        if (!isActioning) { return }
        
        const matchingActions = actions.filter(action => {
            const { Events } = action;
            return Events.length === 0 || GetMatched({ Strings: Events, String: properties.event });
        });

        if (matchingActions.length === 0) { return }

        const uploads = matchingActions.reduce((required, action) => ({
            AUDIO: required.AUDIO || Boolean(action.Uploads?.AUDIO),
            TEXT: required.TEXT || Boolean(action.Uploads?.TEXT),
            JSON: required.JSON || Boolean(action.Uploads?.JSON),
            IMAGE: required.IMAGE || Boolean(action.Uploads?.IMAGE)
        }), { AUDIO: false, TEXT: false, JSON: false, IMAGE: false });

        const [audio, text, json, image] = await Promise.all([
            uploads.AUDIO && GlobalSettings?.ArchiveSettings?.AudioDirectory ? GenerateAudioMessage({
                Directory: GlobalSettings.ArchiveSettings.AudioDirectory,
                Title: (`${properties.event}_${properties.metadata.tracking}`).replace(/[\\:*?"<>|]/g, "_").replace(/\s+/g, " ").trim(),
                Message: properties.description,
                Header: properties.metadata.header
            }) : Promise.resolve(null),
            uploads.TEXT && GlobalSettings?.ArchiveSettings?.TextDirectory ? TaskGenerateFile({
                String: properties.metadata.raw,
                Directory: GlobalSettings.ArchiveSettings.TextDirectory,
                Filename: (`${properties.event}_${properties.metadata.tracking}.txt`).replace(/[\\:*?"<>|]/g, "_").replace(/\s+/g, " ").trim()
            }) : Promise.resolve(null),
            uploads.JSON && GlobalSettings?.ArchiveSettings?.JSONDirectory ? TaskGenerateFile({
                String: JSON.stringify(GetCleanedEvent(event), null, 2),
                Directory: GlobalSettings.ArchiveSettings.JSONDirectory,
                Filename: (`${properties.event}_${properties.metadata.tracking}.json`).replace(/[\\:*?"<>|]/g, "_").replace(/\s+/g, " ").trim()
            }) : Promise.resolve(null),
            uploads.IMAGE && GlobalSettings?.ArchiveSettings?.ImageDirectory ? GenerateGraphic({
                Event: event,
                File: {
                    Directory: GlobalSettings.ArchiveSettings.ImageDirectory,
                    Name: (`${properties.event}_${properties.metadata.tracking}.png`).replace(/[\\:*?"<>|]/g, "_").replace(/\s+/g, " ").trim()
                }
            }) : Promise.resolve(null)
        ]);

        SetDebug({ Title: `Tasks/Generative`, Message: `${Math.round(performance.now() - tick)}ms` });

        await Promise.all(matchingActions.map(async action => {
            const { Webhook, NotificationServer, Uploads } = action;
            const b = performance.now();
                await Promise.all([
                    NotificationServer?.Enabled && NotifyServer?.Enabled && NotificationServer?.Topic ? NTFY.enqueue(() => TaskSendNTFY({
                        Event: event,
                        Priority: NotificationServer?.Priority ?? 5,
                        Body: GetStringText(event),
                        Topic: NotificationServer?.Topic
                    })) : Promise.resolve(null),
                    Webhook?.Enabled && Webhook?.Destination ? Webhooks.enqueue(() => TaskSendWebhook({
                        Event: event,
                        Webhook: {
                            Enabled: Webhook?.Enabled,
                            Destination: Webhook?.Destination,
                            Message: Webhook?.Message,
                            Title: Webhook?.Title,
                            Ratelimit: Webhook?.Ratelimit
                        },
                        Attachments: {
                            Image: Uploads?.IMAGE ? image : null,
                            Text: Uploads?.TEXT ? text : null,
                            Audio: Uploads?.AUDIO ? audio : null,
                            Json: Uploads?.JSON ? json : null
                        }
                    })) : Promise.resolve(null)
                ]);
                SetDebug({ Title: `Tasks/Send`, Message: `${Math.round(performance.now() - b)}ms` })
        }))
        SetDebug({ Title: `Tasks/Completed`, Message: `${Math.round(performance.now() - tick)}ms` })
    };

    await Promise.all(events.map(async event => {
        const tracking = event.properties.metadata.tracking;
        const previous = taskChains.get(tracking) ?? Promise.resolve();
        const current = previous
            .catch((): undefined => undefined)
            .then(() => run(event));
        taskChains.set(tracking, current);
        try {
            await current;
        } finally {
            if (taskChains.get(tracking) === current) {
                taskChains.delete(tracking);
            }
        }
    }));
}