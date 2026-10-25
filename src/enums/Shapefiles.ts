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

type TYPE_SHAPEFILES= {
    Name: string
    Type: string
    Link: string
}

export const ENUM_SHAPEFILES: TYPE_SHAPEFILES[] = [
    {Name: "us_counties", Type: "C", Link: "https://www.weather.gov/source/gis/Shapefiles/County/c_16ap26.zip"},
    {Name: "us_states_territories", Type: "Z", Link: "https://www.weather.gov/source/gis/Shapefiles/County/s_16ap26.zip"},
    {Name: "fire_weather_zones", Type: "Z", Link: "https://www.weather.gov/source/gis/Shapefiles/WSOM/fz16ap26.zip"},
    {Name: "costal_marine_zones", Type: "Z", Link: "https://www.weather.gov/source/gis/Shapefiles/WSOM/mz16ap26.zip"},
    {Name: "offshore_marine_zones", Type: "Z", Link: "https://www.weather.gov/source/gis/Shapefiles/WSOM/oz16ap26.zip"},
    {Name: "public_forecast_zones", Type: "Z", Link: "https://www.weather.gov/source/gis/Shapefiles/WSOM/z_16ap26.zip"},
    {Name: "county_warning_areas", Type: "Z", Link: "https://www.weather.gov/source/gis/Shapefiles/WSOM/w_16ap26.zip"},
    {Name: "river_forecast_boundaries", Type: "Z", Link: "https://www.weather.gov/source/gis/Shapefiles/Misc/rf05mr24.zip"},
    {Name: "high_seas_marine_zones", Type: "Z", Link: "https://www.weather.gov/source/gis/Shapefiles/WSOM/hz17fe26.zip"}
]