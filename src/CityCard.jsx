import CityElement from "./CityElement.jsx";
import "./CityCard.css"
import {getCachedCurrentWeather} from "./App.jsx";

export default function CityCard({typeIcon = "favourite", cities = [], isSample = false, citiesData = []}) {
    let citiesElements = []
    // console.log("received", citiesData)
    if (citiesData.length > 0) {
        citiesElements = citiesData.map((cityData) => {
                return <CityElement city={cityData.city} typeIcon={typeIcon} value={cityData.temperature} icon={cityData.icon} key={cityData.city + cityData.temperature}/>
            }
        )
    } else {
        citiesElements = cities.map((city) => {
                const {weather, icon} = getCachedCurrentWeather(city)
                return <CityElement city={city} typeIcon={typeIcon} value={weather} icon={icon}/>
            }
        )
    }



    return <div className="CityCard">
        {citiesElements}
        {(isSample)? (
            <>
                <CityElement city={"Krakow, Poland"} typeIcon={"history"} value={"+15"} icon={"cloud"}/>
                <CityElement city={"Warsaw, Poland"} typeIcon={"favourite"} value={"+17"} icon={"rain"}/>
                <CityElement city={"Amsterdam, Netherlands"} typeIcon={"search"} value={"+12"} icon={"sun"}/>
            </>
        ): null}
    </div>
}