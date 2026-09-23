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

# 3.0 - Configurations
**@atmosx/event-product-parser** provides a wide range of configuration options, from basic event handling and management to advanced filtering capabilities and customizable event properties. This documentation provides an overview of every available configuration, including event settings, filtering options, and parser behavior, along with detailed explanations and practical examples to help you configure the parser for your specific use case.

# 3.1 - Core Configurations
Core configurations are the fundamental settings that govern the behavior of the parser. These configurations include timezone handling, database management, Broadcastify feed management, boundary and population data management, NTFY mobile push notifications, and action settings.

## 3.1.1 - Timezone Handling
Timezone handling is used to ensure that all event timestamps, push notifications, and other time sensitive operations are correctly aligned with the desired timezone. The parser supports both local and UTC timezones, allowing you to configure the parser to match your application's requirements.

```ts
new Manager({
    Timezone: 'UTC', // 'America/New_York', 'Europe/London', etc. are also valid options
})
```

## 3.1.2 - Database Management
Databases are used to store and manage stanzas, geographic data, population, broadcastify feeds, and other relevant information that must be stored and easily accessed by the parser. By default, a path is already defined for the database, but you can customize the path to suit your application's needs.

```ts
new Manager({
    Database: `product-parser-operations.db`, // Custom database path
})
```

> [!WARNING]
> It is imperative that you wait for **ALL** database operations to complete before forcing your application to close. Failure to do so may prevent important data from being fully processed, resulting in missing or incomplete records. If the application is restarted before the database has finished building, you must delete the existing database and allow the parser to rebuild it from scratch. A message will be logged to the console if the database is fully built and ready for use. All event processing is haulted until the database is fully built and ready for use.



## 3.1.3 - Broadcastify Management & Filtering
Broadcastify feeds can be attached to events based on their geographical location. The parser can filter available feeds by proximity, ensuring that events are associated only with relevant nearby feeds and providing additional audio context when available.

