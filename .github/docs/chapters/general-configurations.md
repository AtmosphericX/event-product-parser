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

> [!DANGER]
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
> [!WARNING]
> If you plan on self hosting your own ntfy server, please ensure that you set the **upstream-base-url** to **https://ntfy.sh** in your **server.yml** file. This is required for proper delivery of push notifications.


> [!TIP]
> It's best to set your message retention to a maximum of **12 hours**. This ensures that messages are not retained for too long, which could lead to unnecessary storage usage and potential delays in message delivery.


## 3.1.6 - Action Settings