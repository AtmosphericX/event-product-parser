interface LocalEasSettings {
    directory?: string;
    intro_wav?: string;
}
interface LocalAlertFilteringSettings {
    events?: string[];
    filtered_icao?: string[];
    ignored_icao?: string[];
    ugc_filter?: string[];
    state_filter?: string[];
    ignored_events?: string[];
    check_expired?: boolean;
}
interface LocalGlobalSettings {
    parent_events_only?: boolean;
    better_event_parsing?: boolean;
    shapefile_coordinates?: boolean;
    shapefile_skip?: number;
    eas_settings?: LocalEasSettings;
    filtering?: LocalAlertFilteringSettings;
}
interface LocalClientReconnectionSettings {
    enabled?: boolean;
    interval?: number;
}
interface LocalClientCredentialSettings {
    username?: string;
    password?: string;
    nickname?: string;
}
interface LocalCacheSettings {
    enabled?: boolean;
    max_db_history?: number;
    use_db_for_cache?: boolean;
    max_db_cache_size?: number;
}
interface LocalAlertPreferenceSettings {
    disable_ugc?: boolean;
    disable_vtec?: boolean;
    disable_text?: boolean;
    cap_only?: boolean;
}
interface LocalNoaaWeatherWireServiceSettings {
    reconnection_settings?: LocalClientReconnectionSettings;
    credentials?: LocalClientCredentialSettings;
    cache?: LocalCacheSettings;
    preferences?: LocalAlertPreferenceSettings;
}
interface LocalNationalWeatherServiceSettings {
    interval?: number;
    endpoint?: string;
}
interface ClientSettingsTypes {
    database?: string;
    is_wire?: boolean;
    journal?: boolean;
    noaa_weather_wire_service_settings?: LocalNoaaWeatherWireServiceSettings;
    national_weather_service_settings?: LocalNationalWeatherServiceSettings;
    global_settings?: LocalGlobalSettings;
}
interface LocalEventHistory {
    description?: string;
    issued?: string;
    type?: string;
}
interface LocalEventParameters {
    wmo?: string;
    source?: string;
    max_hail_size?: string;
    max_wind_gust?: string;
    damage_threat?: string;
    tornado_detection?: string;
    flood_detection?: string;
    discussion_tornado_intensity?: string;
    discussion_wind_intensity?: string;
    discussion_hail_intensity?: string;
    WMOidentifier?: string[];
    VTEC?: string;
    maxHailSize?: string;
    maxWindGust?: string;
    thunderstormDamageThreat?: string[];
    tornadoDetection?: string[];
    waterspoutDetection?: string[];
    floodDetection?: string[];
    AWIPSidentifier?: string[];
    NWSheadline?: string[];
}
interface LocalEventProperties {
    parent?: string;
    event?: string;
    locations?: string;
    issued?: string;
    expires?: string;
    geocode?: {
        UGC: string[];
        generated?: string | null;
    };
    description?: string;
    instruction?: string;
    sender_name?: string;
    sender_icao?: string;
    raw?: DefaultAttributesType;
    parameters?: LocalEventParameters;
    messageType?: string;
    sent?: string;
    areaDesc?: string;
    action_type?: string;
    is_updated?: boolean;
    is_cancelled?: boolean;
    is_issued?: boolean;
    is_test?: boolean;
    hash?: string;
    tags?: string[];
    details?: Record<string, any>;
}
interface StanzaAttributesType {
    xmlns?: string;
    id?: string;
    issue?: string;
    ttaaii?: string;
    cccc?: string;
    awipsid?: string;
}
interface DefaultAttributesType {
    attributes?: {
        xmlns?: string;
        id?: string;
        issue?: string;
        ttaaii?: string;
        cccc?: string;
        awipsid?: string;
    };
    getAwip?: Record<string, string>;
    awipsType?: Record<string, string>;
    isCap?: boolean;
    raw?: boolean;
}
interface StanzaCompiled {
    message?: string;
    attributes?: DefaultAttributesType;
    isCap?: boolean;
    isApi?: boolean;
    isCapDescription?: boolean;
    isPVtec?: boolean;
    isUGC?: boolean;
    getAwip?: Record<string, string>;
    awipsType?: Record<string, string>;
    awipsPrefix?: string;
    ignore?: boolean;
    awipsid?: string;
}
interface PVtecEntry {
    raw?: string;
    type?: string;
    tracking?: string;
    event?: string;
    status?: string;
    wmo?: string;
    expires?: Date | string;
    isKWNS?: boolean;
}
interface UGCEntry {
    zones?: string[];
    locations?: string[];
    expiry?: Date | string;
    polygon?: [number, number][];
}
interface HVtecEntry {
    severity?: string;
    cause?: string;
    record?: string;
    raw?: string;
}
interface geometry {
    type?: string;
    coordinates?: [number, number][];
}
interface EventCompiled {
    performance?: number;
    id?: string;
    tracking?: string;
    header?: string;
    pvtec?: string;
    hvtec?: string;
    history?: LocalEventHistory[];
    properties?: LocalEventProperties;
    geometry?: {
        type?: string;
        coordinates?: [number, number][];
    } | null;
}
type EventProperties = LocalEventProperties;
type StanzaAttributes = DefaultAttributesType;
type Coordinates = {
    lon: number;
    lat: number;
};
type HTTPSettings = {
    timeout?: number;
    headers?: Record<string, string>;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: string;
};
interface EnhancedEventCondition {
    description?: string;
    condition?: (value: string) => boolean;
}
interface GenericHTTPResponse {
    error?: boolean;
    message?: {
        features: Record<string, any>[];
    } | string;
}

