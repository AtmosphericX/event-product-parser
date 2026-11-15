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

type TYPE_AUDIO_GENERATION = {
    RegEx: RegExp
    Replace: string
}

type TYPE_AUDIO_GENERATION_HOURS = {
    [key: number]: string
}

export const ENUM_AUDIO_MESSAGES: TYPE_AUDIO_GENERATION[] = [
    { RegEx: /\.{3,}/g, Replace: ". " },
    { RegEx: /\bUTC\b/g, Replace: 'Coordinated Universal Time' },
    { RegEx: /\bGMT\b/g, Replace: 'Greenwich Mean Time' },
    { RegEx: /\bEST\b(?!\w)/g, Replace: 'Eastern Standard Time' },
    { RegEx: /\bEDT\b(?!\w)/g, Replace: 'Eastern Daylight Time' },
    { RegEx: /\bCST\b(?!\w)/g, Replace: 'Central Standard Time' },
    { RegEx: /\bCDT\b(?!\w)/g, Replace: 'Central Daylight Time' },
    { RegEx: /\bMST\b(?!\w)/g, Replace: 'Mountain Standard Time' },
    { RegEx: /\bMDT\b(?!\w)/g, Replace: 'Mountain Daylight Time' },
    { RegEx: /\bPST\b(?!\w)/g, Replace: 'Pacific Standard Time' },
    { RegEx: /\bPDT\b(?!\w)/g, Replace: 'Pacific Daylight Time' },
    { RegEx: /\bAKST\b(?!\w)/g, Replace: 'Alaska Standard Time' },
    { RegEx: /\bAKDT\b(?!\w)/g, Replace: 'Alaska Daylight Time' },
    { RegEx: /\bHST\b(?!\w)/g, Replace: 'Hawaii Standard Time' },
    { RegEx: /\bHDT\b(?!\w)/g, Replace: 'Hawaii Daylight Time' },
    { RegEx: /\bmph\b(?!\w)/g, Replace: 'miles per hour' },
    { RegEx: /\bkm\/h\b(?!\w)/g, Replace: 'kilometers per hour' },
    { RegEx: /\bkmh\b(?!\w)/g, Replace: 'kilometers per hour' },
    { RegEx: /\bkt\b(?!\w)/g, Replace: 'knots' },
    { RegEx: /\bNE\b(?!\w)/g, Replace: 'northeast' },
    { RegEx: /\bNW\b(?!\w)/g, Replace: 'northwest' },
    { RegEx: /\bSE\b(?!\w)/g, Replace: 'southeast' },
    { RegEx: /\bSW\b(?!\w)/g, Replace: 'southwest' },
    { RegEx: /\bNM\b(?!\w)/g, Replace: 'nautical miles' },
    { RegEx: /\bdeg\b(?!\w)/g, Replace: 'degrees' },
    { RegEx: /\btstm\b(?!\w)/g, Replace: 'thunderstorm' },
    { RegEx: /\bmm\b(?!\w)/g, Replace: 'millimeters' },
    { RegEx: /\bcm\b(?!\w)/g, Replace: 'centimeters' },
    { RegEx: /\bin.\b(?!\w)/g, Replace: 'inches' },
    { RegEx: /\bft\b(?!\w)/g, Replace: 'feet' },
    { RegEx: /\bmi\b(?!\w)/g, Replace: 'miles' },
    { RegEx: /\bhr\b(?!\w)/g, Replace: 'hour' },
    { RegEx: /\bhourly\b(?!\w)/g, Replace: 'per hour' },
    { RegEx: /\bkg\b(?!\w)/g, Replace: 'kilograms' },
    { RegEx: /\bg\/kg\b(?!\w)/g, Replace: 'grams per kilogram' },
    { RegEx: /\bMB\b(?!\w)/g, Replace: 'millibars' },
    { RegEx: /\bhPa\b(?!\w)/g, Replace: 'hectopascals' },
    { RegEx: /\bPa\b(?!\w)/g, Replace: 'pascals' },
    { RegEx: /\bKPa\b(?!\w)/g, Replace: 'kilopascals' },
    { RegEx: /\bC\/hr\b(?!\w)/g, Replace: 'degrees Celsius per hour' },
    { RegEx: /\bF\/hr\b(?!\w)/g, Replace: 'degrees Fahrenheit per hour' },
    { RegEx: /\bC\/min\b(?!\w)/g, Replace: 'degrees Celsius per minute' },
    { RegEx: /\bF\/min\b(?!\w)/g, Replace: 'degrees Fahrenheit per minute' },
    { RegEx: /\bC\b(?!\w)/g, Replace: 'degrees Celsius' },
    { RegEx: /\bF\b(?!\w)/g, Replace: 'degrees Fahrenheit' },
]

export const ENUM_HOURS: TYPE_AUDIO_GENERATION_HOURS = {
    0: "twelve", 1: "one", 2: "two", 3: "three", 4: "four",
    5: "five", 6: "six", 7: "seven", 8: "eight", 9: "nine",
    10: "ten", 11: "eleven", 12: "twelve",
}