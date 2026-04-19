import cloud from './assets/cloud.avif'
import sun from './assets/sun.avif'
import sun_cloudy from './assets/sun_cloudy.avif'
import sunny_partly_cloudy from './assets/sun_partly_cloudy.avif'
import na from './assets/na.avif'
import wind from './assets/wind.avif'
import rain from './assets/rain.avif'
import light_rain from './assets/light_rain.avif'
import moderate_rain from './assets/moderate_rain.avif'
import heavy_rain from './assets/heavy_rain.avif'
import rainstorm from './assets/rainstorm.avif'
import heavy_rainstorm from './assets/heavy_rainstorm.avif'
import thunderstorm from './assets/thunderstorm.avif'
import humidity from './assets/humidity.avif'
import fog from './assets/fog.avif'
import hail from './assets/hail.avif'
import light_snow from './assets/light_snow.avif'
import moderate_snow from './assets/moderate_snow.avif'
import heavy_snow from './assets/heavy_snow.avif'
import snowstorm from './assets/snowstorm.avif'
import snowflake from './assets/snowflake.avif'
import heavy_snowstorm from './assets/heavy_snowstorm.avif'
import moon from './assets/moon.avif'
import moon_partly_cloudy from './assets/moon_partly_cloudy.avif'
import moon_cloudy from './assets/moon_cloudy.avif'
import sunrise from './assets/sunrise.avif'
import sunset from './assets/sunset.avif'
import uv from './assets/uv.avif'
import rainbow from './assets/rainbow.avif'
import './Icon.css'

export default function Icon({name, size, className}) {
    let src = (() => {
        switch (name) {
            case "cloud":
                return cloud;
            case "sun":
                return sun;
            case "sun_cloudy":
                return sun_cloudy;
            case "sunny_partly_cloudy":
                return sunny_partly_cloudy;
            case "wind":
                return wind;
            case "rain":
                return rain;
            case "light_rain":
                return light_rain;
            case "moderate_rain":
                return moderate_rain;
            case "heavy_rain":
                return heavy_rain
            case "rainstorm":
                return rainstorm;
            case "heavy_rainstorm":
                return heavy_rainstorm;
            case "thunderstorm":
                return thunderstorm
            case "humidity":
                return humidity;
            case "fog":
                return fog;
            case "hail":
                return hail;
            case "light_snow":
                return light_snow;
            case "moderate_snow":
                return moderate_snow;
            case "heavy_snow":
                return heavy_snow;
            case "snowstorm":
                return snowstorm;
            case "heavy_snowstorm":
                return heavy_snowstorm;
            case "snowflake":
                return snowflake;
            case "moon":
                return moon;
            case "moon_cloudy":
                return moon_cloudy;
            case "moon_partly_cloudy":
                return moon_partly_cloudy;
            case "sunrise":
                return sunrise;
            case "sunset":
                return sunset;
            case "uv":
                return uv;
            case "rainbow":
                return rainbow;
            default:
                return na;
        }
    })();
    if (size == null) {
        size = 64;
    }

    return (
        <img className={`Icon ${className}`} src={src} alt={name} height={size} width={size}></img>
    );
}