type types_ClientSettingsTypes = ClientSettingsTypes;
type types_Coordinates = Coordinates;
type types_DefaultAttributesType = DefaultAttributesType;
type types_EnhancedEventCondition = EnhancedEventCondition;
type types_EventCompiled = EventCompiled;
type types_EventProperties = EventProperties;
type types_GenericHTTPResponse = GenericHTTPResponse;
type types_HTTPSettings = HTTPSettings;
type types_HVtecEntry = HVtecEntry;
type types_PVtecEntry = PVtecEntry;
type types_StanzaAttributes = StanzaAttributes;
type types_StanzaAttributesType = StanzaAttributesType;
type types_StanzaCompiled = StanzaCompiled;
type types_UGCEntry = UGCEntry;
type types_geometry = geometry;
declare namespace types {
  export type { types_ClientSettingsTypes as ClientSettingsTypes, types_Coordinates as Coordinates, types_DefaultAttributesType as DefaultAttributesType, types_EnhancedEventCondition as EnhancedEventCondition, types_EventCompiled as EventCompiled, types_EventProperties as EventProperties, types_GenericHTTPResponse as GenericHTTPResponse, types_HTTPSettings as HTTPSettings, types_HVtecEntry as HVtecEntry, types_PVtecEntry as PVtecEntry, types_StanzaAttributes as StanzaAttributes, types_StanzaAttributesType as StanzaAttributesType, types_StanzaCompiled as StanzaCompiled, types_UGCEntry as UGCEntry, types_geometry as geometry };
}

