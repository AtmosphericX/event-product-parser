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

### September 23rd, 2026 - b3.1-01

**Documentation**
- feat(github): Added additional documentation event settings, tasks, and filtering

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