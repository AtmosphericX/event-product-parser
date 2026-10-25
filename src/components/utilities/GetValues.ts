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

interface GET_VALUES_OPTIONS {
    Input: Record<string, any>
    Output: Record<string, string | string[]> | { Keys: string[], Value: string, Array?: boolean }[]
}

export const GetValues = ({ Input, Output }: GET_VALUES_OPTIONS): Record<string, any> => {
    const extracted: Record<string, any> = {};   
    const callFindValueKey = (obj: any, searchKey: string) => {
        const results: any[] = [];
        if (obj === null || typeof obj !== 'object') {
            return results;
        }
        const searchKeyLower = searchKey.toLowerCase();
        for (const key in obj) {
            if (obj.hasOwnProperty(key) && key.toLowerCase() === searchKeyLower) {
                results.push(obj[key]);
            }
        }
        if (Array.isArray(obj)) {
            for (const item of obj) {
                if (item.valueName && item.valueName.toLowerCase() === searchKeyLower && item.value !== undefined) {
                    results.push(item.value);
                }
                const nestedResults = callFindValueKey(item, searchKey);
                results.push(...nestedResults);
            }
        }
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const nestedResults = callFindValueKey(obj[key], searchKey);
                results.push(...nestedResults);
            }
        }
        return results;
    };
    const mappings = Array.isArray(Output)
        ? Output
        : Object.entries(Output).map(([key, value]) => ({ Keys: [key], Value: value, Array: Array.isArray(value) }));

    const assignPath = (target: Record<string, any>, path: string, value: any): void => {
        const parts = path.split('.').filter(Boolean);
        if (parts.length === 0) {
            return;
        }

        let current = target;
        for (const part of parts.slice(0, -1)) {
            if (current[part] === null || typeof current[part] !== 'object' || Array.isArray(current[part])) {
                current[part] = {};
            }
            current = current[part];
        }
        const lastPart = parts[parts.length - 1];
        if (Object.prototype.hasOwnProperty.call(current, lastPart)) {
            const existingValue = current[lastPart];
            current[lastPart] = [
                ...(Array.isArray(existingValue) ? existingValue : [existingValue]),
                ...(Array.isArray(value) ? value : [value]),
            ];
        } else {
            current[lastPart] = value;
        }
    };

    for (const mapping of mappings) {
        const values = mapping.Keys.flatMap((key: string) => callFindValueKey(Input, key));
        const uniqueValues = [...new Set(values)];
        const value = uniqueValues.length === 0
            ? null
            : (mapping.Array ? uniqueValues : (uniqueValues.length === 1 ? uniqueValues[0] : uniqueValues));
        const mappedKey = mapping.Value;
        if (typeof mappedKey === 'string' && mappedKey && value !== null) {
            assignPath(extracted, mappedKey, value);
        }
    }
    return extracted;
}