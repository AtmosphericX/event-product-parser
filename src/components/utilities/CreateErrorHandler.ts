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
import { SetLog } from "@Components.Utilities/SetLog"

const ENUM_IGNORED_ERRORS: string[] = [
    'ETIMEDOUT', 'ECONNRESET', 'EHOSTUNREACH', 'ENOTFOUND', 'ECONNREFUSED', 
    'EPIPE', 'EADDRINUSE', 'EALREADY', 'EACCES', 'EAGAIN', 
    'EHOSTDOWN', 'STARTTLS_FAILURE'
];

export const CreateErrorHandler = (): void => {
    process.on('uncaughtException', (error: { code?: string }) => {
        const cMessage = error instanceof Error ? error.stack ?? error.message : String(error);
        const cErrorCode = error?.code ?? `UNKNOWN_ERROR`
        const cStackTraceLines = cMessage
            .split('\n')
            .map((lLine) => lLine.replace(/.*(?:dist[\\/]+index\.cjs:)(\d+:\d+)/, 'dist/index.cjs:$1'))
            .filter((lLine) => lLine.includes('dist/index.cjs:'))
            .map((lLine) => lLine.replace(/\)?$/, ''));
        
        if (ENUM_IGNORED_ERRORS.includes(cErrorCode)) {
            return 
        }
        SetLog({
            Type: `ERROR`,
            Message: `${ENUM_STRINGS.SERVICE.ERROR_OCCURED}\n\nTraces: ${cStackTraceLines.length > 0 ? cStackTraceLines.join(', ') : 'No stack trace available'}\n\nError: ${cMessage}`
        });
    });
}