declare class Utils {
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
    static sleep(ms: number): Promise<void>;
    /**
     * @function warn
     * @description
     *     Emits a log event and prints a warning to the console. Throttles repeated
     *     warnings within a short interval unless `force` is `true`.
     *
     * @static
     * @param {string} message
     * @param {boolean} [force=false]
     * @returns {void}
     */
    static warn(message: string, force?: boolean): void;
    /**
     * @function loadCollectionCache
     * @description
     *      Loads cached stanzas from the database, validates them, and processes them through the event parser.
     *      Only processes stanzas that are not marked to be ignored and match the CAP preferences.
     *
     * @static
     * @async
     * @returns {Promise<void>}
     */
    static loadCollectionCache(): Promise<void>;
    /**
     * @function loadGeoJsonData
     * @description
     *     Fetches GeoJSON data from the National Weather Service endpoint and
     *     passes it to the event parser for processing.
     *
     * @static
     * @async
     * @returns {Promise<void>}
     */
    static loadGeoJsonData(): Promise<void>;
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
    static createHttpRequest<T = unknown>(url: string, options?: HTTPSettings): Promise<{
        error: boolean;
        message: T | string;
    }>;
    /**
     * @function handleCronJob
     * @description
     *     Performs scheduled tasks for NWWS XMPP session maintenance or GeoJSON data
     *     updates depending on the job type.
     *
     * @static
     * @param {boolean} isWire
     * @returns {void}
     */
    static handleCronJob(isWire: boolean): void;
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
    static mergeClientSettings(target: Record<string, unknown>, settings: ClientSettingsTypes): Record<string, unknown>;
}

