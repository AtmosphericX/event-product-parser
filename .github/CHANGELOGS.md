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

## Changelogs

### October 6th, 2026 - b3.1-03

**Bug Fixes**
- fix(expiration): Fixed issue with expiration being set to `undefined` for certain products. This was due to a missing check for `expiration` in the `ParseText` function. Now, if `expiration` is not set, it will default to 2 minutes after the issued time.

------------------------------------------------------------------------------------------------------------------------

### October 5th, 2026 - b3.1-02

**Bug Fixes**
- fix(polygons): Polygon parsing through text has been updated to handle edge cases with non `MOT`/`LOC` text. This should resolve issues with certain products not being parsed correctly.
- fix(graphics): Fixed non zoned based images from being skipped.
- fix(manual): Fixed tracking ids from being the same for every manual event. Will be unique for each event now.

**Features**
- feat(manual): Added ability to pass a tracking id to the manual event processor. This will allow for better tracking of events in the system.
- feat(themes): Added Mesoscale Persipitation Discussion (FFG) themes.
- feat(awips): Updated Flash Flood Guidance -> Mesoscale Precipitation Discussion.
- feat(expires): Added `GetExpiryFromProduct` function to get `VALID X-X` expiry from text products.
- feat(themes): Updated `*Special Weather Statement*` theme to a more accurate color.
- feat(ParseText): Updated expires to use `GetExpiryFromProduct` function to get `VALID X-X` expiry from text products.

------------------------------------------------------------------------------------------------------------------------

### September 23rd, 2026 - b3.1-01

**Documentation**
- feat(github): Added additional documentation event settings, tasks, and filtering
- feat(github): Remove `!DANGER` and replace with `!WARNING` due to github markdown rendering issues.

------------------------------------------------------------------------------------------------------------------------

### September 21st, 2026 - b3.1

**Features**
- add(theme): Ability to overwrite the default themes using `Manager.GlobalSettings.Themes`
- add(nodes): Adds nearest location metadata.

**Documentation**
- feat(github): Added `CHANGELOGS.md` file to the repository for better version tracking and release notes for future releases. See [Changelogs](https://raw.githubusercontent.com/AtmosphericX/AtmosphericX/refs/heads/main/.github/CHANGELOG.md) for prior updates and release notes.
- feat(github): Added `CODE_OF_CONDUCT.md` and `CONTRIBUTING.md` files to the repository for better community engagement and contribution guidelines.
- feat(github): Added `SECURITY.md` file to the repository to outline security policies and procedures for reporting vulnerabilities.
- feat(github): Improved the documentation pathing.
- feat(docuimentation): Added `FUNDING.yaml` file to the repository to provide information on how to support the project financially.

**Updates**
- update(settings): `DebugDisableAllEvents` -> DeveloperDisableEvents.
- update(settings): `EnableDebugging` -> DeveloperMode.
- update(settings): `EnhancedEventJournaling` -> DeveloperEventLogging.
- update(settings): `NodeTTL` -> NodePolygonTTL.

**Deprecations**
- deprecate(esm): ESM support is now deprecated. Please use the CJS version of the library instead.


------------------------------------------------------------------------------------------------------------------------
See [Changelogs](https://raw.githubusercontent.com/AtmosphericX/AtmosphericX/refs/heads/main/.github/CHANGELOG.md) for prior updates and release notes.