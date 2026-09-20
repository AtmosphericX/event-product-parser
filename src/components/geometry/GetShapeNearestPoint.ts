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

interface GetShapeNearestPointOptions {
    Coordinates: number[][]
    Point: [number, number]
}

interface GetShapeNearestPointResponse { 
    Proximity: boolean
    Point: [number, number]
    Distance: number | null 
    DistanceKm?: number | null
    DistanceMeters?: number | null
}

export const GetShapeNearestPoint = ({ Coordinates, Point }: GetShapeNearestPointOptions): GetShapeNearestPointResponse => {
    if (!Coordinates || !Point) { 
        return { Proximity: false, Point: [0, 0], Distance: null }
    }
    const normalize = (coords: any): any[] => {
        if (!Array.isArray(coords)) return [];
        if (typeof coords[0] === 'number' && typeof coords[1] === 'number') return [];
        if (Array.isArray(coords[0]) && typeof coords[0][0] === 'number') {
            return [[coords]];
        }
        if (Array.isArray(coords[0]) && Array.isArray(coords[0][0]) && typeof coords[0][0][0] === 'number') {
            return [coords];
        }
        if (Array.isArray(coords[0]) && Array.isArray(coords[0][0]) && Array.isArray(coords[0][0][0]) && typeof coords[0][0][0][0] === 'number') {
            return coords;
        }
        return [];
    }
    const polys = normalize(Coordinates);
    if (polys.length === 0) return { Proximity: false, Point: [0, 0], Distance: null };
    const lon = Point[0];
    const lat = Point[1];
    const pointInRing = (pt: [number, number], ring: number[][]): boolean => {
        let x = pt[0], y = pt[1];
        let inside = false;
        for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
            const xi = ring[i][0], yi = ring[i][1];
            const xj = ring[j][0], yj = ring[j][1];
            const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi + 0) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    };

    const toRadians = (deg: number) => (deg * Math.PI) / 180;
    const haversineMiles = (a: [number, number], b: [number, number]) => {
        const R = 3958.8;
        const dLat = toRadians(b[1] - a[1]);
        const dLon = toRadians(b[0] - a[0]);
        const lat1 = toRadians(a[1]);
        const lat2 = toRadians(b[1]);
        const sinDLat = Math.sin(dLat / 2);
        const sinDLon = Math.sin(dLon / 2);
        const c = 2 * Math.asin(Math.sqrt(sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon));
        return R * c;
    };
    let minDistance = Infinity;
    let closestPoint: [number, number] | null = null;
    for (const poly of polys) {
        const outer = poly[0];
        const holes = poly.slice(1);
        if (pointInRing(Point, outer)) {
            let inHole = false;
            for (const hole of holes) {
                if (pointInRing(Point, hole)) { inHole = true; break; }
            }
            if (!inHole) {
                return { Proximity: true, Point, Distance: 0 };
            }
        }
        for (const ring of poly) {
            for (let i = 0; i < ring.length - 1; i++) {
                const start = [ring[i][0], ring[i][1]] as [number, number];
                const end = [ring[i+1][0], ring[i+1][1]] as [number, number];
                const A = lon - start[0];
                const B = lat - start[1];
                const C = end[0] - start[0];
                const D = end[1] - start[1];
                const lenSq = C*C + D*D;
                const t = lenSq === 0 ? 0 : Math.max(0, Math.min(1, (A*C + B*D) / lenSq));
                const candidate: [number, number] = [start[0] + t*C, start[1] + t*D];
                const dist = haversineMiles([lon, lat], candidate);
                if (!isNaN(dist) && dist < minDistance) {
                    minDistance = Number(dist.toFixed(3));
                    closestPoint = candidate;
                }
            }
        }
    }
    if (!isFinite(minDistance) || closestPoint == null) {
        return { Proximity: false, Point: [0,0], Distance: null };
    }
    const distanceMiles = minDistance;
    const distanceKm = Number((distanceMiles * 1.609344).toFixed(3));
    const distanceMeters = Math.round(distanceKm * 1000);
    return { Proximity: distanceMiles === 0, Point: closestPoint, Distance: distanceMiles, DistanceKm: distanceKm, DistanceMeters: distanceMeters };
}
