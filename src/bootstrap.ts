/*
                                            _               _     __   __
         /\  | |                           | |             (_)    \ \ / /
        /  \ | |_ _ __ ___   ___  ___ _ __ | |__   ___ _ __ _  ___ \ V / 
       / /\ \| __| '_ ` _ \ / _ \/ __| '_ \| '_ \ / _ \ '__| |/ __| > <  
      / ____ \ |_| | | | | | (_) \__ \ |_) | | | |  __/ |  | | (__ / . \ 
     /_/    \_\__|_| |_| |_|\___/|___/ .__/|_| |_|\___|_|  |_|\___/_/ \_\
                                     | |                                 
                                     |_|                                                                                                                
    
    Written by: k3yomi@GitHub                        
*/

import * as fs from 'fs';
import * as path from 'path';
import * as events from 'events';
import * as xmpp from '@xmpp/client';
import * as shapefile from 'shapefile';
import * as xml2js from 'xml2js';
import * as jobs from 'croner';
import * as polygonClipping from 'polygon-clipping';
import sqlite3 from 'better-sqlite3';
import axios from 'axios';
import crypto from 'crypto';
import os from 'os';
import say from 'say';
import child from 'child_process';
import jszip from 'jszip';


import * as dictEvents from './@dictionaries/events';
import * as dictAwips from './@dictionaries/awips';
import * as dictSignatures from './@dictionaries/signatures';
import * as dictICAOs from './@dictionaries/icao';



export const packages = {
    fs, path, events, xmpp, 
    shapefile, xml2js, sqlite3, jobs, axios, 
    crypto, os, say, child, polygonClipping, jszip
};

export const cache = {
    isReady: true,
    sigHalt: false,
    isConnected: false,
    attemptingReconnect: false,
    totalReconnects: 0,
    lastStanza: null,
    session: null,
    lastConnect: null,
    db: null,
    lastWarn: null,
    totalLocationWarns: 0,
    events: new events.EventEmitter(),
    isProcessingAudioQueue: false,
    audioQueue: [],
};

export const settings = { 
    database: path.join(process.cwd(), 'shapefiles.db'),
    is_wire: true,
    journal: true,
    noaa_weather_wire_service_settings: {
        reconnection_settings: {
            enabled: true,
            interval: 60,
        },
        credentials: {
            username: null,
            password: null,
            nickname: "AtmosphericX Standalone Parser",
        },   
        cache: {
            enabled: true,
            max_db_history: 5000,
            max_db_cache_size: 1000,
        },
        preferences: {
            disable_ugc: false,
            disable_vtec: false,
            disable_text: false,
            cap_only: false,
        }
    },
    national_weather_service_settings: {
        interval: 15,
        endpoint: `https://api.weather.gov/alerts/active`,
    },
    global_settings: {
        parent_events_only: true,
        better_event_parsing: true,
        ignore_geometry_parsing: false,
        shapefile_coordinates: false,
        shapefile_skip: 15,
        filtering: {
            events: [],
            filtered_icao: [],
            ignored_icao: [],
            ignored_events: [`Xx`, `Test Message`],
            ugc_filter: [],
            state_filter: [],
            check_expired: true,
            ignore_test_products: true,
        },
        eas_settings: {
            directory: null,
            intro_wav: null,
        }
    }
};


