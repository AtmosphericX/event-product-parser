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

# 2.0 - Sources & Attributes

**@atmosx/event-product-parser** supports multiple source attributes that allow you to customize how event products are ingested and processed. These configurations define the external services, connection methods, and parsing used by the parser to receive weather products. The available source configurations provide flexibility for different data ingestion requirements, allowing you to choose the appropriate source based on your application's needs while maintaining a consistent parsing experience.

> [!IMPORTANT]
> You can only use one source at any given time. Attempting to use multiple sources simultaneously will result in event conflicts and parsing issues.
# 2.1 - NOAA Weather Wire Service
[NOAA Weather Wire Service](https://www.weather.gov/nwws) is a real-time dissemination service that delivers official weather information, alerts, forecasts, products, and warnings in text format from NWS Weather Forecast Offices and National Centers. This service is designed for television and radio broadcasters, emergency managers, commercial alerting providers, private weather services, and other organizations that require rapid access to weather products.

Each alert, forecast, and observation is delivered over [XMPP](https://xmpp.org/) using the standardized [WMO Header Format](#242---world-meteorological-organization-wmo-format). This provides a consistent structure for automated processing. 

Accessing the NOAA Weather Wire Service requires credentials, which can be obtained by sending an email to [NWWS.Issue@noaa.gov](mailto:NWWS.Issue@noaa.gov).

When requesting access, provide the following information:

* Name (First and Last)
* Company
* Address
* State, City, and ZIP Code
* Telephone Number
* Account Information: Single or Multiple Accounts

NWS processing of your request may take as long as 10 days or more depending on critical weather days and NWS priority requirements.



> [!IMPORTANT]
> The National Weather Service (NWS) has officially proposed the retirement of the Satellite Broadcast Network (SBN), commonly known as NOAAPort, which could take effect as early as August 31, 2027. This means that this project will no longer look into supporting NOAAPort/SBN as a source for ingesting weather products. The NOAA Weather Wire Service (NWWS) will remain the primary source for ingesting weather products in real-time, and the NWS RESTful API will continue to provide on-demand access to weather data and products.

## 2.1.1 - Basic Settings
To configure properly, you must set **EnableWireService** to `true` and provide your credentials within **NOAAWeatherWireServiceSettings**. The following example demonstrates how to configure the parser to use the NOAA Weather Wire Service source using the `Manager` class.

```ts
new Manager({
	EnableWireService: true, // Enable NOAA Weather Wire Service (NWWS)
	NOAAWeatherWireServiceSettings: {
		CredentialSettings: {
			Username: `PUT_YOUR_USERNAME_HERE`, // Case sensitive
			Password: `PUT_YOUR_PASSWORD_HERE`, // Case sensitive
			Nickname: `PUT_YOUR_NICKNAME_HERE`, // Visible to other connected users
		}
	}
})
```

## 2.1.2 - Connection Settings
By default, the parser will attempt to reconnect if a stanza has not been received within the configured timeout period. The default reconnection interval is **60 seconds**. You can adjust this interval by modifying the **ReconnectInterval** property in **NOAAWeatherWireServiceSettings**.

```ts
NOAAWeatherWireServiceSettings: {
    ReconnectionSettings: {
        Enabled: true, // Enable auto reconnect
        ReconnectionInterval: 60, // Time since last stanza before reconnecting (seconds)
    }
}
```

## 2.1.3 - Stanza Caching & Retention
This package provides support for caching and retaining stanzas received from the XMPP client. Cached stanzas can be retained for later processing, allowing querying and analysis of historical weather products received from the NOAA Weather Wire Service. The following example demonstrates how to configure stanza caching and retention settings.

```ts
NOAAWeatherWireServiceSettings: {
	CacheSettings: {
		Enabled: true, // Enable stanza caching
		MaxDatabaseHistory: 50000, // Maximum stanzas to store in the database
		MaxRetentionHistory: 1200, // Maximum stanzas to load during startup
	},
},
```


## 2.1.4 - Stanza Processing & Filtering (Pre-Event Processing)
While processing stanzas, each one is categorized based on its contents and characteristics. This includes formats such as [CAP (Common Alerting Protocol) v1.2](https://docs.oasis-open.org/emergency/cap/v1.2/CAP-v1.2-os.html), [VTEC](https://www.weather.gov/vtec/), [UGC](https://www.weather.gov/gis/AWIPSShapefiles), and **Text** products. By default, all product categories are enabled by default which includes: 

* UGC/FIPS Based Products
* VTEC/HVTEC + UGC/FIPS Products
* Text (No UGC/FIPS/VTEC Present)


```ts
NOAAWeatherWireServiceSettings: {
	StanzaSettings: {
		DisableUGC: false, // Disables all UGC Categories
		DisableVTEC: false, // Disables all VTEC/HVTEC Categories
		DisableText: false, // Disables all RawText Categories
	}
},
```


> [!IMPORTANT]
> Please keep in mind that CAP v1.2 products are not currently supported by this package and will be ignored during processing. Support for CAP v1.2 is planned for a future release.




# 2.2 - National Weather Service API
The [National Weather Service](https://www.weather.gov/) provides a [RESTful API](https://www.weather.gov/documentation/services-web-api) for programmatically accessing weather data and products. 

Compared to the [NOAA Weather Wire Service](#21---noaa-weather-wire-service), the API introduces additional latency, with data typically delayed by 1 to 2 minutes on average. This delay is one of the primary tradeoffs when using the API instead of NOAA Weather Wire Service for real-time weather product ingestion.

The NWS API is best suited for applications that require on demand access to weather data rather than the lowest possible latency delivery of operational weather products. All responses are provided in [GeoJSON](https://geojson.org/) format, making the data straightforward to parse and integrate into applications.

# 2.2.1 - Basic Settings
The **National Weather Service API** source requires minimal configuration and is the **default source** used by the parser. To use the NWS API, simply set **EnableWireService** to `false`. The following example demonstrates how to configure the parser to use the NWS API source using the `Manager` class.

```ts
new Manager({
	EnableWireService: false, // Disable NOAA Weather Wire Service (NWWS)
	NationalWeatherServiceSettings: {
        CallbackInterval: 30, // How often it retrieves new products (Minimum: 15 seconds)
        EventsEndpoint: `https://api.weather.gov/alerts/active`, // RESTful API
    }
})
```

You can also configure the **CallbackInterval** to control how frequently the parser retrieves new products from the NWS API. The minimum allowed interval is 15 seconds, and the default is 30 seconds.

# 2.3 - NOAA Weather Wire Service vs NWS RESTful API
There are significant differences between these two sources. [NOAA Weather Wire Service](#21---noaa-weather-wire-service) requires authenticated access and is optimized for real-time product delivery, while the [NWS RESTful API](#22---national-weather-service-api) is publicly accessible and designed for on demand data retrieval.

| Feature | NOAA Weather Wire Service | NWS RESTful API |
| --- | --- | --- |
| Authentication | ✅ | ❌ |
| Real-time Delivery | ✅ | ❌ |
| WMO Formatting | ✅ | ❌ |
| Persistent Connection | ✅ | ❌ |
| Low Latency Products | ✅ | ❌ |
| Easy to Use | ❌ | ✅ |
| Publicly Accessible | ❌ | ✅ |

# 2.4 - Formatting Standards
The parser supports two primary formatting standards for weather products: **GeoJSON** and **WMO Format**. These formats provide structured representations of weather data, allowing for consistent parsing and processing of weather products.

## 2.4.1 - GeoJSON Format

[GeoJSON](https://geojson.org/) is a format for encoding a variety of geographic data structures. It is based on the JavaScript Object Notation (JSON) standard and is widely used for representing geographic features in web applications.

```json
{
	"type": "Feature",
	"geometry": {
		"type": "Polygon",
		"coordinates": [[]]
	},
	"properties": {}
}
```


## 2.4.2 - World Meteorological Organization (WMO) Format

**WMO Format** (World Meteorological Organization Format) is a standardized structure used for exchanging meteorological data, including observations, forecasts, and warnings. It provides a consistent format for weather products, allowing meteorological organizations and systems around the world to reliably share and process weather information.


```text
000
WUUS51 KLOT 000000
SVRGYX
ILC001-ILC002-
/O.NEW.XXXX.XX.X.0000.000000T0000Z-000000T0000Z/

BULLETIN - IMMEDIATE BROADCAST REQUESTED

Severe Thunderstorm Warning

National Weather Service

XXXX PM Timezone Weekday Month DD 2026

TEST EXAMPLE - TEXT EXAMPLE - TEST EXAMPLE

&&


LAT...LON 4587 6965 4585 6968 4588 6971 4587 6972

      4584 6970 4576 6972 4576 6976 4577 6978

      4574 6981 4566 6974 4565 6970 4558 6971

      4553 6978 4530 6970 4567 7054 4573 7038

      4580 7042 4589 7026 4596 7026 4598 6968

TIME...MOT...LOC 1650Z 313DEG 52KT 4600 7042


HAIL THREAT...TEST EXAMPLE

MAX HAIL SIZE...TEST EXAMPLE

WIND THREAT...TEST EXAMPLE

MAX WIND GUST...TEST EXAMPLE
```
