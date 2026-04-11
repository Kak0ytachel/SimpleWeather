import cloud from './assets/cloud.avif'
import sun from './assets/sun.avif'
import na from './assets/na.avif'
import wind from './assets/wind.avif'
import rain from './assets/rain.avif'
import humidity from './assets/humidity.avif'
import moon_clouds from './assets/moon-clouds.avif'
import './Icon.css'

export default function Icon({name, size}) {
    let src = (() => {
        switch (name) {
            case "cloud":
                return cloud;
            case "sun":
                return sun;
            case "wind":
                return wind;
            case "rain":
                return rain;
            case "humidity":
                return humidity;
            case "moon-clouds":
                return moon_clouds;
            default:
                return na;
        }
    })();
    if (size == null) {
        size = 64;
    }

    return (
        <img className="Icon" src={src} alt={name} height={size} width={size}></img>
    );
}