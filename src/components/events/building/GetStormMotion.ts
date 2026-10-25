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

interface GET_EVENT_MOVEMENT_DIRECTION_OPTIONS {
    Message: string
}
    
export const GetStormMotion = ({ Message }: GET_EVENT_MOVEMENT_DIRECTION_OPTIONS): string => {
    const cDirection = Message
        .replace(/\s+/g, ' ')
        .match(/moving\s+(north|south|east|west|northeast|northwest|southeast|southwest)\s+at\s+(\d+)\s+mph/i);
    if (cDirection) {
        return cDirection[1].charAt(0).toUpperCase() + cDirection[1].slice(1).toLowerCase() + ` @ ${cDirection[2]} MPH`;   
    }
    return null;
}