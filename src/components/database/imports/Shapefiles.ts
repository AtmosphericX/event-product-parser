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

import { EnumShapefiles } from "@Enums/Shapefiles"
import { Bootstrap } from "@Bootstrap"
import { SetSleep } from "@Utilities/SetSleep"
import { SetWarning } from "@Utilities/SetWarning"
import { CreateQuery } from "@Database/CreateQuery"
import { existsSync, mkdirSync, writeFileSync, unlinkSync, rm } from "fs"
import { resolve, extname} from "path"
import { loadAsync } from "jszip"
import { read } from "shapefile"

export const Shapefiles = async (): Promise<void> => {
    try { 
        const tShapefiles = CreateQuery({ Query: `SELECT COUNT(*) AS count FROM shapefiles` })[0] as { count: number };
        if (tShapefiles.count === 0) {
            await SetSleep({Timeout: 1e3});
            for (const shapefile of EnumShapefiles) {
                const response = await fetch(shapefile.link);
                const arrayBuff = await response.arrayBuffer();
                const content = await loadAsync(arrayBuff);
                const directory = resolve(__dirname, `shapefiles`);
                if (!existsSync(directory)) {
                    mkdirSync(directory, { recursive: true });
                }
                for (const file of Object.keys(content.files)) {
                    if (file.endsWith('.shp') || file.endsWith('.dbf')) {
                        const data = await content.files[file].async(`nodebuffer`)
                        const output = resolve(directory, `${shapefile?.name ?? ``}_${shapefile?.id ?? ``}${extname(file)}`)
                        writeFileSync(output, data)
                    }
                }
                const filepath = resolve(__dirname, 'shapefiles', shapefile.name + '_' + shapefile.id)
                const { features } = await read(
                    filepath,
                    filepath,
                );
                SetWarning({ Message: `Importing ${features.length} features from ${shapefile.name}_${shapefile.id} for Shapefiles` })
                const insert = `INSERT INTO shapefiles (id, location, source, geometry) VALUES (?, ?, ?, ?)`;
                const transaction = Bootstrap.Database.transaction((entries: any[]) => {
                    for (const entry of entries) {
                        const { properties, geometry } = entry;
                        let final: string, location: string;
                        if (properties.FIPS) {
                            final = `${properties.STATE}${shapefile.id}${properties.FIPS.substring(2)}`;
                            location = `${properties.COUNTYNAME}, ${properties.STATE}`;
                        }
                        else if (properties.FULLSTAID) {
                            final = `${properties.ST}${shapefile.id}${properties.WFO}`;
                            location = `${properties.CITY}, ${properties.STATE}`;
                        }
                        else if (properties.STATE) {
                            final = `${properties.STATE}${shapefile.id}${properties.ZONE ?? properties.SITE_ID}`;
                            location = `${properties.NAME ?? `${properties.RFC_NAME} ${properties.RFC_CITY}`}, ${properties.STATE}`;
                        }
                        else {
                            final = properties.ID ?? properties.WFO
                            location = properties.NAME;
                        }
                        CreateQuery({ Query: insert, Parameters: [final, location, `${shapefile.name}_${shapefile.id}`, JSON.stringify(geometry)] })
                    }
                })
                unlinkSync(`${filepath}.shp`)
                unlinkSync(`${filepath}.dbf`)
                transaction(features)
            }
            rm(resolve(__dirname, 'shapefiles'), { recursive: true, force: true }, () => {});
        }
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        SetWarning( {Message: `An error occurred while compiling shapefiles: ${message}` }) 
    }
}