declare class EAS {
    /**
     * @function generateEASAudio
     * @description
     *     Generates an EAS (Emergency Alert System) audio file for a given message
     *     and SAME/VTEC code. The audio is composed of optional intro tones, SAME
     *     headers, attention tones, TTS narration of the message, and repeated
     *     SAME headers. The resulting audio is processed for NWR-style broadcast
     *     quality and saved as a WAV file.
     *
     * @static
     * @async
     * @param {string} message
     * @param {string} header
     * @returns {Promise<string | null>}
     */
    static generateEASAudio(message: string, header: string): Promise<string | null>;
    /**
     * @function encodeWavPCM16
     * @description
     *     Encodes an array of 16-bit PCM samples into a standard WAV file buffer.
     *     Produces mono audio with 16 bits per sample and a specified sample rate.
     *
     *     The input `samples` array should be an array of objects containing a
     *     numeric `value` property representing the PCM sample.
     *
     * @private
     * @static
     * @param {Record<string, number>[]} samples
     * @param {number} [sampleRate=8000]
     * @returns {Buffer}
     */
    private static encodeWavPCM16;
    /**
     * @function parseWavPCM16
     * @description
     *     Parses a WAV buffer containing 16-bit PCM mono audio and extracts
     *     the sample data along with format information.
     *
     *     Only supports PCM format (audioFormat = 1), 16 bits per sample,
     *     and single-channel (mono) audio. Returns `null` if the buffer
     *     is invalid or does not meet these requirements.
     *
     * @private
     * @static
     * @param {Buffer} buffer
     * @returns { { samples: Int16Array; sampleRate: number; channels: number; bitsPerSample: number } | null }
     */
    private static parseWavPCM16;
    /**
     * @function concatPCM16
     * @description
     *     Concatenates multiple Int16Array PCM audio buffers into a single
     *     contiguous Int16Array.
     *
     * @private
     * @static
     * @param {Int16Array[]} arrays
     * @returns {Int16Array}
     */
    private static concatPCM16;
    /**
     * @function pcm16toFloat
     * @description
     *     Converts a PCM16 Int16Array audio buffer to a Float32Array
     *     with normalized values in the range [-1, 1).
     *
     * @private
     * @static
     * @param {Int16Array} int16
     * @returns {Float32Array}
     */
    private static pcm16toFloat;
    /**
     * @function floatToPcm16
     * @description
     *     Converts a Float32Array of audio samples in the range [-1, 1]
     *     to a PCM16 Int16Array.
     *
     * @private
     * @static
     * @param {Float32Array} float32
     * @returns {Int16Array}
     */
    private static floatToPcm16;
    /**
     * @function resamplePCM16
     * @description
     *     Resamples a PCM16 audio buffer from an original sample rate to a
     *     target sample rate using linear interpolation.
     *
     * @private
     * @static
     * @param {Int16Array} int16
     * @param {number} originalRate
     * @param {number} targetRate
     * @returns {Int16Array}
     */
    private static resamplePCM16;
    /**
     * @function generateSilence
     * @description
     *     Generates a PCM16 audio buffer containing silence for a specified
     *     duration.
     *
     * @private
     * @static
     * @param {number} ms
     * @param {number} [sampleRate=8000]
     * @returns {Int16Array}
     */
    private static generateSilence;
    /**
     * @function generateAttentionTone
     * @description
     *     Generates a dual-frequency Attention Tone (853 Hz and 960 Hz) used in
     *     EAS/SAME alerts. Produces a PCM16 buffer of the specified duration.
     *
     * @private
     * @static
     * @param {number} ms
     * @param {number} [sampleRate=8000]
     * @returns {Int16Array}
     */
    private static generateAttentionTone;
    /**
     * @function applyNWREffect
     * @description
     *     Applies a National Weather Radio (NWR)-style audio effect to a PCM16
     *     buffer, including high-pass and low-pass filtering, soft clipping
     *     compression, and optional bit reduction to simulate vintage broadcast
     *     characteristics.
     *
     * @private
     * @static
     * @param {Int16Array} int16
     * @param {number} [sampleRate=8000]
     * @returns {Int16Array}
     */
    private static applyNWREffect;
    /**
     * @function addNoise
     * @description
     *     Adds random noise to a PCM16 audio buffer and normalizes the signal
     *     to prevent clipping. Useful for simulating real-world signal conditions
     *     or reducing digital artifacts.
     *
     * @private
     * @static
     * @param {Int16Array} int16
     * @param {number} [noiseLevel=0.02]
     * @returns {Int16Array}
     */
    private static addNoise;
    /**
     * @function asciiTo8N1Bits
     * @description
     *     Converts an ASCII string into a sequence of bits using the 8N1 framing
     *     convention (1 start bit, 8 data bits, 2 stop bits) commonly used in
     *     serial and EAS transmissions.
     *
     * @private
     * @static
     * @param {string} str
     * @returns {number[]}
     */
    private static asciiTo8N1Bits;
    /**
     * @function generateAFSK
     * @description
     *     Converts a sequence of bits into AFSK-modulated PCM16 audio data for EAS
     *     alerts. Applies a fade-in and fade-out to reduce clicks and generates
     *     the audio at the specified sample rate.
     *
     * @private
     * @static
     * @param {number[]} bits
     * @param {number} [sampleRate=8000]
     * @returns {Int16Array}
     */
    private static generateAFSK;
    /**
     * @function generateSAMEHeader
     * @description
     *     Generates a SAME (Specific Area Message Encoding) audio header for
     *     EAS alerts. Converts a VTEC string into AFSK-modulated PCM16 audio,
     *     optionally repeating the signal with pre-mark and gap intervals.
     *
     * @private
     * @static
     * @param {string} vtec
     * @param {number} repeats
     * @param {number} [sampleRate=8000]
     * @param {{preMarkSec?: number, gapSec?: number}} [options={}]
     * @returns {Int16Array}
     */
    private static generateSAMEHeader;
}

declare class Database {
    /**
     * @function stanzaCacheImport
     * @description
     *     Inserts a single NWWS stanza into the database cache. If the total number
     *     of stanzas exceeds the configured maximum history, it deletes the oldest
     *     entries to maintain the limit. Duplicate stanzas are ignored.
     *
     * @static
     * @async
     * @param {string} stanza - The raw stanza XML or text to store in the database.
     * @returns {Promise<void>} - Resolves when the stanza has been inserted and any necessary pruning of old stanzas has been performed.
     */
    static stanzaCacheImport(stanza: Record<string, any>): Promise<void>;
    /**
     * @function loadDatabase
     * @description
     *     Initializes the application's SQLite database, creating necessary tables
     *     for storing stanzas and shapefiles. If the shapefiles table is empty,
     *     it imports predefined shapefiles from disk, processes their features,
     *     and populates the database. Emits warnings during the import process.
     *
     * @static
     * @async
     * @returns {Promise<void>} - Resolves when the database has been initialized and shapefiles have been imported if necessary.
     */
    static loadDatabase(): Promise<void>;
}

