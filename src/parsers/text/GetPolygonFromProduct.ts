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

export const GetPolygonFromProduct = (message: string): number[][] => {
    const coordinates: number[][] = [];
    const match = message.match(/LAT\.\.\.LON\s+([\s\S]*?)(?:\r?\n\s*\r?\n|\s*\/\*|$)/i);
    if (!match) return coordinates;
    const text = match[1]
        .split(/\r?\n/).map(l => l.trim())
        .filter(l => l && !/[A-Za-z]/.test(l))
        .join(' ').trim();
    if (!text) return coordinates;
    const values = text.match(/\d{4,8}/g);
    if (!values || values.length === 0) return coordinates;
    const points: { lat: number; lon: number }[] = [];
    if (values.every(v => v.length === 8)) {
        for (const value of values) {
            const lat = parseInt(value.slice(0, 4), 10) / 100;
            let lon = parseInt(value.slice(4, 8), 10) / 100;
            if (lon < 20) lon += 100;
            points.push({ lat, lon });
        }
    } else if (values.every(v => v.length === 4)) {
        for (let i = 0; i + 1 < values.length; i += 2) {
            const lat = parseInt(values[i], 10) / 100;
            const lon = parseInt(values[i + 1], 10) / 100;
            points.push({ lat, lon });
        }
    } else {
        for (let i = 0; i + 1 < values.length; i += 2) {
            const latStr = values[i];
            const lonStr = values[i + 1];
            if (latStr.length !== 4) continue;
            if (lonStr.length < 4 || lonStr.length > 5) continue;
            const lat = parseInt(latStr, 10) / 100;
            let lon = parseInt(lonStr, 10) / 100;
            points.push({ lat, lon });
        }
    }
    if (points.length === 0) return coordinates;
    const isEast = points.some(p => p.lon > 130 && p.lon < 180);
    for (const p of points) {
        const lon = isEast ? p.lon : -p.lon;
        if (Number.isFinite(p.lat) && Number.isFinite(lon) && p.lat >= -90 && p.lat <= 90 && lon >= -180 && lon <= 180) {
            coordinates.push([lon, p.lat]);
        }
    }
    if (coordinates.length > 2 && (coordinates[0][0] !== coordinates[coordinates.length - 1][0] ||  coordinates[0][1] !== coordinates[coordinates.length - 1][1])) {
        coordinates.push([...coordinates[0]]);
    }
    
    return coordinates;
};