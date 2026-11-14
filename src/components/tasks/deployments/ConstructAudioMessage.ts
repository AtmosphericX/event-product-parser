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

import { ENUM_STRINGS } from "@Enums/Strings"
import { Bootstrap } from "@Bootstrap"
import { SetLog } from "@Components.Utilities/SetLog"
import { join } from "node:path"
import { existsSync, mkdirSync, readFileSync, writeFileSync, unlinkSync } from "node:fs"
import { platform } from "node:os"
import { execSync } from "node:child_process"

interface CONSTRUCT_AUDIO_MESSAGE_OPTIONS {
    Message: string
    Header: string
    File: string
}

export class ConstructAudioMessage { 
    private pSetFilename: string;
    private pSetHeader: string;
    private pBufferTTS: Buffer;
    private pSampleRate: number;
    private pBufferRadio: Int16Array;
    private pBufferComplete: (Int16Array | null)[];
    private pPlatform: string = platform();
    private pPowerShellCommandFix: string = `ffmpeg -y -i "%s" -ar 8000 -ac 1 -sample_fmt s16 "%d"`
    private pPowerShellCommandTTS: string[] = [
        `Add-Type -AssemblyName System.Speech;`,
        `$speak = New-Object System.Speech.Synthesis.SpeechSynthesizer;`,
        `$text = Get-Content -Raw -LiteralPath '%s';`,
        `$speak.SetOutputToWaveFile('%d');`,
        `$speak.Speak($text);`,
        `$speak.Dispose();`
    ]

