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

import { Bootstrap } from "@Bootstrap"

type TYPE_STRINGS = {
    DEFAULT_PREFIX: string
    DEBUG_PREFIX: string
    ERROR_PREFIX: string
    CALLBACKS: {
        SETTINGS_INVALID_KEY: string
        HTTP_REQUEST_FAILED: string
    }
    DATABASE: {
        CREATED: string
        CONNECTED: string
        QUERY_FAILED: string
        BUILDING: string
        BUILD_COMPLETE: string
        SHAPEFILE_BUILD: string
        POPULATION_BUILD: string
        CONUS_BUILD: string
        BROADCASTIFY_BUILD: string
    }
    SERVICE: {
        ERROR_OCCURED: string
        ALREADY_STARTED: string
        RECONNECTING: string
        DISCONNECTED: string
        CONNECTED: string
        OCCUPANT: string
        RECONNECT_INTERVAL_SMALL: string
        NOT_STARTED: string
    }
    DB_STRINGS?: {
        CREATE: {
            STANZA: string
            SHAPEFILE: string
            CONUS: string
            POPULATION: string
            BROADCASTIFY: string
            ACTIVE: string
            ACTIVE_INDEX: string
            SHAPEFILE_INDEX: string
        }
        IMPORTS: {
            SHAPEFILE: string
            POPULATION: string
            BROADCASTIFY: string
            CONUS: string
            STANZA: string
        }
        EXISTS: {
            STANZA: string
            SHAPEFILE: string
            CONUS: string
            POPULATION: string
            ACTIVE: string
            BROADCASTIFY: string
        }
        COUNTS: {
            STANZA: string
            SHAPEFILE: string
            CONUS: string
            POPULATION: string
            ACTIVE: string
            BROADCASTIFY: string
        }
        DELETE: {
            STANZA_ALL: string
            STANZA_OLD: string
        }
        QUERIES: {
            ZONE_LOOKUP: string
            LOCATION_LOOKUP: string
            BROADCASTIFY_LOOKUP: string
        }
    }
}

