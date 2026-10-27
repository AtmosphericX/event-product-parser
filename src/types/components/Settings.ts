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

import { TYPE_TASK } from "Types.Components/Task"

type TYPE_TIMEZONES = string | "CST" | "CDT" | "MDT" | "MST" | "EST" | "EDT" | "HST" | "HDT" | "PDT" | "UTC"

export type TYPE_SETTINGS = {
    Timezone: TYPE_TIMEZONES
    Database: string
    DeveloperSettings: {
        ConsoleMessages: boolean
        DebugMessages: boolean
        DisableEvents: boolean
        DebugMinimumTime: number
    }
    WeatherWireService: boolean
    WeatherWireServiceSettings: {
        Credentials: { 
            Username: string | null
            Password: string | null
            Nickname: string | null
        }
        CacheControl: {
            Enabled: boolean
            MaxStanzas: number
            MaxStartupStanzas: number
        }
        ReconnectionPeriod: number
    }
    Integrations: {
        Broadcastify: {
            Attachments: boolean
            FilteredTags: string[]
            Download: string
        }
        GIS: {
            ConusDownload: string
            PopulationDownload: string
        },
        NTFY: {
            Enabled: boolean
            DefaultServer: string
            MediaDirectories: { 
                Audio: string | null
                Products: string | null
                GeoJSON: string | null
                Graphics: string | null
            }
            Credentials: {
                Username: string | null
                Password: string | null
            }
        }
    }
    Tasks: TYPE_TASK[]
    GlobalSettings: { 
        ProductGeometryParsing: boolean
        GeometryShapefileFallback: boolean
        CityPopulationAttachments: boolean
        Nodes: { 
            AlertNodeTTL: number
            NodeMaxDistance: number
            DefinedNodes: {
                Name: string
                Coordinates: {
                    Latitude: number
                    Longitude: number
                }
            }[]
        }
        AlertFiltering: {
            ListeningEvents: string[]
            ListeningOffice: string[]
            ListeningFIPS: string[]
            ListeningStates: string[]
            IgnoredOffice: string[]
            IgnoredFIPS: string[]
            TestProducts: boolean
            Nodes: boolean
        }
        Themes: { Event: string; RGB: string }[]
        Generation: {
            FileTTL: number
            Graphics: string
            GeoJSON: string
            Audio: string
            Products: string
            GraphicGeneration: {
                Logo: string | null
                MaxWidth: number
                MaxHeight: number
            }
            AudioGeneration: {
                Toneout: string | null
            }
        }
    }
}