declare class StanzaParser {
    /**
     * @function validate
     * @description
     *     Validates and parses a stanza message, extracting its attributes and metadata.
     *     Handles both raw message strings (for debug/testing) and actual stanza objects.
     *     Determines whether the message is a CAP alert, contains VTEC codes, or contains UGCs,
     *     and identifies the AWIPS product type and prefix.
     *
     * @static
     * @param {any} stanza
     * @param {boolean | types.StanzaAttributes} [isDebug=false]
     * @returns {{
     *     message: string;
     *     attributes: types.StanzaAttributes;
     *     isCap: boolean,
     *     isPVtec: boolean;
     *     isCapDescription: boolean;
     *     awipsType: Record<string, string>;
     *     isApi: boolean;
     *     ignore: boolean;
     *     isUGC?: boolean;
     * }}
     */
    static validate(stanza: any, isDebug?: boolean | StanzaAttributes): {
        message: string;
        attributes: StanzaAttributes;
        isCap: any;
        isPVtec: boolean;
        isCapDescription: any;
        awipsType: any;
        isApi: boolean;
        ignore: boolean;
        isUGC?: boolean;
    };
    /**
     * @function getType
     * @description
     *     Determines the AWIPS product type and prefix from a stanza's attributes.
     *     Returns a default type of 'XX' if the attributes are missing or the AWIPS ID
     *     does not match any known definitions.
     *
     * @private
     * @static
     * @param {unknown} attributes
     * @returns {Record<string, string>}
     */
    private static getType;
}