export const ENUM_STRINGS: TYPE_STRINGS = {
    DEFAULT_PREFIX: `${Bootstrap.Colors.Yellow}@atmosx/event-product-parser-${Bootstrap.Version}${Bootstrap.Colors.Reset}`,
    DEBUG_PREFIX: `${Bootstrap.Colors.Cyan}Debug${Bootstrap.Colors.Reset}`,
    ERROR_PREFIX: `${Bootstrap.Colors.Red}Error${Bootstrap.Colors.Reset}`,
    CALLBACKS: {
        SETTINGS_INVALID_KEY: `This configuration '%s' ${Bootstrap.Colors.Red}DOES NOT${Bootstrap.Colors.Reset} exist. Please check the documentation for valid configuration options.`,
        HTTP_REQUEST_FAILED: `HTTP Request Failed`,
    },
    DATABASE: {
        CREATED: `No database found, creating a new database at the specified path.`,
        CONNECTED: `Successfully connected to local database (SQlite3)`,
        QUERY_FAILED: `Database query failed, please check the database schema and ensure that the query is valid.`,
        BUILDING: `The required database tables are missing, the parsing is currently rebuilding them and this may take a few seconds. Please ${Bootstrap.Colors.Red}DO NOT${Bootstrap.Colors.Reset} exit the parser while this is happening.`,
        BUILD_COMPLETE: `Database building complete. The required tables have been successfully created and populated. You can now continue using the parser.`,
        SHAPEFILE_BUILD: `Building 'shapefiles' database table with %s and %d features.`,
        POPULATION_BUILD: `Building 'population' database table with %s cities.`,
        CONUS_BUILD: `Building 'conus' database table with %s states and %d counties.`,
        BROADCASTIFY_BUILD: `Building 'broadcastify' database table with %s counties from %d.`,
    },
    SERVICE: {
        ERROR_OCCURED: `An uncaught exception occured, please report this issue to the development team via GitHub (https://github.com/AtmosphericX/event-product-parser/issues)`,
        ALREADY_STARTED: `The service has already been started, Please stop the service before attempting to start it again. (See documentation)`,
        CONNECTED: `Successfully connected to NOAA Weather Wire Service as '%s'`,
        DISCONNECTED: `Server not reachable, incorrect credentials, or networking error from NOAA Weather Wire Service, reconnecting in 5 seconds.`,
        OCCUPANT: `Occupant '%s' has %d the room`,
        RECONNECTING: `Attempting to reconnect (Reconnect attempts: %s)`,
        RECONNECT_INTERVAL_SMALL: `The reconnection interval is set to %s seconds, which is below the recommended minimum of 15 seconds. Please increase the reconnection interval to avoid potential issues.`,
        NOT_STARTED: `The service has not been started, Please start the service before attempting to stop it. (See documentation)`,
    },
    DB_STRINGS: {
        CREATE: {
            SHAPEFILE: `CREATE TABLE IF NOT EXISTS Shapefiles (ID, Location TEXT, Source TEXT, Geometry TEXT )`,
            CONUS: `CREATE TABLE IF NOT EXISTS Conus (ID TEXT PRIMARY KEY, Type TEXT NOT NULL, State TEXT, Name TEXT, Geometry TEXT NOT NULL)`,
            POPULATION: `CREATE TABLE IF NOT EXISTS Population (ID TEXT PRIMARY KEY, Name TEXT, State TEXT, County TEXT, Population TEXT, Latitude REAL NOT NULL, Longitude REAL NOT NULL)`,
            BROADCASTIFY: `CREATE TABLE IF NOT EXISTS BroadcastifyFeeds (State TEXT, County TEXT, Feed TEXT, Type TEXT, Link TEXT)`,
            STANZA: `CREATE TABLE IF NOT EXISTS Stanzas (ID INTEGER PRIMARY KEY AUTOINCREMENT, Product TEXT, Issuance TEXT, Stanza TEXT)`,
            ACTIVE: `CREATE TABLE IF NOT EXISTS Active (Tracking TEXT PRIMARY KEY, Event TEXT, GeoJSON TEXT, Geometry TEXT, Hashes TEXT, Issued TIMESTAMP, Expires TIMESTAMP, Updated TIMESTAMP)`,
            ACTIVE_INDEX: `CREATE INDEX IF NOT EXISTS IDX_ACTIVE_EVENTS_TRACKING ON Active (Tracking)`,
            SHAPEFILE_INDEX: `CREATE INDEX IF NOT EXISTS IDX_SHAPEFILES_ID ON Shapefiles (ID)`
        },
        IMPORTS: {
            SHAPEFILE: `INSERT INTO Shapefiles (ID, Location, Source, Geometry) VALUES (?, ?, ?, ?)`,
            POPULATION: `INSERT INTO Population (ID, Name, State, County, Population, Latitude, Longitude) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            CONUS: `INSERT INTO Conus (ID, Type, State, Name, Geometry) VALUES (?, ?, ?, ?, ?)`,
            BROADCASTIFY: `INSERT INTO BroadcastifyFeeds (State, County, Feed, Type, Link) VALUES (?, ?, ?, ?, ?)`,
            STANZA: `INSERT INTO Stanzas (Product, Issuance, Stanza) VALUES (?, ?, ?)`,
        },
        EXISTS: {
            STANZA: `SELECT name FROM sqlite_master WHERE type='table' AND name='Stanzas';`,
            SHAPEFILE: `SELECT name FROM sqlite_master WHERE type='table' AND name='Shapefiles';`,
            CONUS: `SELECT name FROM sqlite_master WHERE type='table' AND name='Conus';`,
            POPULATION: `SELECT name FROM sqlite_master WHERE type='table' AND name='Population';`,
            ACTIVE: `SELECT name FROM sqlite_master WHERE type='table' AND name='Active';`,
            BROADCASTIFY: `SELECT name FROM sqlite_master WHERE type='table' AND name='BroadcastifyFeeds';`
        },
        COUNTS: {
            STANZA: `SELECT COUNT(*) AS count FROM Stanzas`,
            SHAPEFILE: `SELECT COUNT(*) AS count FROM Shapefiles`,
            CONUS: `SELECT COUNT(*) AS count FROM Conus`,
            POPULATION: `SELECT COUNT(*) AS count FROM Population`,
            ACTIVE: `SELECT COUNT(*) AS count FROM Active`,
            BROADCASTIFY: `SELECT COUNT(*) AS count FROM BroadcastifyFeeds`,
        },
        DELETE: {
            STANZA_ALL: `DELETE FROM Stanzas`,
            STANZA_OLD: `DELETE FROM stanzas WHERE id IN (SELECT id FROM stanzas ORDER BY Issuance ASC LIMIT ?)`
        },
        QUERIES: {
            ZONE_LOOKUP: `SELECT Geometry FROM Shapefiles WHERE ID IN (%s)`,
            LOCATION_LOOKUP: `SELECT ID, Location FROM Shapefiles WHERE ID IN (%s)`,
            BROADCASTIFY_LOOKUP: `SELECT * FROM BroadcastifyFeeds WHERE State = ? AND County = ?`
        }
    }
}