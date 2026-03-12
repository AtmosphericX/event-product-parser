/*
                                            _               _     __   __
         /\  | |                           | |             (_)    \ \ / /
        /  \ | |_ _ __ ___   ___  ___ _ __ | |__   ___ _ __ _  ___ \ V / 
       / /\ \| __| "_ ` _ \ / _ \/ __| "_ \| "_ \ / _ \ "__| |/ __| > <  
      / ____ \ |_| | | | | | (_) \__ \ |_) | | | |  __/ |  | | (__ / . \ 
     /_/    \_\__|_| |_| |_|\___/|___/ .__/|_| |_|\___|_|  |_|\___/_/ \_\
                                     | |                                 
                                     |_|                                                                                                                
    
    Written by: KiyoWx (k3yomi)                
*/

import * as loader from '../bootstrap';
import * as types from '../types';
import StanzaParser from '../@parsers/stanza';
import EventParser from '../@parsers/events';
import Xmpp from './xmpp';

export class Utils { 
    
    /**
     * @function sleep
     * @description
     *     Pauses execution for a specified number of milliseconds.
     *
     * @static
     * @async
     * @param {number} ms
     * @returns {Promise<void>}
     */
    public static async sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * @function warn
     * @description
     *     Emits a log event and prints a warning to the console. Throttles repeated
     *     warnings within a short interval unless `force` is `true`.
     *
     * @static
     * @param {string} message
     * @param {boolean} [force=false]
     */
    public static warn(message: string, force: boolean = false) {
        loader.cache.events.emit('log', message)
        if (!loader.settings.journal) return;
        if (loader.cache.lastWarn != null && (Date.now() - loader.cache.lastWarn < 500) && !force) return;
        loader.cache.lastWarn = Date.now();
        console.warn(`\x1b[33m[ATMOSX-PARSER]\x1b[0m [${new Date().toLocaleString()}] ${message}`);
    }

    /**
     * @function loadCollectionCache
     * @description
     *      Loads cached stanzas from the database, validates them, and processes them through the event parser. 
     *      Only processes stanzas that are not marked to be ignored and match the CAP preferences.
     *     
     * @static
     * @async
     */
    public static async loadCollectionCache() {
        try {
            const settings = loader.settings as types.ClientSettingsTypes;
            if (settings.noaa_weather_wire_service_settings.cache.enabled) {
                const maxRows = settings.noaa_weather_wire_service_settings.cache.max_db_cache_size ?? 5000;
                const rows = await loader.cache.db.prepare(`SELECT * FROM stanzas ORDER BY rowid DESC LIMIT ?`)
                    .all(maxRows) as { rowid: number; stanza: string }[];
                this.warn(loader.definitions.messages.dump_cache.replace(`{count}`, rows.length.toString()), true);
                const eventsToProcess = rows
                    .map(row => {return JSON.parse(row.stanza)})
                    .filter(validate => {
                        if (!validate) return false;
                        const skip = validate.ignore ||
                            (validate.isCap && !settings.noaa_weather_wire_service_settings.preferences.cap_only) ||
                            (!validate.isCap && settings.noaa_weather_wire_service_settings.preferences.cap_only) ||
                            (validate.isCap && !validate.isCapDescription);
                        return !skip;
                    });
                await Promise.all(eventsToProcess.map(validate => EventParser.eventHandler(validate)));
                this.warn(loader.definitions.messages.dump_cache_complete, true);
                return;
            }
        } catch (error: any) {
            Utils.warn(`Failed to load cache: ${error.stack}`);
        }
    }

    /**
     * @function loadGeoJsonData
     * @description
     *     Fetches GeoJSON data from the National Weather Service endpoint and
     *     passes it to the event parser for processing.
     *
     * @static
     * @async
     */
    public static async loadGeoJsonData() {
        try {
            const settings = loader.settings as types.ClientSettingsTypes;
            const response = await this.createHttpRequest<types.GenericHTTPResponse >(
                settings.national_weather_service_settings.endpoint
            );
            if (response.error) return;
            EventParser.eventHandler({
                message: JSON.stringify(response.message),
                attributes: {},
                isCap: true,
                isApi: true,
                isPVtec: false,
                isUGC: false,
                isCapDescription: false,
                awipsType: { type: 'api', prefix: 'AP' },
                ignore: false
            });
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : String(error);
            Utils.warn(`Failed to load National Weather Service GeoJSON Data: ${msg}`);
        }
    }

    /**
     * @function createHttpRequest
     * @description
     *     Performs an HTTP GET request with default headers and timeout, returning
     *     either the response data or an error message.
     *
     * @static
     * @template T
     * @param {string} url
     * @param {types.HTTPSettings} [options]
     * @returns {Promise<{ error: boolean; message: T | string }>}
     */
    public static async createHttpRequest<T = unknown>(url: string, options?: types.HTTPSettings): Promise<{ error: boolean; message: T | string }> {
        const defaultOptions = { 
            timeout: 10000,
            headers: { 
                "User-Agent": "AtmosphericX",
                "Accept": "application/geo+json, text/plain, */*; q=0.9",
                "Accept-Language": "en-US,en;q=0.9"
            }
        };
        const requestOptions = {
            ...defaultOptions,
            ...options,
            headers: { ...defaultOptions.headers, ...(options?.headers ?? {}) }
        };
        try {
            const resp = await loader.packages.axios.get<T>(url, {
                headers: requestOptions.headers,
                timeout: requestOptions.timeout,
                maxRedirects: 0,
                validateStatus: (status) => status === 200 || status === 500
            });
            return { error: false, message: resp.data };
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            return { error: true, message: msg };
        }
    }

    /**
     * @function handleCronJob
     * @description
     *     Performs scheduled tasks for NWWS XMPP session maintenance or GeoJSON data
     *     updates depending on the job type.
     *
     * @static
     * @param {boolean} isWire
     */
    public static handleCronJob(isWire: boolean) {
        try {
            const settings = loader.settings as types.ClientSettingsTypes;
            const cache = settings.noaa_weather_wire_service_settings.cache;
            const reconnections = settings.noaa_weather_wire_service_settings.reconnection_settings;
            if (isWire) {
                if (reconnections.enabled) {
                    void Xmpp.isSessionReconnectionEligible(reconnections.interval);
                }
            } else {
                void this.loadGeoJsonData();
            }
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : String(error);
            Utils.warn(`Failed to perform scheduled tasks (${isWire ? 'NWWS' : 'GeoJSON'}): ${msg}`);
        }
    }

    /**
     * @function mergeClientSettings
     * @description
     *     Recursively merges a ClientSettings object into a target object,
     *     preserving nested structures and overriding existing values.
     *
     * @static
     * @param {Record<string, unknown>} target
     * @param {types.ClientSettingsTypes} settings
     * @returns {Record<string, unknown>}
     */
    public static mergeClientSettings(target: Record<string, unknown>, settings: types.ClientSettingsTypes): Record<string, unknown> {
        for (const key in settings) {
            if (!Object.prototype.hasOwnProperty.call(settings, key)) continue;
            const value = settings[key];
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                if (!target[key] || typeof target[key] !== 'object' || Array.isArray(target[key])) {
                    target[key] = {};
                }
                this.mergeClientSettings(target[key] as Record<string, unknown>, value as types.ClientSettingsTypes);
            } else {
                target[key] = value;
            }
        }
        return target;
    }
}

export default Utils;