    private ENUM_AUDIO_MESSAGES: { RegEx: RegExp; Replace: string }[] = [
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
    private ENUM_HOURS: Record<number, string> = {
        0: "twelve", 1: "one", 2: "two", 3: "three", 4: "four",
        5: "five", 6: "six", 7: "seven", 8: "eight", 9: "nine",
        10: "ten", 11: "eleven", 12: "twelve",
    }

    public async Construct({ Message, Header, File }: CONSTRUCT_AUDIO_MESSAGE_OPTIONS): Promise<void> { 
        const { Audio, AudioGeneration } = Bootstrap.Settings.GlobalSettings.Generation;
        const { Toneout, SampleRate } = AudioGeneration;

        this.pSetFilename = File
            .replace(/[\\:*?"<>|]/g, "_")
            .replace(/\s+/g, " ")
            .trim();
        this.pSetHeader = Header
            .replace(/[\\:*?"<>|]/g, "_")
            .replace(/\s+/g, " ")
            .trim();

        if (!existsSync(Audio)) mkdirSync(Audio, { recursive: true });

        const cTempTTS = join(Audio, `${this.pSetFilename}.tts.wav`);
        const cOutputAudio = join(Audio, `${this.pSetFilename}.wav`);

        if (this.pPlatform === `darwin`) {
            SetLog({ Type: `ERROR`, Message: ENUM_STRINGS.TASKS.AUDIO_GENERATION_NOT_SUPPORTED.replace(/%s/g, this.pPlatform) })
            return null;
        }

        await this.GenerateTextToSpeech(this.GetCleanMessageOutput(Message), cTempTTS);
        if (!existsSync(cTempTTS)) return null;

        this.pBufferTTS = readFileSync(cTempTTS);
        this.pSampleRate = SampleRate;

        const cWavePCM16 = this.GetWavPCM16(this.pBufferTTS);
        const cSamples = this.GetSampledPCM16(cWavePCM16.Samples, cWavePCM16.SampleRate);
        const sRadioEffect = this.SetRadioEffect(cSamples);
        const sToneoutBuffer = Toneout ? this.SetToneoutBuffer(Toneout, Audio) : null;

        this.pBufferComplete = this.pBufferComplete != null ? [sToneoutBuffer, new Int16Array(Math.floor(0.5 * 8000))] : [];
        this.pBufferComplete.push(
            Toneout ? sToneoutBuffer : null,
            this.SetHeader(this.pSetHeader, 3, 1.3, 0.5),
            new Int16Array(Math.floor(0.5 * 8000)),
            this.SetAttentionTone(8e3),
            new Int16Array(Math.floor(0.5 * 8000)),
            sRadioEffect,
            new Int16Array(Math.floor(0.5 * 8000)),
            this.SetHeader(this.pSetHeader, 3, 0.8, 0.4),
            new Int16Array(Math.floor(0.5 * 8000))
        )
        
        const cBuffers = this.pBufferComplete.filter((lValue): lValue is Int16Array => lValue != null);
        const cSamplesMerged = new Int16Array(cBuffers.reduce((lTotal, lBuffer) => lTotal + lBuffer.length, 0));
        let lOffset = 0;
        for (const lBuffer of cBuffers) {
            cSamplesMerged.set(lBuffer, lOffset);
            lOffset += lBuffer.length;
        }
        const cFinalNoise = this.SetNoise(cSamplesMerged, 0.002);
        const cBufferComplete = this.GetPCM16(Array.from(cFinalNoise).map((lValue) => ({ value: lValue })), SampleRate);
        writeFileSync(cOutputAudio, cBufferComplete)
        unlinkSync(cTempTTS);
    }

    private SetToneoutBuffer(Toneout: string, Directory: string): Int16Array {
        if (existsSync(Toneout)) { 
            let lBuffer = readFileSync(Toneout);
            let lWav = this.GetWavPCM16(lBuffer);
            if (lWav == null) {
                const cConcert = join(Directory, `${this.pSetFilename}.fixed.wav`);
                execSync(this.pPowerShellCommandFix.replace(/%s/g, Toneout).replace(/%d/g, cConcert));
                if (existsSync(cConcert)) {
                    lBuffer = readFileSync(cConcert);
                    lWav = this.GetWavPCM16(lBuffer);
                    unlinkSync(cConcert);
                }
            }
            if (lWav == null) { 
                SetLog({ Type: `ERROR`, Message: ENUM_STRINGS.TASKS.AUDIO_GENERATION_TONEOUT_NOT_SUPPORTED }) 
                return null;
            }
            const cSamplesToneout = (lWav.SampleRate != this.pSampleRate) ? this.GetSampledPCM16(lWav.Samples, lWav.SampleRate) : lWav.Samples;
            this.pBufferRadio = this.SetRadioEffect(cSamplesToneout);
            return this.pBufferRadio;
        }
    }

    private SetNoise(Int16: Int16Array, NoiseLevel: number): Int16Array {
        const cFloat = this.GetPCMToFloat(Int16);
        let lPeak = 0;
        for (let i = 0; i < cFloat.length; i++) cFloat[i] += (Math.random() * 2 - 1) * (NoiseLevel ?? 0.02);
        for (let i = 0; i < cFloat.length; i++) lPeak = Math.max(lPeak, Math.abs(cFloat[i]));
        if (lPeak > 1) for (let i = 0; i < cFloat.length; i++) cFloat[i] *= 0.98 / lPeak;
        return this.GetFloatPCM16(cFloat);
    }

    private SetAttentionTone(Milliseconds: number): Int16Array {
        const cLength = Math.floor((Milliseconds / 1000) * this.pSampleRate);
        const cOutput = new Int16Array(cLength);
        const cF1 = 853;
        const cF2 = 960;
        const cTwoPi = Math.PI * 2;
        const cAmplitude = 0.1;
        const cFadeLen = Math.floor(this.pSampleRate * 0.00); 
        for (let i = 0; i < cLength; i++) {
            const t = i / this.pSampleRate;
            const s = Math.sin(cTwoPi * cF1 * t) + Math.sin(cTwoPi * cF2 * t);
            let gain = 1;
            if (i < cFadeLen) gain = i / cFadeLen;
            else if (i > cLength - cFadeLen) gain = (cLength - i) / cFadeLen;
            const v = Math.max(-1, Math.min(1, (s / 2) * cAmplitude * gain));
            cOutput[i] = Math.round(v * 32767);
        }
        return cOutput;
    }

    private SetHeader(Header: string, Repeats: number, PreMarkSeconds: number = 0.3, GapSeconds: number = 0.1): Int16Array {
        const cBursts: Int16Array[] = [];
        const cGap = new Int16Array(Math.floor(GapSeconds * this.pSampleRate));
        for (let i = 0; i < Repeats; i++) {
            const cBodyBits = this.SetAsciiToBits(Header);
            const body = this.SetASFK(cBodyBits);
            const extendedBodyDuration = Math.round(PreMarkSeconds * this.pSampleRate);
            const extendedBody = new Int16Array(extendedBodyDuration + cGap.length);
            for (let j = 0; j < extendedBodyDuration; j++) { 
                extendedBody[j] = Math.round(body[j % body.length] * 0.2); 
            }
            extendedBody.set(cGap, extendedBodyDuration);
            cBursts.push(extendedBody);
            if (i !== Repeats - 1) cBursts.push(cGap);
        }
        const cOutput = new Int16Array(cBursts.reduce((lTotal, lBurst) => lTotal + lBurst.length, 0));
        let lOffset = 0;
        for (const lBurst of cBursts) {
            cOutput.set(lBurst, lOffset);
            lOffset += lBurst.length;
        }
        return cOutput;
    }

    private SetASFK(Bits: number[]): Int16Array {
        const cBaud = 520.83;
        const cMarkFreq = 2083.3;
        const cSpaceFreq = 1562.5;
        const cAmplitude = 0.6;
        const cTwoPi = Math.PI * 2;
        const cResult = [];
        let lPhase = 0;
        let lFrac = 0;
        for (let b = 0; b < Bits.length; b++) {
            const cBut = Bits[b];
            const cFrequency = cBut ? cMarkFreq : cSpaceFreq;
            const cSamplesPerBit = this.pSampleRate / cBaud + lFrac;
            const n = Math.round(cSamplesPerBit);
            lFrac = cSamplesPerBit - n;
            const cInc = cTwoPi * cFrequency / this.pSampleRate;
            for (let i = 0; i < n; i++) {
                cResult.push(Math.round(Math.sin(lPhase) * cAmplitude * 32767));
                lPhase += cInc;
                if (lPhase > cTwoPi) lPhase -= cTwoPi;
            }
        }

        const cFadeSamples = Math.floor(this.pSampleRate * 0.002);
        for (let i = 0; i < cFadeSamples; i++) {
            const gain = i / cFadeSamples;
            cResult[i] = Math.round(cResult[i] * gain);
            cResult[cResult.length - 1 - i] = Math.round(cResult[cResult.length - 1 - i] * gain);
        }

        return Int16Array.from(cResult);
    }

    private SetAsciiToBits(Message: string): number[] {
        const cBits = [];
        for (let i = 0; i < Message.length; i++) {
            const c = Message.charCodeAt(i) & 0xFF;
            cBits.push(0);
            for (let b = 0; b < 8; b++) cBits.push((c >> b) & 1);
            cBits.push(1, 1);
        }
        return cBits;
    }

    private GetWavPCM16(Buffer: Buffer): { Samples: Int16Array, NumChannels: number, BitsPerSample: number, SampleRate: number } | null {
        if (Buffer.toString("ascii", 0, 4) !== "RIFF" || Buffer.toString("ascii", 8, 12) !== "WAVE") return null;

        let lFMT, lData = null;
        let lChannels = 12;

        while (lChannels + 8 <= Buffer.length) {
            const cID = Buffer.toString("ascii", lChannels, lChannels + 4);
            const cSize = Buffer.readUInt32LE(lChannels + 4);
            const cStart = lChannels + 8;
            const cEnd = cStart + cSize;
            if (cID === "fmt ") lFMT = Buffer.slice(cStart, cEnd);
            if (cID === "data") lData = Buffer.slice(cStart, cEnd);
            lChannels = cEnd + (cSize % 2); 
        }

        if (!lFMT || !lData) return null;

        const cAudioFormat = lFMT.readUInt16LE(0);
        const cChannels = lFMT.readUInt16LE(2);
        const cSampleRate = lFMT.readUInt32LE(4);
        const cBitsSample = lFMT.readUInt16LE(14);

        if (cAudioFormat !== 1 || cBitsSample !== 16 || cChannels !== 1) return null;

        const cSamples = new Int16Array(lData.buffer, lData.byteOffset, lData.length / 2);

        return { 
            Samples: new Int16Array(cSamples), 
            SampleRate: cSampleRate, 
            NumChannels: cChannels, 
            BitsPerSample: cBitsSample 
        };
    }

    private GetSampledPCM16(Int16: Int16Array, OriginalRate: number): Int16Array {
        if (OriginalRate === this.pSampleRate) return Int16;
        const cRatio = this.pSampleRate / OriginalRate;
        const cOutputLength = Math.max(1, Math.round(Int16.length * cRatio));
        const cOutput = new Int16Array(cOutputLength);
        for (let i = 0; i < cOutputLength; i++) {
            const cPosition = i / cRatio;
            const cI0 = Math.floor(cPosition);
            const cI1 = Math.min(cI0 + 1, Int16.length - 1);
            const cFrac = cPosition - cI0;
            const cV = Int16[cI0] * (1 - cFrac) + Int16[cI1] * cFrac;
            cOutput[i] = Math.round(cV);
        }
        return cOutput;
    }

    private SetRadioEffect(Int16: Int16Array): Int16Array {
        let lHP = 0, lPrev = 0, lYLP = 0;
        
        const cGain = 2.0;
        const cNormalize = Math.tanh(cGain);
        const cHPCut = 3555;
        const cLPCut = 1600;
        const cFloat = this.GetPCMToFloat(Int16);
        const cDT = 1 / this.pSampleRate;
        const cRCHP = 1 / (2 * Math.PI * cHPCut);
        const cAHP = cRCHP / (cRCHP + cDT);
        
        for (let i = 0; i < cFloat.length; i++) {
            const cXI = cFloat[i];
            lHP = cAHP * (lHP + cXI - lPrev);
            lPrev = cXI;
            cFloat[i] = lHP;
        }
        const cRCLP = 1 / (2 * Math.PI * cLPCut);
        const cALP = cDT / (cRCLP + cDT);
        
        for (let i = 0; i < cFloat.length; i++) {
            lYLP = lYLP + cALP * (cFloat[i] - lYLP);
            cFloat[i] = lYLP;
        }
        
        for (let i = 0; i < cFloat.length; i++) cFloat[i] = Math.tanh(cFloat[i] * cGain) / cNormalize;
        return this.GetFloatPCM16(cFloat);
    }

    private GetPCM16(Samples: Record<string, number>[], SampleRate: number): Buffer {
        let lOutput = 0;
        const cBytesPerSample = 2;
        const cBlockAlign = 1 * cBytesPerSample;
        const cByteRate = SampleRate * cBlockAlign;
        const cSubchunk2Size = Samples.length * cBytesPerSample;
        const cChunkSize = 36 + cSubchunk2Size;
        const cBuffer = Buffer.alloc(44 + cSubchunk2Size);
    
        cBuffer.write("RIFF", lOutput); lOutput += 4;
        cBuffer.writeUInt32LE(cChunkSize, lOutput); lOutput += 4;
        cBuffer.write("WAVE", lOutput); lOutput += 4;

        cBuffer.write("fmt ", lOutput); lOutput += 4;
        cBuffer.writeUInt32LE(16, lOutput); lOutput += 4;                 
        cBuffer.writeUInt16LE(1, lOutput); lOutput += 2;                  
        cBuffer.writeUInt16LE(1, lOutput); lOutput += 2;
        cBuffer.writeUInt32LE(SampleRate, lOutput); lOutput += 4;
        cBuffer.writeUInt32LE(cByteRate, lOutput); lOutput += 4;
        cBuffer.writeUInt16LE(cBlockAlign, lOutput); lOutput += 2;
        cBuffer.writeUInt16LE(16, lOutput); lOutput += 2;

        cBuffer.write("data", lOutput); lOutput += 4;
        cBuffer.writeUInt32LE(cSubchunk2Size, lOutput); lOutput += 4;

        for (let i = 0; i < Samples.length; i++, lOutput += 2) {
            cBuffer.writeInt16LE(Samples[i].value, lOutput);
        }
        return cBuffer;
    }

    private GetFloatPCM16(Float32: Float32Array): Int16Array {
        const cOutput = new Int16Array(Float32.length);
        for (let i = 0; i < Float32.length; i++) {
            let v = Math.max(-1, Math.min(1, Float32[i]));
            cOutput[i] = Math.round(v * 32767);
        }
        return cOutput;
    }

    private GetPCMToFloat(Int16: Int16Array): Float32Array {
        const cOutput = new Float32Array(Int16.length);
        for (let i = 0; i < Int16.length; i++) cOutput[i] = Int16[i] / 32768;
        return cOutput;
    }

    private async GenerateTextToSpeech(Message: string, OutputFile: string): Promise<void> {
        switch (this.pPlatform) {
            case `win32`: 
                const cTextPath = `${OutputFile}.txt`;
                const cCommand = this.pPowerShellCommandTTS
                    .map(lCommand => lCommand.replace(/%s/g, cTextPath).replace(/%d/g, OutputFile))
                    .join(` `);
                writeFileSync(cTextPath, Message, { encoding: "utf-8" });
                execSync(`powershell -Command "${cCommand}"`, { stdio: "inherit" });
                unlinkSync(cTextPath);
                break;
            case `linux`:
                execSync(`espeak -w "${OutputFile}" "${Message.replace(/"/g, '\\"')}"`, { stdio: "inherit" });
                break;
            default: 
                SetLog({ Type: `ERROR`, Message: ENUM_STRINGS.TASKS.AUDIO_GENERATION_NOT_SUPPORTED.replace(/%s/g, this.pPlatform) });
                break;
        }
    }

    private GetCleanMessageOutput(Message: string): string { 
        const cCallClockMessage = (lMinute: number) =>  lMinute === 0 ? "" : lMinute < 10 ? `oh ${lMinute}` : `${lMinute}`;
        const cCallFMT = (lHour: number, lMinute: number, lAMPM: string) => `${this.ENUM_HOURS[lHour % 12]} ${cCallClockMessage(lMinute)} ${lAMPM}`;
        for (const { RegEx, Replace } of this.ENUM_AUDIO_MESSAGES) {
            Message = Message.replace(RegEx, Replace);
        }
        return Message
            .replace(/'/g, "''")
            .replace(/\b(\d{1,2}):(\d{2})\s*(AM|PM)\b/gi, (_, h, m, ap) => cCallFMT(+h, +m, ap.toUpperCase()))
            .replace(/\b(\d{1,2})\s+(\d{2})\s+(AM|PM)\b/gi, (_, h, m, ap) => cCallFMT(+h, +m, ap.toUpperCase()))
            .replace(/\b(\d{2})(\d{2})\s+(AM|PM)\b/gi, (_, hh, mm, ap) => cCallFMT(+hh, +mm, ap.toUpperCase()))
            .replace(/\b(\d{1,2})\s+(AM|PM)\b/gi, (_, h, ap) => cCallFMT(+h, 0, ap.toUpperCase()))
            .replace(/\*+/g, " ")
            .replace(/-/g, " ")
            .replace(/\n/g, " ")
            .trim();
    }
}