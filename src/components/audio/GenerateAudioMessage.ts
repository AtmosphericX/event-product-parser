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

import { TypeSettings } from "TypesStandard/Settings"
import { Bootstrap } from "@Bootstrap"
import { GetWavPCM16 } from "@AudioComponents/GetWavPCM16"
import { GetSampledPCM16 } from "@AudioComponents/GetSampledPCM16"
import { SetRadioEffect } from "@AudioComponents/SetRadioEffect"
import { SetSameHeader } from "@AudioComponents/SetSameHeader"
import { SetAttentionTone } from "@AudioComponents/SetAttentionTone"
import { GetMergedPCM16 } from "@AudioComponents/GetMergedPCM16"
import { SetNoise } from "@AudioComponents/SetNoise"
import { GetPCM16 } from "@AudioComponents/GetPCM16"
import { GetTTS } from "@AudioComponents/GetTTS"
import { GetCleanDescription } from "@AudioComponents/GetCleanDescription"
import { SetWarning } from "@Utilities/SetWarning"
import { SetDebug } from "@Utilities/SetDebug"
import { join } from "path"
import { existsSync, mkdirSync, readFileSync, writeFileSync, unlinkSync } from "fs"
import { execSync } from "child_process"
import { platform } from "os"

interface GenerateAudioMessageOptions { 
    Message: string
    Header: string
    Directory?: string
    Title: string
}

export const GenerateAudioMessage = async ({ Message, Directory, Header, Title }: GenerateAudioMessageOptions): Promise<string> => {
    const tick = performance.now()
    const settings = Bootstrap.Settings as TypeSettings;
    const prefix = settings.GlobalSettings.ArchiveSettings.AudioToneout;
    let title = (Title ?? `${Math.random().toString(36).substring(2, 15)}-${Header.replace(/[^a-zA-Z0-9]/g, '')}`).replace(/[\\:*?"<>|]/g, "_").replace(/\s+/g, " ").trim();
    if (!Message || !Header) {
        SetWarning({
            Title: `Audio`,
            Message: `Message and header are required to generate an audio message.`
        })
        return null;
    }
    let buffTTS: Buffer;
    let buffRadio: any;
    let buffFull: any[] = [];

    if (!Directory) {
        SetWarning({
            Title: `Audio`,
            Message: `Audio directory is not set in the settings. Please set it to generate audio messages.`
        });
        return null;
    }
    
    if (!existsSync(Directory)) {
        mkdirSync(Directory, { recursive: true });
    }
    const tmpTTS = join(Directory, `/${title}-tts.wav`)
    const outTTS = join(Directory, `/${title}.wav`)
    const vPlatform = platform();

    if (vPlatform === 'darwin') {
        SetWarning({
            Title: `Audio`,
            Message: `Audio tone generation is not supported on macOS.`
        });
        return null
    }


    await new Promise<void>((resolve, reject) => {
        const tMsg = GetCleanDescription(Message)
        GetTTS({Text: tMsg, OutputPath: tmpTTS}).then(() => {
            resolve();
        });
    });
    if (!existsSync(tmpTTS)) {
        return null;
    }
    buffTTS = readFileSync(tmpTTS);
    const vWav = GetWavPCM16(buffTTS);
    const vSamples = GetSampledPCM16({Int16: vWav.Samples, OriginalRate: vWav.SampleRate, TargetRate: 8000})
    const vRadio = SetRadioEffect({Int16: vSamples, SampleRate: 8000});

    if (existsSync(prefix)) {
        let tBuffer = readFileSync(prefix);
        let tWav = GetWavPCM16(tBuffer);

        if (tWav == null) {
            try {
                const converted = join(Directory, `/${title}-tts-fixed.wav`)
                execSync(`ffmpeg -y -i "${prefix}" -ar 8000 -ac 1 -sample_fmt s16 "${converted}"`, { stdio: 'ignore' })
                if (existsSync(converted)) {
                    tBuffer = readFileSync(converted)
                    tWav = GetWavPCM16(tBuffer)
                    try { unlinkSync(converted) } catch {}
                }
            } catch (e) {}
        }

        if (tWav == null) {
            SetWarning({ 
                Title: `EAS`, 
                Message: `Intro tone isn't a valid .WAV file or isn't in PCM 16-bit format. Converted attempt failed; please convert it then try again.` 
            })
            return null;
        }

        const tSamples = (tWav.SampleRate != 8000 ? GetSampledPCM16({Int16: tWav.Samples, OriginalRate: tWav.SampleRate, TargetRate: 8000}) : tWav.Samples)
        buffRadio = SetRadioEffect({Int16: tSamples, SampleRate: 8000})
    }

    buffFull = buffRadio != null ? [buffRadio, new Int16Array(Math.floor(0.5 * 8000))] : [];
    buffFull.push(
        SetSameHeader({ VTEC: Header, Repeats: 3, SampleRate: 8000, PreMarkSec: 1.1, GapSec: 0.5 }),
        new Int16Array(Math.floor(0.5 * 8000)),
        SetAttentionTone({ MS: 8, SampleRate: 8000 }),
        new Int16Array(Math.floor(0.5 * 8000)),
        vRadio
    )
    for (let i = 0; i < 3; i++) {
        buffFull.push(SetSameHeader({ VTEC: Header, Repeats: 1, SampleRate: 8000, PreMarkSec: 0.5, GapSec: 0.1 }))
        buffFull.push(new Int16Array(Math.floor(0.5 * 8000)));
    }
    const aSamples = GetMergedPCM16(buffFull);
    const aFinal = SetNoise({ Int16: aSamples, NoiseLevel: 0.002 });
    const aBuffer = GetPCM16({ Samples: Array.from(aFinal).map(v => ({ value: v })), SampleRate: 8000 });
    writeFileSync(outTTS, aBuffer)
    try{ unlinkSync(tmpTTS) } catch {}
    SetDebug({ Title: `GenerateEASMessage`, Message: `${Math.round(performance.now() - tick)}ms` })
    return outTTS;
}


