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

export type TYPE_CAP_PRODUCT_PROPERTIES = { 
    temp: {
        id: string
        vtec: string
        locations: string
        polygon: string
    }
    properties: {
        issued: string
        expires: string
        status: string
        description: string
        event: string
        geography: {
            zones: string[]
            wmo: string
            office: {
                name: string
            }
        }
        parameters: {
            tornado_indicator: string
            hail_size: string
            wind_gusts: string
            wind_indicator: string
            hail_indicator: string
            damage_indicator: string
            snow_squall_indicator: string
            flood_indicator: string
        }
    }
}