declare class EventParser {
    /**
     * @function getBaseProperties
     * @description
     *     Extracts and compiles the core properties of a weather
     *     alert message into a structured object. Combines parsed
     *     textual data, UGC information, VTEC entries, and additional
     *     metadata for downstream use.
     *
     * @static
     * @async
     * @param {string} message
     * @param {types.StanzaCompiled} metadata
     * @param {types.UGCEntry} [ugc=null]
     * @param {types.PVtecEntry} [pVtec=null]
     * @param {types.HVtecEntry} [hVtec=null]
     * @returns {Promise<Record<string, any>>}
     */
    static getBaseProperties(message: string, metadata: DefaultAttributesType, ugc?: UGCEntry, pVtec?: PVtecEntry, hVtec?: HVtecEntry): Promise<Record<string, any>>;
    /**
     * @function getEventGeometry
     * @description
     *   Determines the geometry of an event using polygon data fromEntries
     *   in the message or UGC shapefile coordinates if enabled in settings. Falls
     *   back to null if no geometry can be determined.
     *
     * @static
     * @param {string} generated
     * @param {types.UGCEntry} [ugc=null]
     * @returns {Promise<types.geometry>}
     */
    static getEventGeometry(generated: string, ugc?: UGCEntry, isUnion?: boolean): Promise<geometry>;
    /**
     * @function betterParsedEventName
     * @description
     *     Enhances the parsing of an event name using additional criteria
     *     from its description and parameters. Can optionally use
     *     the original parent event name instead.
     *
     * @static
     * @param {types.EventCompiled} event
     * @param {boolean} [betterParsing=false]
     * @param {boolean} [useParentEvents=false]
     * @returns {string}
     */
    static betterParsedEventName(event: EventCompiled, betterParsing?: boolean, useParentEvents?: boolean): string;
    /**
     * @function validateEvents
     * @description
     *     Processes an array of event objects and filters them based on
     *     global and EAS filtering settings, and
     *     other criteria such as expired or test products. Valid events
     *     trigger relevant event emitters.
     *
     * @static
     * @param {unknown[]} events
     * @returns {Promise<void>}
     */
    static validateEvents(events: unknown[]): Promise<void>;
    /**
     * @function getHeader
     * @description
     *     Constructs a standardized alert header string using provided
     *     stanza attributes, event properties, and optional VTEC data.
     *
     * @static
     * @param {types.StanzaAttributes} attributes
     * @param {types.EventProperties} [properties]
     * @param {types.PVtecEntry} [pVtec]
     * @returns {string}
     */
    static getHeader(attributes: StanzaAttributes, properties?: EventProperties, pVtec?: PVtecEntry): string;
    /**
     * @function eventHandler
     * @description
     *     Routes a validated stanza object to the appropriate alert handler
     *     based on its type flags: API, CAP, pVTEC (Primary VTEC), UGC, or plain text.
     *
     * @static
     * @param {types.StanzaCompiled} metadata
     * @returns {void}
     */
    static eventHandler(metadata: StanzaCompiled): Promise<void>;
    /**
     * @function getICAO
     * @description
     *     Determines the ICAO code and corresponding name for an event.
     *     Priority is given to the VTEC tracking code, then the attributes' `cccc` property,
     *     and finally the WMO code if available. Returns null if none are found.
     *
     * @private
     * @static
     * @param {types.PVtecEntry | null} pVtec
     * @param {Record<string, string>} metadata
     * @param {RegExpMatchArray | string | null} WMO
     * @returns {{ icao: string; name: string }}
     */
    private static getICAO;
    /**
     * @function getCorrectIssuedDate
     * @description
     *     Determines the issued date for an event based on the provided attributes.
     *     Falls back to the current date and time if no valid issue date is available.
     *
     * @private
     * @static
     * @param {Record<string, string>} metadata
     * @returns {string}
     */
    private static getCorrectIssuedDate;
    /**
     * @function getCorrectExpiryDate
     * @description
     *     Determines the most appropriate expiry date for an event using VTEC or UGC data.
     *     Falls back to one hour from the current time if no valid expiry is available.
     *
     * @private
     * @static
     * @param {types.PVtecEntry} pVtec
     * @param {types.UGCEntry} ugc
     * @returns {string}
     */
    private static getCorrectExpiryDate;
    /**
     * @function buildDefaultSignature
     * @description
     *     Populates default properties for an event object, including action type flags,
     *     tags, and status updates. Determines if the event is issued, updated, or cancelled
     *     based on correlations, description content, VTEC codes, and expiration time.
     *
     * @private
     * @static
     * @param {any} event
     * @returns {types.EventCompiled}
     */
    private static buildDefaultSignature;
}

declare class TextParser {
    /**
     * @function textProductToString
     * @description
     *     Searches a text product message for a line containing a specific value,
     *     extracts the substring immediately following that value, and optionally
     *     removes additional specified strings. Cleans up the extracted string by
     *     trimming whitespace and removing any remaining occurrences of the search
     *     value or '<' characters.
     *
     * @static
     * @param {string} message
     * @param {string} value
     * @param {string[]} [removal=[]]
     * @returns {string | null}
     */
    static textProductToString(message: string, value: string, removal?: string[]): string | null;
    /**
     * @function textProductToPolygon
     * @description
     *     Parses a text product message to extract polygon coordinates based on
     *     LAT...LON data. Coordinates are converted to [latitude, longitude] pairs
     *     with longitude negated (assumes Western Hemisphere). If the polygon has
     *     more than two points, the first point is repeated at the end to close it.
     *
     * @static
     * @param {string} message
     * @returns {[number, number][]}
     */
    static textProductToPolygon(message: string): [number, number][];
    /**
     * @function textProductToDescription
     * @description
     *     Extracts a clean description portion from a text product message, optionally
     *     removing a handle and any extra metadata such as "STANZA ATTRIBUTES...".
     *     Also trims and normalizes whitespace.
     *
     * @static
     * @param {string} message
     * @param {string | null} [handle=null]
     * @returns {string}
     */
    static textProductToDescription(message: string, handle?: string): string;
    /**
     * @function getXmlValues
     * @description
     *     Recursively extracts specified values from a parsed XML-like object.
     *     Searches both object keys and array items for matching keys (case-insensitive)
     *     and returns the corresponding values. If multiple unique values are found for
     *     a key, an array is returned; if one value is found, it returns that value;
     *     if none are found, returns `null`.
     *
     * @static
     * @param {any} parsed
     * @param {string[]} valuesToExtract
     * @returns {Record<string, string | string[] | null>}
     */
    static getXmlValues(parsed: any, valuesToExtract: string[]): Record<string, string>;
}

