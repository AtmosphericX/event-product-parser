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


export class UGCParser {
    
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
    public static async ugcExtractor(message: string): Promise<types.UGCEntry | null> {
        const header = this.getHeader(message);
        if (!header) return null;
        const zones = this.getZones(header);
        if (zones.length === 0) return null;
        const expiry = this.getExpiry(message);
        const locations = await this.getLocations(zones);
        return { 
            zones: zones, 
            locations: locations,
            expiry: expiry
        };
    }

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
    public static getHeader(message: string): string | null {
        const start = message.search(loader.definitions.regular_expressions.ugc1);
        const subMessage = message.substring(start);
        const end = subMessage.search(loader.definitions.regular_expressions.ugc2);
        const full = subMessage.substring(0, end).replace(/\s+/g, '').slice(0, -1);
        return full || null;
    }

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
    public static getExpiry(message: string): Date | null {
        const start = message.match(loader.definitions.regular_expressions.ugc3);
        const day = parseInt(start[0].substring(0, 2), 10);
        const hour = parseInt(start[0].substring(2, 4), 10);
        const minute = parseInt(start[0].substring(4, 6), 10);
        const now = new Date();
        const expires = new Date(now.getUTCFullYear(), now.getUTCMonth(), day, hour, minute, 0);
        return expires;
    }

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
    public static async getLocations(zones: string[]): Promise<string[]> {
        const uniqueZones = Array.from(new Set(zones.map(z => z.trim())));
        const placeholders = uniqueZones.map(() => '?').join(',');
        const rows = await loader.cache.db.prepare(
            `SELECT id, location FROM shapefiles WHERE id IN (${placeholders})`
        ).all(...uniqueZones);
        const locationMap = new Map<string, string>();
        for (const row of rows) { locationMap.set(row.id, row.location) }
        const locations = uniqueZones.map(id => locationMap.get(id) ?? id);
        return locations.sort();
    }

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
    public static getCoordinates(zones: string[], isUnion=true): any | null {
        const list = [...new Set(zones.map(z => z.trim()))].filter(z => z === 'XX000' ? false : true);
        if (list.length === 0) return null;
        const placeholders = list.map(() => "?").join(",");
        const rows = loader.cache.db
            .prepare(`SELECT geometry FROM shapefiles WHERE id IN (${placeholders})`)
            .all(...list);
        const polygons: any[] = [];
        for (const row of rows) {
            if (!row?.geometry) continue;
            const geom = JSON.parse(row.geometry);
            if (geom?.type === "Polygon") {
                polygons.push(geom.coordinates);
            }
        }
        if (polygons.length === 0) return null;
        if (isUnion) {
            const unionFn = loader.packages.polygonClipping.union as (...polys: any[]) => any;
            const mergedCoords = unionFn(...polygons);
            if (!mergedCoords || mergedCoords.length === 0) return null;
            let maxArea = -1;
            let bestPoly: any[] = [];
            for (const poly of mergedCoords) {
                const outerRing = poly[0];
                let area = 0;
                for (let i = 0; i < outerRing.length - 1; i++) {
                    const [x1, y1] = outerRing[i];
                    const [x2, y2] = outerRing[i + 1];
                    area += x1 * y2 - x2 * y1;
                }
                area = Math.abs(area / 2);
                if (area > maxArea) {
                    maxArea = area;
                    bestPoly = poly;
                }
            }
            if (!bestPoly || bestPoly.length === 0) return null;
            const outerRing = bestPoly[0];
            const skip = Math.max(1, parseInt(String(loader.settings.global_settings.shapefile_skip), 10) || 1);
            let skipped = outerRing.filter((_: any, idx: number) => idx % skip === 0);
            if (skipped.length < 4) {
                skipped = outerRing.slice();
            }
            const first = skipped[0];
            const last = skipped[skipped.length - 1];
            if (!first || !last || first[0] !== last[0] || first[1] !== last[1]) {
                skipped.push([first[0], first[1]]);
            }
            return skipped.length ? skipped : null;
        } else {
            const multi: any[] = [];
            for (const polyCoords of polygons) {
                if (Array.isArray(polyCoords) && Array.isArray(polyCoords[0])) {
                    multi.push(polyCoords);
                }
            }
            if (multi.length === 0) return null;
            const skip = Math.max(1, parseInt(String(loader.settings.global_settings.shapefile_skip), 10) || 1);
            if (skip > 1) {
                for (let p = 0; p < multi.length; p++) {
                    for (let r = 0; r < multi[p].length; r++) {
                        const ring = multi[p][r];
                        let reduced = ring.filter((_: any, i: number) => i % skip === 0);
                        if (reduced.length < 4) reduced = ring.slice();
                        const first = reduced[0];
                        const last = reduced[reduced.length - 1];
                        if ( first && last && (first[0] !== last[0] || first[1] !== last[1])) {
                            reduced.push([first[0], first[1]]);
                        }
                        multi[p][r] = reduced;
                    }
                }
            }
            return multi.length ? multi : null;
        }
    }

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
    public static getZones(header: string): string[] {
        const ugcSplit = header.split('-');
        const zones: string[] = [];
        let state = ugcSplit[0].substring(0, 2);
        const format = ugcSplit[0].substring(2, 3);
        for (const part of ugcSplit) {
            if (/^[A-Z]/.test(part)) {
                state = part.substring(0, 2);
                if (part.includes('>')) {
                    const [start, end] = part.split('>');
                    const startNum = parseInt(start.substring(3), 10);
                    const endNum = parseInt(end, 10);
                    for (let j = startNum; j <= endNum; j++) {
                        zones.push(`${state}${format}${j.toString().padStart(3, '0')}`);
                    }
                } else {
                    zones.push(part);
                }
                continue;
            }
            if (part.includes('>')) {
                const [start, end] = part.split('>');
                const startNum = parseInt(start, 10);
                const endNum = parseInt(end, 10);
                for (let j = startNum; j <= endNum; j++) {
                    zones.push(`${state}${format}${j.toString().padStart(3, '0')}`);
                }
            } else {
                zones.push(`${state}${format}${part}`);
            }
        }
        return zones.filter(item => item !== '');
    }
   
}

export default UGCParser;