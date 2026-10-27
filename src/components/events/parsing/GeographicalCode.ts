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

import { TYPE_UGC } from "Types.Components/UniversalGeographicCode"
import { ENUM_STRINGS } from "@Enums/Strings";
import { ENUM_REGULAR_EXPRESSIONS } from "@Enums/RegularExpressions";
import { Bootstrap } from "@Bootstrap";
import { ConstructClassTimer } from "@Components.Utilities/ConstructClassTimer";
import { CreateQuery } from "@Components.Database/CreateQuery";
import { GetUnionedPolygon } from "@Components.Geometry/GetUnionedPolygon";
import { createHash } from "node:crypto";

interface GET_OPTIONS { 
    Message?: string 
}

interface GET_POLYGON_OPTIONS { 
    Zones: string[]
    Union: boolean 
}

interface GET_HEADER_OPTIONS { 
    Header: string 
}

interface GET_ZONES_OPTIONS { 
    Zones: string[] 
}

interface CACHED_ZONE_OPTIONS { 
    Zone: string
    Location: string[] 
}

interface GET_LOCATION_METADATA_OPTIONS {
    Zones: string[],
    UGC?: TYPE_UGC
}

interface GET_LOCATION_METADATA_RESPONSE { 
    locations: string[]
    states: string[]
}

interface GET_POLYGON_RESPONSE { 
    type: `Polygon` | `MultiPolygon`
    coordinates: number[][][] | number[][][][] 
}

type TYPE_ROW = { ID: string, Location: string, Geometry: string }

export class GeographicalCodeParsing { 
    private pMessage: string;

    public constructor({ Message }: GET_OPTIONS) {
        this.pMessage = Message;
        return this;
    }

    @ConstructClassTimer
    public GetReferences(): TYPE_UGC | null {
        if (!this.pMessage) return null;
        const cExpires = this.GetExpiry({ Message: this.pMessage });
        const cHeader = this.GetHeader({ Message: this.pMessage });
        const cZones = this.GetZones({ Header: cHeader ?? `` });
        const cLocations = this.GetZoneLocations({ Zones: cZones ?? [] });
        if (!cHeader || cZones?.length == 0) return null;
        return {
            Zones: cZones,
            Locations: cLocations,
            Expires: cExpires
        }
    }

    @ConstructClassTimer
    public GetZoneLocations({ Zones }: GET_ZONES_OPTIONS): string[] | null {
        const cUnique = Array.from(new Set(Zones));
        const cDiscoveredZones: string[] = [];
        const cMissingZones: string[] = [];
        for (const cZone of cUnique) {
            const cCached = this.GetCachedZone({ Zone: cZone, Location: [] })
            if (cCached) { cCached.forEach((lLocation) => cDiscoveredZones.push(lLocation)) } 
            if (!cCached) { cMissingZones.push(cZone); }
        }
        if (cMissingZones.length > 0) { 
            const cRows = CreateQuery({
                Query: ENUM_STRINGS.DB_STRINGS.QUERIES.LOCATION_LOOKUP.replace(/%s/, cMissingZones.map(() => `?`).join(`,`)),
                Parameters: cMissingZones
            }) as TYPE_ROW[];
            cRows.forEach((cRow) => {
                cDiscoveredZones.push(cRow.Location); 
                this.SetCachedZone({ Zone: cRow.ID, Location: [cRow.Location] });
            });
        }
        return Array.from(new Set(cDiscoveredZones));
    }

    @ConstructClassTimer
    public GetZones({ Header }: GET_HEADER_OPTIONS): string[] | null {
        const cZones: string[] = [];
        const [cFirstPart, ...cParts] = Header.split('-');
        let lState = cFirstPart.substring(0, 2);
        let lFormat = cFirstPart.substring(2, 3);
        const cFirstZone = cFirstPart.substring(3);
        const cAddZones = (cStart: string, cEnd?: string): void => {
            const cStartNumber = Number(cStart);
            const cEndNumber = Number(cEnd ?? cStart);
            if (!Number.isInteger(cStartNumber) || !Number.isInteger(cEndNumber)) return;
            for (let i = cStartNumber; i <= cEndNumber; i++) {
                cZones.push(`${lState}${lFormat}${String(i).padStart(3, '0')}`);
            }
        };
        const [cFirstStart, cFirstEnd] = cFirstZone.split('>');
        if (cFirstStart) cAddZones(cFirstStart, cFirstEnd);
        for (const cPart of cParts) {
            const cHasState = /^[A-Z]{2}[A-Z]/.test(cPart);
            const cCleanPart = cHasState ? (lState = cPart.substring(0, 2), lFormat = cPart.substring(2, 3), cPart.substring(3)) : cPart;
            if (cCleanPart.includes('>')) {
                const [cStart, cEnd] = cCleanPart.split('>').map(Number);
                cAddZones(String(cStart), String(cEnd));
            } else {
                const cDigits = cCleanPart.replace(/^\D+/, '');
                cZones.push(cDigits === cCleanPart ? `${lState}${lFormat}${cCleanPart.padStart(3, '0')}` : cPart);
            }
        }
        return Array.from(new Set(cZones));
    }

