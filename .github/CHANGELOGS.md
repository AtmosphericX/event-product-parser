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

### October 29th, 2026 - b3.1-0402

**Refactoring**
- ref(parser): Separated ingestion and parsing into two separate directories. (`Products` & `Parsing`).
- ref(stanza): Renamed `ProcessStanza.ts` -> `IngestStanza.ts` and moved to `Manager` directory.
- ref(awips): Renamed `GetAwipsType` -> `GetStanzaType`
- ref(exports): Updated exports to have a dedicate `exports.ts` file which is imported within the main entry point of the project.
- ref(exports): Created a directory for all export related functions `@Components.Exports` -> `src/components/exports`.
- ref(deploy): Updated XMPP Deployment `onStanza` to no longer handle `Ignored` stanzas.
- ref(deploy): Removed await for `CreateStanza` and `IngestStanza` in `onStanza`

**Features**
- feat(exports): Exported parsing classes for use in other projects.
- feat(exports): Added `GetArchivedProducts` which retrieves archives from `iastate.edu` using PIL and a specified limit.
- feat(exports): Added `ConstructProduct` which allows for manual event creation of products. (Supports CAP v1.2 and Text Products)
- feat(exports): Added parsing classes to the exports for use in other projects. (ValidTimeEventCodeParsing, TextProductParsing, GeographicalCodeParsing, CommonAlertingProtocolParsing)
- feat(strings): Added API strings such as `NWS_EVENTS` and `ARCHIVED_PRODUCTS`.
- feat(strings): Added `NOT_INITIALIZED` string for database not initialized error message.
- feat(types): `TYPE_STANZA_COMPILED` no longer contained `Ignored` bool for stanza processing.

**Documentation**
- feat(docs): Add `AGENTS.md` file to provide instructions to **NOT** use AI agents on this codebase. That includes scraping, indexing, and code generation. This is to protect the intellectual property of the project and to ensure that the codebase is not misused or misrepresented.
- feat(docs): Include `testing` directory and `npm` scripts for running tests with the exports.
- feat(docs): Added dependencies section to the documentation. (README.md)
- chore(LICENSE): Fixed LICENSE section in the documentation.
- chore(LICENSE): Enforce license restrictions on AI use.

**Packages**
- chore(xml2js): Enforce `0.6.2` version of `xml2js` to avoid breaking changes in future versions.

**Todo**
- chore(building): Complete all building export functions
- chore(parsing): Complete all parsing classes
- chore(products): Complete all product ingestions (Cap 1.2, VTEC, GeoJSON, Text)
- chore(api): Integrate National Weather Service API for product retrieval and ingestion.
- chore(host): Integrate shared ingestion hosting while using NWWS-OI.
- chore(tasks): NTFY integration.
- chore(tasks): Webhook integration.
- chore(tasks): File generation.

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