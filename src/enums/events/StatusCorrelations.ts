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

type TYPE_STATUS_CORRELATIONS = {
    Type: string
    Name: string
    Cancel: boolean
    Update: boolean
    Issued: boolean
    Statement: boolean
}

export const ENUM_STATUS_CORRELATIONS: TYPE_STATUS_CORRELATIONS[] = [
    {Type: "Statement", Name: "Statement", Cancel: false, Update: false, Issued: true, Statement: true},
    {Type: "Update", Name: "Updated", Cancel: false, Update: true, Issued: false, Statement: false},
    {Type: "Cancel", Name: "Cancelled", Cancel: true, Update: false, Issued: false, Statement: false},
    {Type: "Alert", Name: "Issued", Cancel: false, Update: false, Issued: true, Statement: false},
    {Type: "Updated", Name: "Updated", Cancel: false, Update: true, Issued: false, Statement: false},
    {Type: "Expired", Name: "Expired", Cancel: true, Update: false, Issued: false, Statement: false},
    {Type: "Issued", Name: "Issued", Cancel: false, Update: false, Issued: true, Statement: false},
    {Type: "Extended", Name: "Extended", Cancel: false, Update: true, Issued: false, Statement: false},
    {Type: "Correction", Name: "Correction", Cancel: false, Update: true, Issued: false, Statement: false},
    {Type: "Upgraded", Name: "Upgraded", Cancel: false, Update: true, Issued: false, Statement: false},
    {Type: "Cancelled", Name: "Cancelled", Cancel: true, Update: false, Issued: false, Statement: false},
    {Type: "Routine", Name: "Routine", Cancel: false, Update: true, Issued: false, Statement: false},
]