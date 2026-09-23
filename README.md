<div align="center" style="margin-top: 20px;">
    <a href="https://atmosphericx.scriptkitty.cafe">
        <img src="https://scriptkitty.cafe/ftp/@atmosphericx/assets/logo-event-product-parser.png"
             alt="@atmosx/event-product-parser"
             width="800"/>
    </a>
    <p style="font-size: 1.1em; max-width: 700px;">
        A robust TypeScript/JavaScript library for parsing and ingesting NOAA and NWS Weather Text Products, featuring an expanded suite of quality‑of‑life tools for faster, cleaner, and more reliable development.
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

## Table of Contents
* [1.0 - Introduction](#introduction)
    - [1.1 - Package Installation](#package-installation)
    - [1.2 - Usage](#usage)
* [2.0 - Sources & Attributes](/.github/docs/chapters/sources-and-attributes.md)
    * [2.1 - NOAA Weather Wire Service](/.github/docs/chapters/sources-and-attributes.md#21--noaa-weather-wire-service)
        * [2.1.1 - Basic Settings](/.github/docs/chapters/sources-and-attributes.md#211---basic-settings)
        * [2.1.2 - Connection Settings](/.github/docs/chapters/sources-and-attributes.md#212---connection-settings)
        * [2.1.3 - Stanza Caching & Retention](/.github/docs/chapters/sources-and-attributes.md#213---stanza-caching--retention)
        * [2.1.4 - Stanza Processing & Filtering (Pre-Event Processing)](/.github/docs/chapters/sources-and-attributes.md#214---stanza-processing--filtering-pre-event-processing)
    * [2.2 - National Weather Service API](/.github/docs/chapters/sources-and-attributes.md#22---national-weather-service-api)
        * [2.2.1 - Basic Settings](/.github/docs/chapters/sources-and-attributes.md#221---basic-settings)
    * [2.3 - NOAA Weather Wire Service vs NWS RESTful API](/.github/docs/chapters/sources-and-attributes.md#23---noaa-weather-wire-service-vs-nws-restful-api)
    * [2.4 - Formatting Standards](/.github/docs/chapters/sources-and-attributes.md#24---formatting-standards)
        * [2.4.1 - GeoJSON Format](/.github/docs/chapters/sources-and-attributes.md#241---geojson-format)
        * [2.4.2 - World Meteorological Organization (WMO) Format](/.github/docs/chapters/sources-and-attributes.md#242---world-meteorological-organization-wmo-format)
* [3.0 - Configurations](/.github/docs/chapters/general-configurations.md)
    * [3.1 - Core Configurations](/.github/docs/chapters/general-configurations.md#31---core-configurations)
        * [3.1.1 - Timezone Handling](/.github/docs/chapters/general-configurations.md#311---timezone-handling)
        * [3.1.2 - Database Management](/.github/docs/chapters/general-configurations.md#312---database-management)
        * [3.1.3 - Broadcastify Management & Filtering](/.github/docs/chapters/general-configurations.md#313---broadcastify-management--filtering)
        * [3.1.4 - Boundary & Population Data Management](/.github/docs/chapters/general-configurations.md#314---boundary--population-data-management)
        * [3.1.5 - NTFY Mobile Push Notifications](/.github/docs/chapters/general-configurations.md#315---ntfy-mobile-push-notifications)
        * [3.1.6 - Action Settings](/.github/docs/chapters/general-configurations.md#316---action-settings)
    * [3.2 - Global Settings & Filters](/.github/docs/chapters/general-configurations.md#32---global-settings--filters)
        * [3.2.1 - Polygon Products](/.github/docs/chapters/general-configurations.md#321---polygon-products)
            * [3.2.11 - Geometry Parsing](/.github/docs/chapters/general-configurations.md#3211---geometry-parsing)
            * [3.2.12 - Shapefile Coordinate Parsing](/.github/docs/chapters/general-configurations.md#3212---shapefile-coordinate-parsing)
            * [3.2.13 - Population Data (Polygon Area)](/.github/docs/chapters/general-configurations.md#3213---population-data-polygon-area)
            * [3.2.14 - Nodes & Polygon Filtering](/.github/docs/chapters/general-configurations.md#3214---nodes--polygon-filtering)



        - [3.2.2 - Product Filtering](/.github/docs/chapters/general-configurations.md#322---event-filtering)
            - [3.2.21 - The Basics](/.github/docs/chapters/general-configurations.md#3221---basic-filters)
            - [3.2.22 - Ignoring Products](/.github/docs/chapters/general-configurations.md#3222---ignoring-products)
        - [3.2.3 - Themes](/.github/docs/chapters/general-configurations.md#323---themes)
        - [3.2.4 - Archive Settings](/.github/docs/chapters/general-configurations.md#324---archive-settings)
            - [3.2.41 - TTL (Time To Live)](/.github/docs/chapters/general-configurations.md#3241---ttl-time-to-live)
            - [3.2.42 - Archives & Directories](/.github/docs/chapters/general-configurations.md#3242---archives--directories)
            - [3.2.43 - Logo & Toneouts](/.github/docs/chapters/general-configurations.md#3243---logo--toneouts)
- [4.0 - Node Tracking](/.github/docs/chapters/node-tracking.md)
- [5.0 - Graphic Generation](/.github/docs/chapters/graphic-generation.md)
- [6.0 - Audio Generation](/.github/docs/chapters/audio-generation.md)
- [7.0 - File Generation](/.github/docs/chapters/file-generation.md)
- [8.0 - Integrations](/.github/docs/chapters/integrations.md)

## Introduction
Formally known as *atmosx-nwws-parser*, **@atmosx/event-product-parser** is a TypeScript/JavaScript library designed to parse and ingest NOAA and NWS Weather Text Products. It includes quality of life features such as ingestion tools, graphics generation, audio output, and additional utilities.


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