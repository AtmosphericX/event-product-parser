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

import { mkdir, appendFile, writeFile } from "fs/promises"

interface CONSTRUCT_FILE_OPTIONS { 
    Context: string
    Directory: string
    File: string
    isWriting?: boolean
}

export const ConstructFile = async ({ Context, Directory, File, isWriting = true }: CONSTRUCT_FILE_OPTIONS): Promise<string> => {
    const cFormatString = isWriting ? Context : `${Context}${"\n".repeat(5)}`;
    const cDirectoryPath = Directory ? `${Directory}/${File}` : File;

    await mkdir(Directory, { recursive: true })
    isWriting ? 
        await writeFile(cDirectoryPath, cFormatString) : 
        await appendFile(cDirectoryPath, cFormatString);
        
    return Context;
}