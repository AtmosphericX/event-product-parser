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


type TYPE_TAGS = {
    Match: RegExp
    Label: string
}

export const ENUM_TAGS: Record<string, TYPE_TAGS[]> = {
    SEVERE_WEATHER: [
        { Match: /A Large And Extremely Dangerous Tornado/i, Label: "Large and Dangerous Tornado" },
        { Match: /This Is A Particularly Dangerous Situation/i, Label: "Particularly Dangerous Situation" },
        { Match: /Weather Spotters Confirmed Tornado/i, Label: "Weather Spotters Confirmed Tornado" },
        { Match: /Law Enforcement Confirmed Tornado/i, Label: "Law Enforcement Confirmed Tornado" },
        { Match: /Radar Confirmed/i, Label: "Radar Confirmed" },
        { Match: /Radar Indicated Rotation/i, Label: "Radar Indicated Rotation" },
        { Match: /Radar Indicated(?! Rotation)/i, Label: "Radar Indicated" },
        { Match: /A Tornado Is On The Ground/i, Label: "Tornado On The Ground" },
        { Match: /Tornado Was Reported Briefly On The Ground/i, Label: "Tornado Briefly On Ground" },
        { Match: /Weather Spotters Reported Funnel Cloud/i, Label: "Confirmed Funnel Cloud" },
        { Match: /Spotters Indicate That A Funnel Cloud Continues With This Storm/i, Label: "Funnel Cloud Continues" },
        { Match: /A Severe Thunderstorm Capable Of Producing A Tornado/i, Label: "Tornado Possible" },
        { Match: /A Tornado May Develop At Any Time/i, Label: "Tornado May Develop" },
        { Match: /A Tornado Watch Remains In Effect/i, Label: "Active Tornado Watch" },
        { Match: /Complete Destruction Is Possible/i, Label: "Extremely Damaging Tornado" },
        { Match: /Potentially Deadly Tornado/i, Label: "Deadly Tornado" },
        { Match: /Life-Threatening Situation/i, Label: "Life Threatening Situation" },
        { Match: /Capable Of Producing A Landspout/i, Label: "Landspout Possible" },
        { Match: /Public Confirmed Tornado/i, Label: "Public Confirmed Tornado" },
        { Match: /Expect Wind Damage/i, Label: "Wind Damage" },
        { Match: /Destructive Winds/i, Label: "Destructive Winds" },
        { Match: /Wind Damage With This Storm Will Occur/i, Label: "Immediate Wind Damage Threat" },
        { Match: /Widespread Wind Damage/i, Label: "Widespread Wind Damage" },
        { Match: /Significant Wind Damage/i, Label: "Significant Wind Damage" },
        { Match: /Tornado Like Wind Speeds/i, Label: "Tornado-Like Wind Speeds" },
        { Match: /Winds Will Strengthen/i, Label: "Strengthening Winds" },
        { Match: /Gusty Winds/i, Label: "Gusty Winds" },
        { Match: /Could Knock Down Tree Limbs/i, Label: "Tree Damage Possible" },
        { Match: /Blow Around Unsecured Objects/i, Label: "Loose Object Damage Possible" },
        { Match: /Unsecured lightweight objects blown about/i, Label: "Loose Objects May Blow Around" },
        { Match: /Many large tree limbs broken off/i, Label: "Tree Limb Damage Possible" },
        { Match: /Some fences and roadway signs blown over/i, Label: "Fence and Sign Damage Possible" },
        { Match: /Hazardous driving conditions on bridges/i, Label: "Hazardous Bridge Travel" },
        { Match: /Scattered power and communications outages/i, Label: "Power Outages Possible" },
        { Match: /Hail Damage To Vehicles Is Expected/i, Label: "Vehicle Damaging Hail" },
        { Match: /Extremely Large Hail/i, Label: "Extremely Large Hail" },
        { Match: /(?<!Extremely )Large Hail/i, Label: "Large Hail" },
        { Match: /Tennis Ball Size Hail/i, Label: "Tennis Ball Size Hail" },
        { Match: /Baseball Size Hail/i, Label: "Baseball Size Hail" },
        { Match: /Golf Ball Size Hail/i, Label: "Golf Ball Size Hail" },
        { Match: /Quarter Size Hail/i, Label: "Quarter Size Hail" },
        { Match: /Ping Pong Ball Size Hail/i, Label: "Ping Pong Ball Size Hail" },
        { Match: /Nickel Size Hail/i, Label: "Nickel Size Hail" },
        { Match: /Hail Driven By Severe Winds/i, Label: "Wind Driven Hail" },
        { Match: /Prepare Immediately For Large Hail/i, Label: "Large Hail" },
        { Match: /Half Inch Hail/i, Label: "Half Inch Hail" },
        { Match: /Frequent Lightning/i, Label: "Frequent Lightning" },
        { Match: /Deadly Cloud To Ground Lightning/i, Label: "Deadly Cloud To Ground Lightning" },
        { Match: /Continuous Cloud To Ground Lightning/i, Label: "Continuous Cloud To Ground Lightning" },
        { Match: /Frequent Cloud To Ground Lightning/i, Label: "Frequent Cloud To Ground Lightning" },
        { Match: /Lightning Can Strike \d+ Miles Away/i, Label: "Lightning Safety Threat" },
        { Match: /Showers and thunderstorms with gusty winds may still occur/i, Label: "Gusty Thunderstorms Possible" },
        
    ],

    FLOOD: [
        { Match: /Flash Flooding Caused By Thunderstorms/i, Label: "Thunderstorm Flash Flooding" },
        { Match: /Flash Flooding Caused By Heavy Rain/i, Label: "Heavy Rain Flash Flooding" },
        { Match: /Torrential Rainfall/i, Label: "Torrential Rainfall" },
        { Match: /May Lead To Flash Flooding/i, Label: "Flash Flooding Possible" },
        { Match: /Minor Flooding Is Occurring/i, Label: "Minor Flooding Occurring" },
        { Match: /Localized Flooding/i, Label: "Localized Flooding Possible" },
        { Match: /Do Not Drive Your Vehicle Through Flooded Roadways/i, Label: "Flooded Roadways" },
        { Match: /No storm surge inundation forecast/i, Label: "No Storm Surge Inundation" },
        { Match: /Localized storm surge possible/i, Label: "Localized Storm Surge Possible" },
        { Match: /Peak Storm Surge Inundation/i, Label: "Storm Surge Inundation Risk" },
        { Match: /Potential for storm surge flooding/i, Label: "Storm Surge Flooding Possible" },
        { Match: /Small streams, creeks, and ditches may become swollen/i, Label: "Small Stream Flooding Risk" },
        { Match: /Rivers and tributaries may quickly rise/i, Label: "Rapid River Rise Possible" },
        { Match: /Flood waters can enter a few structures/i, Label: "Flood Damage Possible" },
        { Match: /Rapid ponding of water occurs/i, Label: "Water Ponding Possible" },
        { Match: /Brief road and bridge closures/i, Label: "Road Closures Possible" },
        
    ],

    WINTER_WEATHER: [
        { Match: /Frostbite And Hypothermia Are Likely/i, Label: "Frostbite and Hypothermia Likely" },
        { Match: /Very Cold Temperatures Can Lead To Hypothermia/i, Label: "Hypothermia Risk" },
        { Match: /Hypothermia If Precautions Are Not Taken/i, Label: "Hypothermia Risk" },
        { Match: /Frostbite And Hypothermia Will Occur If Unprotected Skin/i, Label: "Frostbite Risk" },
        { Match: /Temperatures Could Cause Ruptured Water Pipes/i, Label: "Ruptured Water Pipes Possible" },
        { Match: /Blowing Snow Which Could Reduce Visibility/i, Label: "Reduced Visibility From Blowing Snow" },
        { Match: /Lake Effect Snow Expected/i, Label: "Lake Effect Snow" },
        { Match: /Slick And Icy Spots On Roads/i, Label: "Icy Roads" },
        { Match: /Hazardous Roadways And Black Ice/i, Label: "Black Ice" },
        { Match: /Icy Patches May Be More Common On Bridges/i, Label: "Bridge Icing" },
    ],

    COASTAL_MARINE: [
        { Match: /Rip Currents Can Sweep Even The Best Swimmer/i, Label: "Dangerous Rip Currents" },
        { Match: /Small Craft Could Be Damaged/i, Label: "Small Craft Damage Possible" },
        { Match: /No Tsunami Threat/i, Label: "No Tsunami Threat" },
        { Match: /Tsunami Threat Exists/i, Label: "Tsunami Threat Exists" },
        { Match: /TROPICAL STORM WARNING IN EFFECT/i, Label: "Tropical Storm Warning" },
        { Match: /TROPICAL STORM WARNING REMAINS IN EFFECT/i, Label: "Tropical Storm Warning Continues" },
        { Match: /Tropical storm[- ]force winds/i, Label: "Tropical Storm Force Winds" },
        { Match: /hazardous wind/i, Label: "Hazardous Winds" },
        { Match: /hazardous seas/i, Label: "Hazardous Seas" },
        { Match: /could capsize or damage vessels/i, Label: "Vessel Damage Risk" },
        { Match: /reduce visibility/i, Label: "Reduced Visibility" },
        { Match: /Mariners should alter plans/i, Label: "Marine Travel Disruption" },
        { Match: /Remain in port/i, Label: "Remain In Port" },
        { Match: /seek safe harbor/i, Label: "Seek Safe Harbor" },
        { Match: /secure the vessel for severe conditions/i, Label: "Secure Vessel" },
    ],

    SAFETY_INFO: [
        { Match: /Seek Shelter Now/i, Label: "Seek Shelter Now" },
        { Match: /Seek Shelter Immediately/i, Label: "Seek Shelter Immediately" },
        { Match: /Move To An Interior Room/i, Label: "Move To Interior Room" },
        { Match: /Move To Safe Shelter Now/i, Label: "Move To Safe Shelter" },
        { Match: /Potentially Deadly Storm/i, Label: "Potentially Deadly Storm" },
        { Match: /Serious Injury And Significant Property Damage/i, Label: "Serious Damage Possible" },
        { Match: /People And Animals Outdoors Will Be Injured/i, Label: "Outdoor Injury Risk" },
        { Match: /IMMINENT DANGEROUS WEATHER CONDITIONS/i, Label: "Imminent Dangerous Weather" },
        { Match: /Follow the instructions of local officials/i, Label: "Follow Local Officials" },
        { Match: /Monitor forecasts/i, Label: "Monitor Forecast Updates" },
        { Match: /Complete preparations.*before conditions become unsafe/i, Label: "Complete Preparations Early" },
        { Match: /Leave immediately if evacuation orders are given/i, Label: "Evacuate If Ordered" },
        { Match: /Heed any flood watches and warnings/i, Label: "Monitor Flood Alerts" },
        { Match: /Listen for changes in the forecast/i, Label: "Stay Weather Aware" },
        { Match: /Travel Could Be Very Difficult/i, Label: "Difficult Travel Conditions" },
        { Match: /Expect Disruptions/i, Label: "Travel Disruptions Expected" },
        { Match: /Trained Weather Spotters/i, Label: "Confirmed By Storm Spotters" },
        { Match: /Doppler Radar/i, Label: "Confirmed By Radar" },
        { Match: /Source\.\.\.Storm Spotters/i, Label: "Confirmed By Storm Spotters" },
        { Match: /Source\.\.\.Doppler Radar/i, Label: "Confirmed By Radar" },
        { Match: /Source\.\.\.Automated Gauges/i, Label: "Confirmed By Automated Gauges" },
        { Match: /Source\.\.\.Radar Confirmed/i, Label: "Confirmed By Radar" },
        { Match: /Source\.\.\.Radar Indicated/i, Label: "Radar Indicated" },
        { Match: /Source\.\.\.Public/i, Label: "Confirmed By Public" },
        { Match: /Source\.\.\.Amateur Radio/i, Label: "Confirmed By Amateur Radio" },
        { Match: /Source\.\.\.Emergency Management/i, Label: "Confirmed By Emergency Management" },
        { Match: /Source\.\.\.Law Enforcement Reported/i, Label: "Confirmed By Law Enforcement" },
        { Match: /Source\.\.\.Broadcast Media/i, Label: "Confirmed By Broadcast Media" },
        { Match: /Source\.\.\.Media/i, Label: "Confirmed By Media" },
        { Match: /Source\.\.\.Media Reported/i, Label: "Confirmed By Media" },
        { Match: /Doppler Radar And Automated Gauges/i, Label: "Confirmed By Radar and Gauges" },
        { Match: /Potential Impacts:\s*Limited/i, Label: "Limited Impacts Expected" },
        { Match: /Potential Impacts:\s*Little to None/i, Label: "Minimal Impacts Expected" },
        { Match: /Slow Down And Allow Extra Time/i, Label: "Allow Extra Travel Time" },
        { Match: /Should Exercise Caution/i, Label: "Exercise Caution" },
        { Match: /Heat Illnesses/i, Label: "Heat Illness Risk" },
        { Match: /\bIntensifying\b/i, Label: "Intensifying Conditions" },
    ],
};