export const definitions = {
    events: dictEvents.events,
    actions: dictEvents.actions,
    status: dictEvents.status,
    productTypes: dictEvents.types,
    correlations: dictEvents.status_correlations,
    offshore: dictEvents.offshore,
    awips: dictAwips.awips,
    causes: dictEvents.causes,
    records: dictEvents.records,
    severity: dictEvents.severity,
    cancelSignatures: dictSignatures.cancel_signatures,
    messageSignatures: dictSignatures.message_signatures,
    tags: dictSignatures.tags,
    ICAO: dictICAOs.icaos,
    enhancedEvents: [
        {"Tornado Warning": {
            "Tornado Emergency": { description: "tornado emergency", condition: (tornadoThreatTag: string) => tornadoThreatTag === 'OBSERVED'},
            "PDS Tornado Warning": { description: "particularly dangerous situation", condition: (damageThreatTag: string) => damageThreatTag === 'CONSIDERABLE'},
            "Confirmed Tornado Warning": { condition: (tornadoThreatTag: string) => tornadoThreatTag === 'OBSERVED'},
            "Radar Indicated Tornado Warning": {condition: (tornadoThreatTag: string) => tornadoThreatTag !== 'OBSERVED'},
        }},
        {"Special Marine Warning": {
            "Tornadic Special Marine Warning": {condition: (tornadoThreatTag: string) => tornadoThreatTag === 'POSSIBLE'},
        }},
        {"Tornado Watch": {
            "PDS Tornado Watch": { description: "particularly dangerous situation"}
        }},
        {"Flash Flood Warning": {
            "Flash Flood Emergency": { description: "flash flood emergency", },
            "Considerable Flash Flood Warning": { condition: (damageThreatTag: string) => damageThreatTag === 'CONSIDERABLE' },
        }},
        {"Severe Thunderstorm Warning": {
            "EDS Severe Thunderstorm Warning": {description: "extremely dangerous situation"},
            "Destructive Severe Thunderstorm Warning": {condition: (damageThreatTag: string) => damageThreatTag === 'DESTRUCTIVE'},
            "Considerable Severe Thunderstorm Warning": {condition: (damageThreatTag: string) => damageThreatTag === 'CONSIDERABLE'},
        }},
    ],
    shapefiles_directory: [
        {name: "us_counties", id: "C", link: "https://www.weather.gov/source/gis/Shapefiles/County/c_18mr25.zip"},
        {name: "us_states_territories", id: "Z", link: "https://www.weather.gov/source/gis/Shapefiles/County/s_18mr25.zip"},
        {name: "fire_weather_zones", id: "Z", link: "https://www.weather.gov/source/gis/Shapefiles/WSOM/fz18mr25.zip"},
        {name: "costal_marine_zones", id: "Z", link: "https://www.weather.gov/source/gis/Shapefiles/WSOM/mz18mr25.zip"},
        {name: "offshore_marine_zones", id: "Z", link: "https://www.weather.gov/source/gis/Shapefiles/WSOM/oz18mr25.zip"},
        {name: "public_forecast_zones", id: "Z", link: "https://www.weather.gov/source/gis/Shapefiles/WSOM/z_18mr25.zip"},
        {name: "county_warning_areas", id: "Z", link: "https://www.weather.gov/source/gis/Shapefiles/WSOM/w_18mr25.zip"},
        {name: "river_forecast_boundaries", id: "Z", link: "https://www.weather.gov/source/gis/Shapefiles/Misc/rf05mr24.zip"},
    ],
    regular_expressions: {
        pvtec: new RegExp(`[OTEX].(NEW|CON|EXT|EXA|EXB|UPG|CAN|EXP|COR|ROU).[A-Z]{4}.[A-Z]{2}.[WAYSFON].[0-9]{4}.[0-9]{6}T[0-9]{4}Z-[0-9]{6}T[0-9]{4}Z`, "g"),
        hvtec: new RegExp(`[a-zA-Z0-9]{4}.[A-Z0-9].[A-Z]{2}.[0-9]{6}T[0-9]{4}Z.[0-9]{6}T[0-9]{4}Z.[0-9]{6}T[0-9]{4}Z.[A-Z]{2}`, "imu"),
        wmo: new RegExp(`[A-Z0-9]{6}\\s[A-Z]{4}\\s\\d{6}`, "imu"),
        ugc1: new RegExp(`(\\w{2}[CZ](\\d{3}((-|>)\\s?(\\n\\n)?))+)`, "imu"),
        ugc2: new RegExp(`(\\d{6}(-|>)\\s?(\\n\\n)?)`, "imu"),
        ugc3: new RegExp(`(\\d{6})(?=-|$)`, "imu"),
        dateline: new RegExp(`\\d{3,4}\\s*(AM|PM)?\\s*[A-Z]{2,4}\\s+[A-Z]{3,}\\s+[A-Z]{3,}\\s+\\d{1,2}\\s+\\d{4}`, "gim"),
    },
    messages: {
        shapefile_creation: `DO NOT EXIT UNTIL THE SHAPEFILES ARE DONE COMPLETING! IF YOU CLOSE YOUR PROJECT, THE SHAPEFILES WILL NOT BE CREATED AND YOU WILL NEED TO DELETE ${settings.database} AND RESTART TO CREATE THEM AGAIN!`,
        shapefile_creation_finished: `Shapefiles have finished completing and you can now use the parser.`,
        not_ready: `You can not create another instance without shutting down the current one first, please make sure to call the stop() method first!`,
        invalid_nickname: `The nickname you provided is invalid, please provide a valid nickname to continue.`,
        eas_no_directory: `You have not set a directory for EAS audio files to be saved to, please set the 'directory' setting in the global settings to enable EAS audio generation.`,
        reconnect_too_fast: `The client is attempting to reconnect too fast. This may be due to network instability. Reconnection attempt has been halted for safety.`,
        dump_cache: `Found {count} cached events and will begin dumping them shortly. This may take a while depending on the number of cached events.`,
        dump_cache_complete: `Completed dumping all cached alert files.`,
    }
};