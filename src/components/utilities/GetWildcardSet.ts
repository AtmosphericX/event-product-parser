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

interface GET_WILDCARD_SET_OPTIONS {
    Input: string[]
    Wildcard: string
}

export const GetWildcardSet = ({ Input, Wildcard }: GET_WILDCARD_SET_OPTIONS): boolean => {
    const cMatched = Input.some(lPattern => {
        if (!lPattern) return false;
        const cLowerP = lPattern.toLowerCase();
        const cLowerS = Wildcard.toLowerCase()
        if (cLowerP === "*" || cLowerP === cLowerS) return true;
        if (cLowerP.includes("*")) {
            const cRegex = "^" + cLowerP.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*") + "$";
            return new RegExp(cRegex).test(cLowerS);
        }
        return false;
    });
    return cMatched;
}