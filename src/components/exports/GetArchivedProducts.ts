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

import { ENUM_STRINGS } from "@Enums/Strings"
import { CreateFetchRequest } from "@Components.Utilities/CreateFetchRequest"

interface ARCHIVED_PRODUCTS {
    PIL: string[]
    Limit?: number
}

interface ARCHIVED_PRODUCTS_RESPONSE {
    TTAAII: string
    Products: string[]
}

export const GetArchivedProducts = async ({ PIL, Limit = 1 }: ARCHIVED_PRODUCTS): Promise<ARCHIVED_PRODUCTS_RESPONSE[]> => {
    const { ARCHIVED_PRODUCTS } = ENUM_STRINGS.API
    const cStorage: ARCHIVED_PRODUCTS_RESPONSE[] = [];
    for (const cPil of PIL) {
        const { Error, Body } = await CreateFetchRequest({ Destination: ARCHIVED_PRODUCTS.replace(/%s/, cPil).replace(/%d/, String(Limit)) })
        if (!Error) {
            const cProducts = Body
                ?.split(/(?=\$\$)/g)
                ?.map(lMsg => lMsg.trim())
                ?.filter(lMsg => lMsg && lMsg !== "$$")
                ?.filter(lMsg => lMsg.length > 25)
            cStorage.push({ TTAAII: cPil, Products: cProducts });
        }
    }
    return cStorage
}