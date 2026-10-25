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

import { TYPE_STANZA } from "Types/stanza/Stanza"
import { ENUM_STRINGS } from "@Enums/Strings"
import { Bootstrap } from "@Bootstrap"
import { SetLog } from "@Components.Utilities/SetLog"
import { SetSleep } from "@Components.Utilities/SetSleep"
import { ValidateStanza } from "@Components.Stanza/ValidateStanza"
import { ProcessStanza } from "@Components.Stanza/ProcessStanza"
import { CreateStanza } from "@Components.Database.Queries/CreateStanza"
import { client, xml } from "@xmpp/client"
import { Cron } from "croner"

type TYPE_AUTHENTICATION = {
    Username: string
    Password: string
    Nickname: string
}

export class DeployService { 
    public pService: string = `xmpp://nwws-oi.weather.gov`;
    public pDomain = `nwws-oi.weather.gov`;
    public pSession: ReturnType<typeof client>;
    public pAuthentication: TYPE_AUTHENTICATION;

    public constructor() {
        this.pAuthentication = Bootstrap.Settings.WeatherWireServiceSettings.Credentials;
        this.pAuthentication.Nickname ??= `atmosx@event-product-parser-${Bootstrap.Version}-${Math.floor(Math.random() * 1e4)}`;
        this.DeploySession();
    }

    private async StartSession(): Promise<void> {
        if (this.pSession) {
            await this.pSession.start().catch(() => {});
        }
    }
    
    private async KillSession(): Promise<void> {
        if (this.pSession) {
            Bootstrap.CacheControl.Session.Reconnecting = true;
            Bootstrap.CacheControl.Session.Connected = false;
            Bootstrap.CacheControl.Session.ReconnectAttempts++;
            await this.pSession.stop().catch(() => {});
        }
    }

    public async ReconnectSessionCheck(): Promise<void> { 
        let { ReconnectionPeriod } = Bootstrap.Settings.WeatherWireServiceSettings;
        let { LastStanzaReported, Reconnecting, ReconnectAttempts, Connected, HaultConnection } = Bootstrap.CacheControl.Session;
        const cReportedLastStanza = Date.now() - LastStanzaReported;
        if (!Connected && !HaultConnection || !this.pSession) {
            return;
        }
        if (ReconnectionPeriod < 15) {
            Bootstrap.Settings.WeatherWireServiceSettings.ReconnectionPeriod = 15;
            SetLog({
                Type: "ERROR",
                Message: ENUM_STRINGS.SERVICE.RECONNECT_INTERVAL_SMALL.replace(`%s`, ReconnectionPeriod.toString()),
            })
        }
        if (cReportedLastStanza > ReconnectionPeriod * 1e3) {
            if (!Reconnecting) { 
                await this.KillSession();
                SetLog({
                    Message: ENUM_STRINGS.SERVICE.RECONNECTING.replace(`%s`, ReconnectAttempts.toString()),
                    Metadata: { Status: `reconnecting` },
                    Event: `onServiceStatus`
                })
                await this.StartSession();
            }
        }
    }

    private DeploySession(): void { 
        this.pSession = Bootstrap.Session = client({
            service: this.pService,
            domain: this.pDomain,
            username: this.pAuthentication.Username,
            password: this.pAuthentication.Password
        })
        this.StartSession();
        this.pSession.on(`online`, () => this.onOnline());
        this.pSession.on(`stanza`, (stanza: TYPE_STANZA) => this.onStanza(stanza));
        this.pSession.on(`error`, () => this.onError());
        process.on('SIGINT', async () => {
            await this.KillSession();
            process.exit(0);
        });
        new Cron(`* * * * * *`, async () => this.ReconnectSessionCheck());
    }

    private onOnline(): void {
        const { ReconnectAttempts } = Bootstrap.CacheControl.Session;
        const cNickname = `${this.pAuthentication.Nickname} (x${ReconnectAttempts})`;

        Bootstrap.CacheControl.Session.Connected = true;
        Bootstrap.CacheControl.Session.Reconnecting = false;
        Bootstrap.CacheControl.Session.HaultConnection = false;
        Bootstrap.CacheControl.Session.LastStanzaReported = Date.now();

        this.pSession.send(xml('presence', {
            to: `nwws@conference.nwws-oi.weather.gov/${cNickname}`,
            xmlns: 'http://jabber.org/protocol/muc',
        }))
        SetLog({
            Message: ENUM_STRINGS.SERVICE.CONNECTED.replace(`%s`, cNickname),
            Metadata: { Status: `online` },
            Event: `onServiceStatus`
        })
    }

    private async onError(): Promise<void> { 
        Bootstrap.CacheControl.Session.Connected = true;
        Bootstrap.CacheControl.Session.HaultConnection = true;
        SetLog({
            Message: ENUM_STRINGS.SERVICE.DISCONNECTED,
            Metadata: { Status: `offline` },
            Event: `onServiceStatus`
        })
        await this.KillSession();
        await SetSleep({ Timeout: 5e3 });
        await this.StartSession();
    }

    private async onStanza(Stanza: TYPE_STANZA): Promise<void> { 
        const { Username, Nickname} = this.pAuthentication;
        const cMsgFrom = Stanza?.attrs?.from ?? ``
        const cMsgType = Stanza?.attrs?.type ?? ``

        Stanza.attrs.to = Stanza.attrs.to?.replace(Username, Nickname ?? "****");
        Bootstrap.CacheControl.Session.LastStanzaReported = Date.now();
    
        if (Stanza.is(`presence`) && cMsgFrom.startsWith('nwws@conference.nwws-oi.weather.gov/')) {
            const cOccupant = cMsgFrom.split(`/`).slice(1).join(`/`);
            const cAvailability = cMsgType === `unavailable`
            SetLog({
                Hidden: true,
                Message: ENUM_STRINGS.SERVICE.OCCUPANT.replace(`%s`, cOccupant).replace(`%d`, cAvailability ? `left` : `joined`),
                Metadata: { Status: `occupant`, Occupant: cOccupant, Availability: cAvailability ? `left` : `joined` },
                Event: `onPresenceMessage`
            })
        }

        if (Stanza.is(`message`)) {
            const cValidate = ValidateStanza({ Stanza });
            const cSkippable = !cValidate || cValidate.Ignored
            if (cSkippable) { return; }
            await CreateStanza({ Stanza: JSON.parse(JSON.stringify(cValidate)) });
            await ProcessStanza({ Stanza: JSON.parse(JSON.stringify(cValidate)) });
            SetLog({
                Hidden: true,
                Message: Stanza,
                Metadata: { Status: `stanza`, From: cMsgFrom, Type: cMsgType },
                Event: `onStanzaMessage`
            })
        }
    }
}