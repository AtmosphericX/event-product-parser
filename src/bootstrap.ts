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

import { TYPE_SETTINGS } from "Types/components/Settings"
import { TYPE_EVENT } from "Types/event/Event"
import { ENUM_THEMES } from "@Enums/properties/Themes"
import { client } from "@xmpp/client"
import { Database } from "better-sqlite3"
import { EventEmitter } from "node:events"
import { join } from "node:path"

export const Bootstrap = {
    Version: `b3.1-04`,
    ServiceReady: false,
    Listener: new EventEmitter(),
    Scheduler: null as unknown,
    Session: null as ReturnType<typeof client> | null,
    Database: null as Database | null,
    Colors: {
        Red: `\x1b[31m`, Green: `\x1b[32m`, Yellow: `\x1b[33m`,
        Blue: `\x1b[34m`, Magenta: `\x1b[35m`, Cyan: `\x1b[36m`,
        White: `\x1b[37m`, Reset: `\x1b[0m`
    },
    CacheControl: {
        Limits: {} as Record<string, number[]>,
        Session: {
            Connected: false as boolean,
            HaultConnection: false as boolean,
            LastStanzaReported: Date.now() as number,
            Reconnecting: false as boolean,
            ReconnectAttempts: 0 as number,
        },
        Manager: {
            Cache: [] as TYPE_EVENT[],
            Zones: new Map<string, string[]>()
        }
    },
    Settings: {
        Timezone: `UTC`,
        Database: join(process.cwd(), `event-product-parser.db`),
        DeveloperSettings: {
            ConsoleMessages: true,
            DebugMessages: false,
            DisableEvents: false,
            DebugMinimumTime: 10.0,
        },
        WeatherWireService: false,
        WeatherWireServiceSettings: {
            Credentials: {
                Username: null,
                Password: null,
                Nickname: null,
            },
            CacheControl: {
                Enabled: false,
                MaxStanzas: 5000,
                MaxStartupStanzas: 125,
            },
            ReconnectionPeriod: 60,
        },
        Integrations: {
            Broadcastify: {
                Attachments: true,
                FilteredTags: [`Ham`, `Air`, `Fire`, `Public Safety`, `Weather`, `EMS`, `Police`, `Rail`],
                Download: `https://scriptkitty.cafe/ftp/@atmosphericx/assets/broadcastify.json`,
            },
            GIS: {
                ConusDownload: `https://scriptkitty.cafe/ftp/@atmosphericx/assets/counties-10m.json`,
                PopulationDownload: `https://scriptkitty.cafe/ftp/@atmosphericx/assets/cities500.json`
            },
            NTFY: {
                Enabled: false,
                DefaultServer: `https://ntfy.sh`,
                MediaDirectories: {
                    Audio: null,
                    Products: null,
                    GeoJSON: null,
                    Graphics: null,
                },
                Credentials: {
                    Username: null,
                    Password: null
                }
            }
        },
        Tasks: [],
        GlobalSettings: {
            ProductGeometryParsing: true,
            GeometryShapefileFallback: true,
            CityPopulationAttachments: true,
            Nodes: {
                AlertNodeTTL: 60,
                NodeMaxDistance: 100,
                DefinedNodes: [],
            },
            AlertFiltering: {
                ListeningEvents: [],
                ListeningOffice: [],
                ListeningFIPS: [],
                ListeningStates: [],
                IgnoredOffice: [],
                IgnoredFIPS: [],
                TestProducts: false,
                Nodes: false
            },
            Themes: ENUM_THEMES,
            Generation: {
                FileTTL: 60,
                Graphics: `bucket/graphics`,
                GeoJSON: `bucket/geojson`,
                Audio: `bucket/audio`,
                Products: `bucket/products`,
                GraphicGeneration: {
                    Logo: null,
                    MaxWidth: 1920,
                    MaxHeight: 1080,
                },
                AudioGeneration: {
                    Toneout: null
                }
            }
        }
    } as TYPE_SETTINGS
}



