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

import { Bootstrap } from "@Bootstrap"
import { SetLog } from "@Components.Utilities/SetLog"

interface CREATE_HTTP_OPTIONS { 
    Destination: string
    Headers?: Record<string, string>
    Timeout?: number
    Authentication?: {
        Username: string
        Password: string
    },
    Method?: `GET` | `POST` | `PUT` | `DELETE` | `PATCH`
    Body?: any
    Form?: any
}

interface CREATE_HTTP_RESPONSE {
    Error: boolean
    StatusCode: number
    Body: string
}

export const CreateFetchRequest = async ({Destination, Headers, Timeout, Authentication, Method, Body, Form}: CREATE_HTTP_OPTIONS): Promise<CREATE_HTTP_RESPONSE> => {
    const dbgTickA = performance.now();
    const cOptions: RequestInit = {
        method: Method ?? `GET`,
        headers: Headers ?? {
            "User-Agent": `@atmosx/event-product-parser/${Bootstrap.Version}`,
            "Accept": "application/geo+json, text/plain, */*; q=0.9",
            "Accept-Language": "en-US,en;q=0.9",
        },
        signal: AbortSignal.timeout(Timeout ?? 10e3),
        redirect: "follow",
    }

    if (Authentication) { 
        const { Username, Password } = Authentication;
        const cAuthString = `${Username}:${Password}`;
        const cEncoded64 = Buffer.from(cAuthString).toString('base64');
        cOptions.headers = { 
            ...cOptions.headers, 
            "Authorization": `Basic ${cEncoded64}`
        }
    }

    if (Form) { 
        cOptions.body = Form;
    } else if (Body != undefined) { 
        cOptions.body = Body instanceof FormData ? Body : typeof Body === "string" ? Body : JSON.stringify(Body);
    }

    try {
        const cResponse = await fetch(Destination, cOptions);
        const cBodyText = await cResponse.text();
        SetLog({ Type: `DEBUG`, Message: `[${(Math.round((performance.now() - dbgTickA) * 100) / 100).toFixed(1)}ms] CreateFetchRequest ${Destination} (${cResponse.status})` })
        if (!cResponse.ok) { 
            return { Error: true, StatusCode: cResponse.status, Body: cBodyText };
        }
        return { Error: false, StatusCode: cResponse.status, Body: cBodyText };
    } catch (error) {
        return { Error: true, StatusCode: 0, Body: `${error}` };
    }
}
    