    @ConstructClassTimer
    public GetHeader({ Message }: GET_OPTIONS): string | null {
        const cStart = Message.search(ENUM_REGULAR_EXPRESSIONS.UGC_PT1);
        const cSub = Message.substring(cStart);
        const cEnd = cSub.search(ENUM_REGULAR_EXPRESSIONS.UGC_PT2);
        const cFinal = cSub.substring(0, cEnd)
            .replace(/\s+/g, '')
            .slice(0, -1);
        return cFinal ?? null;
    }

    @ConstructClassTimer
    public GetExpiry({ Message }: GET_OPTIONS): Date | null {
        const cRegex = Message.match(ENUM_REGULAR_EXPRESSIONS.UGC_PT3);
        if (!cRegex) return null;
        const [, cExpiry] = cRegex;
        const cTimestamp = new Date();
        const cDay = Number(cExpiry.slice(0, 2));
        const dHour = Number(cExpiry.slice(2, 4));
        const cMinute = Number(cExpiry.slice(4, 6));
        const cExpires = new Date(Date.UTC(cTimestamp.getUTCFullYear(), cTimestamp.getUTCMonth(), cDay, dHour, cMinute));
        return cExpires;
    }

    @ConstructClassTimer
    public SetCachedZone({ Zone, Location }: CACHED_ZONE_OPTIONS): void {
        const { Zones } = Bootstrap.CacheControl.Manager;
        if (Zones.size >= 5000) { 
            const cFirstKey = Zones.keys().next().value;
            Bootstrap.CacheControl.Manager.Zones.delete(cFirstKey);
        }
        Bootstrap.CacheControl.Manager.Zones.set(Zone, Location);
    }

    @ConstructClassTimer
    public GetCachedZone({ Zone }: CACHED_ZONE_OPTIONS): string[] { 
        const { Zones } = Bootstrap.CacheControl.Manager;
        return Zones.get(Zone)
    }

    @ConstructClassTimer
    public GetPolygon({ Zones, Union }: GET_POLYGON_OPTIONS): GET_POLYGON_RESPONSE | null {
        const cPolygons: number[][][][] = [];
        const cGeometryHashes: Set<string> = new Set();
        const cUnique = [...new Set(Zones.map(z => z.trim()))]
            .filter(z => z === 'XX000' ? false : true);
        const cPlaceholders = cUnique.map(() => `?`).join(`,`);
        const cRows = CreateQuery({
            Query: ENUM_STRINGS.DB_STRINGS.QUERIES.ZONE_LOOKUP.replace(/%s/, cPlaceholders),
            Parameters: cUnique
        }) as TYPE_ROW[];
        for (const cRow of cRows) {
            const { Geometry } = cRow;
            if (!Geometry) continue;
            const cHash = createHash(`Sha256`).update(Geometry).digest(`hex`);
            if (cGeometryHashes.has(cHash)) continue;
            cGeometryHashes.add(cHash);
            const cGetometry = JSON.parse(Geometry);
            const { type, coordinates } = cGetometry;
            if (type == `Polygon`) { 
                cPolygons.push(coordinates);
            }
            if (type == `MultiPolygon`) {
                for (const cPolygon of coordinates) {
                    cPolygons.push(cPolygon);
                }
            }
        }
        if (cPolygons.length == 0) return null;
        if (Union) { 
            return GetUnionedPolygon({ Polygons: cPolygons });
        } else { 
            const cMultiPolygon: number[][][][] = [];
            for (const cPoly of cPolygons) { 
                if (Array.isArray(cPoly) && Array.isArray(cPoly[0])) {
                    cMultiPolygon.push(cPoly);
                }
            }
            if (cMultiPolygon.length == 0) return null;
            return { type: `MultiPolygon`, coordinates: cMultiPolygon };
        }
    }

    @ConstructClassTimer
    public GetLocationMetadata({ Zones, UGC }: GET_LOCATION_METADATA_OPTIONS): GET_LOCATION_METADATA_RESPONSE {
        const locations = UGC ? UGC?.Locations : this.GetZoneLocations({ Zones: Zones })
        return { 
            locations: locations,
            states: [...new Set(
                Zones
                ?.map((lLocation: string) => lLocation.match(/^([A-Z]{2})[CZ](\d{3})$/)?.[1])
                ?.filter(Boolean) ?? []
            )]
        }
    }
}