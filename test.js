const { AlertManager } = require(`@atmosx/event-product-parser`)


const parser = new AlertManager({ 
    database: `shapefile-manager.db`,
    is_wire: true,
    journal: true,
    noaa_weather_wire_service_settings: {
        reconnection_settings: {
            enabled: true,
            interval: 60,
        },
        credentials: {
            username: `username123`,
            password: `password123`,
            nickname: "AtmosphericX Standalone Parser",
        },   
        cache: {
            enabled: false,
            max_db_history: 5000,
            max_db_cache_size: 1000,
        },
        preferences: {
            disable_ugc: false,
            disable_vtec: false,
            disable_text: false,
            cap_only: false,
        }
    },
    national_weather_service_settings: {
        interval: 15,
        endpoint: `https://api.weather.gov/alerts/active`,
    },
    global_settings: {
        parent_events_only: true,
        better_event_parsing: true,
        ignore_geometry_parsing: false,
        shapefile_coordinates: true,
        filtering: {
            events: [`Severe Thunderstorm Warning`],
            filtered_icao: ["PAFC"],
            ignored_icao: [],
            ignored_events: [`Xx`, `Test Message`],
            ugc_filter: [],
            state_filter: [],
            check_expired: true,
            ignore_test_products: true,
        },
        eas_settings: {
            directory: null,
            intro_wav: null,
        }
    }
})

parser.on(`onEvents`, (alerts) => {
   for (const alert of alerts) {
        if (alert.geometry != null) {
            console.log(`[${ new Date(alert.properties.issued).toLocaleString()}] ${alert.properties.event} for ${alert.properties.locations} (ID: ${alert.properties.details.tracking})`);
        }
    }
});