declare class PVtecParser {
    /**
     * @function pVtecExtractor
     * @description
     *     Extracts VTEC entries from a raw NWWS message string and returns
     *     structured objects containing type, tracking, event, status,
     *     WMO identifiers, and expiry date.
     *
     * @static
     * @param {string} message
     * @returns {Promise<types.VtecEntry[] | null>}
     */
    static pVtecExtractor(message: string): Promise<PVtecEntry[] | null>;
    /**
     * @function parseExpiryDate
     * @description
     *     Converts a NWWS VTEC/expiry timestamp string into a formatted local ISO date string
     *     with an Eastern Time offset (-04:00). Returns `Invalid Date Format` if the input
     *     is `000000T0000Z`.
     *
     * @private
     * @static
     * @param {string[]} args
     * @returns {string}
     */
    private static parseExpiryDate;
}

declare class HVtecParser {
    /**
     * @function HVtecExtractor
     * @description
     *     Extracts VTEC entries from a raw NWWS message string and returns
     *     structured objects containing type, tracking, event, status,
     *     WMO identifiers, and expiry date.
     *
     * @static
     * @param {string} message
     * @returns {Promise<types.HtecEntry[] | null>}
     */
    static HVtecExtractor(message: string): Promise<HVtecEntry[] | null>;
}

declare class UGCParser {
    /**
     * @function ugcExtractor
     * @description
     *     Extracts UGC (Universal Geographic Code) information from a message.
     *     This includes parsing the header, resolving zones, calculating the expiry
     *     date, and retrieving associated location names from the database.
     *
     * @static
     * @async
     * @param {string} message
     * @returns {Promise<types.UGCEntry | null>}
     */
    static ugcExtractor(message: string): Promise<UGCEntry | null>;
    /**
     * @function getHeader
     * @description
     *     Extracts the UGC header from a message by locating patterns defined in
     *     `ugc1` and `ugc2` regular expressions. Removes all whitespace and the
     *     trailing character from the matched header.
     *
     * @static
     * @param {string} message
     * @returns {string | null}
     */
    static getHeader(message: string): string | null;
    /**
     * @function getExpiry
     * @description
     *     Extracts an expiration date from a message using the UGC3 format.
     *     The function parses day, hour, and minute from the message and constructs
     *     a Date object in the current month and year. Returns `null` if no valid
     *     expiration is found.
     *
     * @static
     * @param {string} message
     * @returns {Date | null}
     */
    static getExpiry(message: string): Date | null;
    /**
     * @function getLocations
     * @description
     *     Retrieves human-readable location names for an array of zone identifiers
     *     from the shapefiles database. If a zone is not found, the zone ID itself
     *     is returned. Duplicate locations are removed and the result is sorted.
     *
     * @static
     * @async
     * @param {string[]} zones
     * @returns {Promise<string[]>}
     */
    static getLocations(zones: string[]): Promise<string[]>;
    /**
     * @function getCoordinates
     * @description
     *     Calculates the outer boundary coordinates for a set of UGC zones by
     *     querying their geometries from the database, merging them, and extracting
     *     the largest outer ring. The coordinates are downsampled based on a skip
     *     setting to reduce complexity. Returns `null` if no valid coordinates are found.
     *
     * @static
     * @param {string[]} zones
     * @returns {[number, number][]}
     */
    static getCoordinates(zones: string[], isUnion?: boolean): any | null;
    /**
     * @function getZones
     * @description
     *     Parses a UGC header string and returns an array of individual zone
     *     identifiers. Handles ranges indicated with `>` and preserves the
     *     state and format prefixes.
     *
     * @static
     * @param {string} header
     * @returns {string[]}
     */
    static getZones(header: string): string[];
}

