import { fetchWeatherApi } from "openmeteo";

export async function getWeather(latitude = 50.0614, longitude = 19.9366) {
    const params = {
        latitude: latitude,
        longitude: longitude,
        daily: ["weather_code", "temperature_2m_min", "temperature_2m_max", "precipitation_probability_max", "sunset", "sunrise", "uv_index_max","sunshine_duration"],
        hourly: ["weather_code", "is_day", "temperature_2m", "precipitation_probability"],
        current: ["temperature_2m", "is_day", "weather_code", "precipitation", "wind_speed_10m", "relative_humidity_2m", "cloud_cover", "apparent_temperature"],
        forecast_days: 14,
        timeformat: "unixtime",
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    const response = responses[0];
    const utcOffsetSeconds = response.utcOffsetSeconds();

    const current = response.current();
    const hourly = response.hourly();
    const daily = response.daily();

    // Define Int64 variables so they can be processed accordingly
    const sunset = daily.variables(4);
    const sunrise = daily.variables(5);

    // Note: The order of weather variables in the URL query and the indices below need to match
    const weatherData = {
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature_2m: current.variables(0).value(),
            is_day: current.variables(1).value(),
            weather_code: current.variables(2).value(),
            precipitation: current.variables(3).value(),
            wind_speed_10m: current.variables(4).value(),
            relative_humidity_2m: current.variables(5).value(),
            cloud_cover: current.variables(6).value(),
            apparent_temperature: current.variables(7).value(),
        },
        hourly: {
            time: Array.from(
                { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() },
                (_ , i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
            ),
            weather_code: hourly.variables(0).valuesArray(),
            is_day: hourly.variables(1).valuesArray(),
            temperature_2m: hourly.variables(2).valuesArray(),
            precipitation_probability: hourly.variables(3).valuesArray(),
        },
        daily: {
            time: Array.from(
                { length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() },
                (_ , i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
            ),
            weather_code: daily.variables(0).valuesArray(),
            temperature_2m_min: daily.variables(1).valuesArray(),
            temperature_2m_max: daily.variables(2).valuesArray(),
            precipitation_probability_max: daily.variables(3).valuesArray(),
            // Map Int64 values to according structure
            sunset: [...Array(sunset.valuesInt64Length())].map(
                (_ , i) => new Date((Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000)
            ),
            // Map Int64 values to according structure
            sunrise: [...Array(sunrise.valuesInt64Length())].map(
                (_ , i) => new Date((Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000)
            ),
            uv_index_max: daily.variables(6).valuesArray(),
            sunshine_duration: daily.variables(7).valuesArray(),
        },
    };


    let splitData = {
        current: weatherData.current,
        hourly: [],
        daily: []
    }

    for (let i = 0; i < weatherData.hourly.time.length; i++) {
        splitData.hourly[i] = {};
        for (let key in weatherData.hourly) {
            splitData.hourly[i][key] = weatherData.hourly[key][i];
        }
    }

    for (let i = 0; i < weatherData.daily.time.length; i++) {
        splitData.daily[i] = {};
        for (let key in weatherData.daily) {
            splitData.daily[i][key] = weatherData.daily[key][i];
        }
    }


    let processedData = {
        current: {},
        hourly: [],
        daily: []
    }
    const now = new Date();

    for (let hourData of splitData.hourly) {
        const {weather, icon} = translateWeatherCondition(hourData.weather_code, hourData.is_day);
        const temperature = Math.round(hourData.temperature_2m);

        const date= new Date(hourData.time);
        let hour = date.getHours();

        const diff = Number(date) - Number(now);
        if (diff < -3600000 || diff > 26 * 60 * 60 * 1000) continue;
        if (hour % 2 == 1 && diff > -3600000) continue;
        // console.log(hour, diff)
        let newHourData = {
            "weather": weather,
            "icon": icon,
            "temperature": formatTemperature(temperature),
            "hour": (diff > 0)? hour: "Now",
            // hour: hour
        }
        processedData.hourly.push(newHourData);
    }

    let todayData = splitData.daily[0]; //placeholder
    let processedTodayData = {rainChance: null, temperatureLower: null, temperatureHigher: null};

    for (let dayData of splitData.daily) {
        const {weather, icon} = translateWeatherCondition(dayData.weather_code, false);
        const temperatureHigher = Math.round(dayData.temperature_2m_max);
        const temperatureLower = Math.round(dayData.temperature_2m_min);
        const rainChance = dayData.precipitation_probability_max;
        const dayDate = new Date(dayData.time);
        let weekday = dayData.time.toLocaleDateString("en-US", {weekday: "long"});
        let date = dayData.time.toLocaleDateString("en-US", {day: "numeric", month: "short"});
        if (now > dayDate) {
            weekday = "Today"
            date = null;
            todayData = dayData;
        }
        else if (Number(dayDate) - Number(now) < 24 * 60 * 60 * 1000) {
            weekday = "Tomorrow"
        }

        const newDayData = {
            "temperatureHigher": formatTemperature(temperatureHigher),
            "temperatureLower": formatTemperature(temperatureLower),
            "rainChance": `${rainChance}%`,
            "weather": weather,
            "icon": icon,
            "date": date,
            "weekday": weekday,
        }
        processedData.daily.push(newDayData)
        if (weekday == "Today") processedTodayData = newDayData;

    }

    const {weather, icon} = translateWeatherCondition(splitData.current.weather_code, splitData.current.is_day);

    const sunshineHours = Math.floor(todayData.sunshine_duration / 3600);
    const sunshineMinutes = Math.floor((todayData.sunshine_duration % 3600) / 60);
    const sunshineDuration = `${sunshineHours}:${(sunshineMinutes > 0 && sunshineMinutes < 10)? "0": ""}${sunshineMinutes}`;

    processedData.current = {
        "weather": weather,
        "icon": icon,
        "temperature": formatTemperature(Math.round(splitData.current.temperature_2m)),
        "temperatureHigher": processedTodayData.temperatureHigher,
        "temperatureLower": processedTodayData.temperatureLower,
        "rainChance": processedTodayData.rainChance,
        "windSpeed": `${Math.round(splitData.current.wind_speed_10m)} m/s`,
        "humidity": `${Math.round(splitData.current.relative_humidity_2m)}%`,
        "cloudCoverage": `${Math.round(splitData.current.cloud_cover)}%`,
        "UVIndex": Math.round(todayData.uv_index_max),
        "sunset": todayData.sunset.toLocaleTimeString("en-UK", {hour: "2-digit", minute: "2-digit"}),
        "sunrise": todayData.sunrise.toLocaleTimeString("en-UK", {hour: "2-digit", minute: "2-digit"}),
        "sunshineDuration": sunshineDuration,

    }
    // console.log(processedData.current)
    console.log(processedData)
    return processedData
}


export function translateWeatherCondition(code, isNight){
    let weather = "Unknown";
    let icon = "na";
    switch (code) {
        case 0:
            weather = "Sunny";
            icon = "sun";
            if (isNight) {
                weather = "Clear";
                icon = "moon"
            }
            break;
        case 1:
            weather = "Mainly clear";
            icon = "sunny_partly_cloudy";
            if (isNight) {
                icon = "moon_partly_cloudy"
            }
            break;
        case 2:
            weather = "Partly cloudy";
            icon = "sun_cloudy";
            if (isNight) {
                icon = "moon_cloudy"
            }
            break;
        case 3:
            weather = "Cloudy";
            icon = "cloud";
            break;
        case 45:
        case 48:
            weather = "Foggy";
            icon = "fog";
            break;
        case 51:
        case 53:
        case 55:
            weather = "Drizzle";
            icon = "fog";
            break;
        case 56:
        case 57:
            weather = "Freezing drizzle";
            icon = "light_rain";
            break;
        case 61:
            weather = "Light rain";
            icon = "light_rain";
            break;
        case 63:
            weather = "Moderate rain";
            icon = "moderate_rain";
            break;
        case 65:
            weather = "Heavy rain";
            icon = "heavy_rain";
            break;
        case 66:
        case 67:
            weather = "Freezing rain";
            icon = "hail";
            break;
        case 71:
            weather = "Light snowfall";
            icon = "light_snow";
            break;
        case 73:
            weather = "Moderate snowfall"
            icon = "moderate_snow";
            break;
        case 75:
            weather = "Heavy snowfall";
            icon = "heavy_snow";
            break;
        case 77:
            weather = "Snow grains";
            weather = "snowflake";
            break;
        case 80:
        case 81:
            weather = "Rainstorm";
            icon = "rainstorm";
            break;
        case 82:
            weather = "Heavy rainstorm";
            icon = "heavy_rainstorm";
            break;
        case 85:
            weather = "Snowstorm";
            weather = "snowstorm";
            break;
        case 86:
            weather = "Heavy snowstorm";
            weather = "heavy_snowstorm";
            break;
        case 95:
        case 96:
        case 99:
            weather = "Thunderstorm";
            icon = "thunderstorm";
            break;
    }

    return {weather, icon}
}

export function formatTemperature(value){
    value = Math.round(value);
    return `${(value > 0)? "+": ""}${value}°`
}

export async function search(name) {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=10&language=en&format=json`;
    const response = await fetch(geoUrl);
    let requestResult = await response.json();

    if ("results" in requestResult) {
        requestResult = requestResult.results;
        requestResult = requestResult.filter(x => x.population !== undefined);
        requestResult.sort((y, x) => ((x.population !== undefined)? x.population: 0) - ((y.population !== undefined)? y.population: 0));

    } else {
        requestResult = [];
    }

    let processedResults = [];

    let latitudes = [];
    let longitudes = [];

    for (let x of requestResult) {
        const cityRecord = {
            // name: x.name,
            // country: x.country,
            name: x.name + ", " + x.country,
            // population: x.population,
            latitude: x.latitude,
            longitude: x.longitude,
        }
        latitudes.push(x.latitude);
        longitudes.push(x.longitude);

        processedResults.push(cityRecord);
    }

    // console.log(processedResults);
    // console.log(latitudes);
    // console.log(longitudes);

    const params = {
        latitude: latitudes,
        longitude: longitudes,
        current: ["temperature_2m", "is_day", "weather_code"],
        forecast_days: 1,
        timeformat: "unixtime",
    };
    const weatherUrl = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(weatherUrl, params);
    let results = []
    let i = 0;

    let index = 0;
    for (const response of responses) {
        const latitude = response.latitude();
        const longitude = response.longitude();
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const current = response.current();

        const processedCurrent = processedResults[index++];



        // Note: The order of weather variables in the URL query and the indices below need to match
        const weatherData = {
            current: {
                time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
                temperature_2m: current.variables(0).value(),
                is_day: current.variables(1).value(),
                weather_code: current.variables(2).value(),
            },
        };
        const {weather, icon} = translateWeatherCondition(weatherData.current.weather_code, weatherData.current.is_day);
        const result = {
            city: processedCurrent.name,
            temperature: formatTemperature(Math.round(weatherData.current.temperature_2m)),
            weather: weather,
            icon: icon,
            latitude: latitude,
            longitude: longitude,
            id: "s" + i++,
        }

        results.push(result);

    }
    console.log(results);
    return results;
}

// await getWeather();
// await geoAPI("Krakow");
// await search("Krakow");