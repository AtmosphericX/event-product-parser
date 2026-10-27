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

## Changelogs [NOT FOR PRODUCTION USE]

### October 27th, 2026 - b3.1-0402

**Refactoring**
- ref(parser): Seperated ingestion and parsing into two seperate directories. (`Products` & `Parsing`).
- ref(stanza): Renamed `ProcessStanza.ts` -> `IngestStanza.ts` and moved to `Manager` directory.
- ref(awips): Renamed `GetAwipsType` -> `GetStanzaType`

**Features**
- feat(exports): Exported parsing classes for use in other projects.

**Documentation**
- feat(docs): Add `AGENTS.md` file to provide instructions to **NOT** use AI agents on this codebase. That includes scraping, indexing, and code generation. This is to protect the intellectual property of the project and to ensure that the codebase is not misused or misrepresented.

**Todo**
- chore(building): Complete all building export functions
- chore(parsing): Complete all parsing classes
- chore(products): Complete all product ingestions (Cap 1.2, VTEC, GeoJSON, Text)
- chore(api): Integrate National Weather Service API for product retrieval and ingestion.
- chore(host): Integrate shared ingestion hosting while using NWWS-OI.

------------------------------------------------------------------------------------------------------------------------

### October 26th, 2026 - b3.1-0401

**Refactoring**
- ref(types): Refactored all types and corrected pathing for imports.
- ref(parsing): Refactored types and interfaces for parsing classes.
- ref(products): Changed file name `CAPProduct` -> `CommonAlertingProtocolProduct`.
- ref(products): Changed file name `VTECProduct` -> `ValidTimeProduct`.

**Features**
- feat(ConstructClassTimer): Added a `ConstructClassTimer` utility to allow for monitoring of class construction times for performance testing, optimization, and debugging.

**Packages**
- chore(xml2js): Enforce `0.6.2` version of `xml2js` to avoid breaking changes in future versions.

------------------------------------------------------------------------------------------------------------------------

### October 25th, 2026 - b3.1-04

**Refactoring**
- ref(parsing): Refactored all parsing into classes to allow for better testing and maintainability.

**Features**
- feat(enhanced): Snow Squall Warning events now have a `snowsquall_threat` parameter that can be used to determine if the event is `OBSERVED` or `RADAR INDICATED`. This will allow for better filtering of events in the system.