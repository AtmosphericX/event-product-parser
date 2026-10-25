<div align="center" style="margin-top: 20px;">
    <a href="https://atmosphericx.scriptkitty.cafe">
        <img src="https://scriptkitty.cafe/ftp/@atmosphericx/assets/logo-event-product-parser.png"
             alt="@atmosx/event-product-parser"
             width="800"/>
    </a>
    <p style="font-size: 1.1em; max-width: 700px;">
        A robust TypeScript/JavaScript library for parsing and ingesting NOAA and NWS Weather Text Products, CAP 1.2, and features an expanded suite of quality‑of‑life tools for faster, cleaner, and more reliable development.
    </p>
    <small style="display: block; margin-top: 10px;">
        Built and maintained with ❤️ by the AtmosphericX team<br>
        <i>Not affiliated with NOAA or NWS</i>
    </small>
    <hr style="width: 60%; margin: 25px auto; opacity: 0.3;">
    <p style="text-align: center; font-size: 1.05em;">
        <a href="https://atmosphericx.scriptkitty.cafe"><b>Official Documentation</b></a> &nbsp;•&nbsp;
        <a href="https://github.com/AtmosphericX"><b>Github Organization</b></a> &nbsp;•&nbsp;
        <a href="https://www.npmjs.com/search?q=%40atmosx"><b>Packages</b></a> &nbsp;•&nbsp;
        <a href="/.github/CHANGELOGS.md"><b>Changelogs</b></a> &nbsp;•&nbsp;
        <a href="https://atmosphericx-discord.scriptkitty.cafe"><b>Community Discord</b></a>
    </p>
</div>

## Introduction
Formally known as *atmosx-nwws-parser*, **@atmosx/event-product-parser** is a TypeScript/JavaScript library designed to parse and ingest NOAA and NWS Weather Text Products, CAP 1.2, and other related data formats. It includes quality of life features such as ingestion tools, graphics generation, audio output, and additional utilities.


### Package Installation

**Node Package Manager (NPM)**: 
```bash
$ npm install @atmosx/event-product-parser
```

**Performant Node Package Manager (PNPM)**:
```bash
$ pnpm install @atmosx/event-product-parser
```

### Usage

**Typescript**:
```typescript
import { Manager } from "@atmosx/event-product-parser"
const manager = new Manager({...settings})
```

**Javascript**:
```javascript
const { Manager } = require("@atmosx/event-product-parser");
const manager = new Manager({...settings});
```