declare class Manager {
    isNoaaWeatherWireService: boolean;
    job: any;
    constructor(metadata: ClientSettingsTypes);
    /**
     * @function setDisplayName
     * @description
     *     Sets the display nickname for the NWWS XMPP session. Trims the provided
     *     name and validates it, emitting a warning if the name is empty or invalid.
     *
     * @param {string} [name]
     */
    setDisplayName(name?: string): void;
    /**
     * @function getEventPolygon
     * @description
     *    Retrieves the geographical polygon for a given event based on its
     *    generated geocode and UGC zones.
     *
     * @async
     * @param {types.EventCompiled} event
     * @returns {Promise<types.geometry | null>}
     */
    getEventPolygon(event: EventCompiled, isUnion?: boolean): Promise<geometry | null>;
    /**
     * @function createEasAudio
     * @description
     *     Generates an EAS (Emergency Alert System) audio file using the provided
     *     description and header.
     *
     * @async
     * @param {string} description
     * @param {string} header
     * @returns {Promise<string>}
     */
    createEasAudio(description: string, header: string): Promise<string>;
    /**
     * @function getAllAlertTypes
     * @description
     *     Generates a list of all possible alert types by combining defined
     *     event names with action names.
     *
     * @returns {string[]}
     */
    getAllAlertTypes(): string[];
    /**
     * @function searchStanzaDatabase
     * @description
     *     Searches the stanza database for entries containing the specified query.
     *     Escapes SQL wildcard characters and returns results in descending order
     *     by ID, up to the specified limit.
     *
     * @async
     * @param {string} query
     * @param {number} [limit=250]
     * @returns {Promise<string[]>}
     */
    searchStanzaDatabase(query: string, limit?: number): Promise<string[]>;
    /**
     * @function setSettings
     * @description
     *     Merges the provided client settings into the current configuration,
     *     preserving nested structures.
     *
     * @async
     * @param {types.ClientSettingsTypes} settings
     * @returns {Promise<void>}
     */
    setSettings(settings: ClientSettingsTypes): Promise<void>;
    /**
     * @function on
     * @description
     *     Registers a callback for a specific event and returns a function
     *     to unregister the listener.
     *
     * @param {string} event
     * @param {(...args: any[]) => void} callback
     * @returns {() => void}
     */
    on(event: string, callback: (...args: any[]) => void): () => void;
    /**
     * @function start
     * @description
     *     Initializes the client with the provided settings, starts the NWWS XMPP
     *     session if applicable, loads cached messages, and sets up scheduled
     *     tasks (cron jobs) for ongoing processing.
     *
     * @async
     * @param {types.ClientSettingsTypes} metadata
     * @returns {Promise<void>}
     */
    start(metadata: ClientSettingsTypes): Promise<void>;
    /**
     * @function stop
     * @description
     *     Stops active scheduled tasks (cron job) and, if connected, the NWWS
     *     XMPP session. Updates relevant cache flags to indicate the session
     *     is no longer active.
     *
     * @async
     * @returns {Promise<void>}
     */
    stop(): Promise<void>;
}

export { Database, EAS, EventParser, HVtecParser, Manager, PVtecParser, StanzaParser, TextParser, UGCParser, Utils, Manager as default, types };