```ts
new Manager({
    BroadcastifySettings: {
        BroadcastifyAttachments: true, // Enable atatchment of Broadcastify feeds to events
        BroadcastifyDatabase: `https://scriptkitty.cafe/ftp/@atmosphericx/assets/broadcastify.json`,
        BroadcastifyTags: [`Ham`, `Air`, `Fire`, `Public Safety`, `Weather`, `EMS`, `Police`, `Rail`] // Filter by specific tags
    }
})
```

> [!IMPORTANT]
> The availability of Broadcastify feeds are sourced from `scriptkitty.cafe` and are updated once per month. If you have any questions regarding the availability of Broadcastify feeds, please feel free to contact me directly.

## 3.1.4 - Boundary & Population Data Management
Boundary and population data provide additional geographic context for events, support the generation of graphics, and contribute to the calculation of a severity index based on the population potentially affected by an event. The parser uses proximity to associate events with relevant boundary and population data. This feature does not require any configuration. The required `.json` files are statically sourced from the `scriptkitty.cafe` server and are automatically retrieved by the parser.

```ts
new Manager({
    BoundarySettings: {
        BoundaryDatabase: `https://scriptkitty.cafe/ftp/@atmosphericx/assets/counties-10m.json`,
        CityDatabase: `https://scriptkitty.cafe/ftp/@atmosphericx/assets/cities500.json`
    },
})
```

## 3.1.5 - NTFY Mobile Push Notifications
This core parser feature enables mobile push notifications through the ntfy service. Notifications can be configured to trigger for specific event types, with options to customize the notification content, priority, media attachments, and other delivery settings. The feature is optional and can be enabled or disabled depending on your application's requirements.

```ts
new Manager({
    NotifyServer: {
        Enabled: false,
        Server: `https://ntfy.sh`,
        MediaStorage: {
            AUDIO: `http_path_to_audio_storage`,
            TEXT: `http_path_to_text_storage`,
            JSON: `http_path_to_json_storage`,
            IMAGE: `http_path_to_image_storage`,
        },
        Credentials: {
            Username: `your_ntfy_username`,
            Password: `your_ntfy_password`
        }
    },
})
```
If you plan on wanting graphics, audio messages, and text attachments. You are needing to setup a simple web server to host your media files. The parser will then attach the link to the media files to the push notification when an event is triggered. The **MediaStorage** configuration allows you to specify the base URL for each type of media file, ensuring that the parser can correctly locate and attach the files to the notifications.


> [!WARNING]
> If you plan on self hosting your own ntfy server, please ensure that you set the **upstream-base-url** to **https://ntfy.sh** in your **server.yml** file. This is required for proper delivery of push notifications.


> [!TIP]
> It's best to set your message retention to a maximum of **12 hours**. This ensures that messages are not retained for too long, which could lead to unnecessary storage usage and potential delays in message delivery.


## 3.1.6 - Action Settings
Action settings dictate specific tasks after an defined event is created, updated, or deleted. These tasks allow you to automate hardcoded workflows such as sending notifications through Discord, mobile push notifications, file creation, audio generation, graphic generation, and much more. 

Using wildcards, you can customize what events do what specific actions. For example, you can configure the parser to send a Discord webhook notification for all Tornado Warnings, while also sending a mobile push notification for specific Severe Thunderstorm Warnings. 

```ts
new Manager({
    ActionSettings: [
        {
            Events: [`*Tornado Warning*`], // Wildcard to match all Tornado Warnings
            Webhook: {
                Enabled: true,
                Destination: `webhook_url`,
                Ratelimit: 2,
                Title: `Tornado Warning`,
                Message: `Put whatever you want in here`
            }
        },
        {
            Events: [`Destructive Severe Thunderstorm Warning`],
            NotificationServer: {
                Enabled: true,
                Topic: `D-SEVERE`
            }
        },
        {
            Events: [`*Warning*`, `*Watch`, `*Advisory`],
            Uploads: {
                JSON: true,
                AUDIO: true,
                TEXT: true,
                IMAGE: true
            }
        }
    ]
})
```

If you choose to use the `Uploads` task in your action settings, you can configure the parser to automatically create files, post file attachments to your media storage server, and attach the links to the files in your Discord webhook or mobile push notification. 

> [!WARNING]
> When using the `Uploads` task, please ensure that your media storage server is properly configured for `NTFY` and that the archive settings are correctly defined. If the media storage server is not properly configured, the parser will not be able to upload files or attach them to notifications, resulting in incomplete or missing media content in your notifications.

> [!TIP]
> You can use wildcards to match multiple events with a single action configuration. For example, using `*Warning*` will match all events that contain the word "Warning" in their title, allowing you to apply the same action settings to multiple event types without needing to configure each one individually. Additionally, you can leave the `Events` array empty to apply the action settings to all events, regardless of their type or title. This provides maximum flexibility in defining how the parser should respond to different events.

> [!WARNING]
> If you choose to do all events, please be aware that this will result in a large number of files being created and will result in CPU and memory usage being high. Please ensure that your system has the resources to handle this before enabling this option. If you are unsure, it is recommended to only configure specific events for action settings to avoid potential performance issues.

# 3.2 - Global Settings & Filters
**@atmosx/event-product-parser** provides the ability to configure event filters, themes, archive settings, and additional global settings that affect the behavior of the parser and building components. 


## 3.2.1 - Polygon Products
All events that contain valid **UGC** or **Polygon** data will be parsed and ingested and will be used to build, process, and filter events based on geographic location.

### 3.2.11 - Geometry Parsing
With the use of `DisableGeometryParsing`, you can disable the parsing of polygon products when building the event. This is more or so a performance optimization for those who do not need to parse polygon products.

```ts
new Manager({
    GlobalSettings: {
        DisableGeometryParsing: false, // Set to true to disable polygon parsing
    }
})
```

This setting only applies to cached geojson events and does not affect the parsing process and ingestion of polygon products. When disabled, the geometry data will simply be `null`.

### 3.2.12 - Shapefile Coordinate Parsing
When parsing and no valid coordinates are found in the raw text product, the parser will attempt to fallback to the shapefile coordinate database based on the `UGC` codec assigned.

```ts
new Manager({
    GlobalSettings: {
        UseShapefileCoordinates: true, // Set to true to enable shapefile coordinate parsing
    }
})
```

### 3.2.13 - Population Data (Polygon Area)
### 3.2.14 - Nodes & Polygon Filtering