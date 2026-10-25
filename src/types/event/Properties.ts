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

export type TYPE_CITIES = { 
    name: string
    state: string
    county: string
    population: number
}

export type TYPE_PROPERTIES = {
    locations?: string[]
    states?: string[]
    description?: string
    geography?: {
        office?: {
            abbreviation?: string
            name?: string
        }
        wmo?: string
        zones?: string[]
        population?: {
            population?: number
            cities?: TYPE_CITIES[]
        }
        polygon?: string | null
    }
    parameters?: {
        tags?: string[]
        instructions?: string
        source?: string
        hazards?: string
        impacts?: string
        hail_size?: string
        wind_gusts?: string
        damage_indicator?: string
        snow_squall_indicator?: string
        tornado_indicator?: string
        flood_indicator?: string
        wind_indicator?: string
        hail_indicator?: string
        storm_motion?: string
    }
    flood_parameters?: {
        severity?: string
        cause?: string
        record?: string
    },
    discussion_parameters?: {
        number?: string
        issuance?: string
        concerning?: string
        max_tornado?: string
        max_hail?: string
        max_gust?: string
    }
    watch_parameters?: {
        number?: string
        type?: string
        tornado_probability?: string
        strong_tornado_probability?: string
        severe_wind_probability?: string
        severe_hail_probability?: string
        hail_2in_probability?: string
        combined_hail_wind_probability?: string
        max_hail_inches?: string
        max_wind_surface?: string
        max_tops_x100feet?: string
        pds?: boolean
    }
}