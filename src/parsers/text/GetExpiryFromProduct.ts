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

export const GetExpiryFromProduct = (message: string): Date | null => {
    const match = message.match(/\b\d{6}Z\s*-\s*(\d{6})Z\b/);
    if (!match) {
        return null;
    }
    const [, expiry] = match;
    const day = parseInt(expiry.slice(0, 2), 10);
    const hour = parseInt(expiry.slice(2, 4), 10);
    const minute = parseInt(expiry.slice(4, 6), 10);
    const now = new Date();
    const expires = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), day, hour, minute));
    return expires;
};
