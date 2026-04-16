import CityElement from "./CityElement.jsx";
import "./CityCard.css"
import {getCachedCurrentWeather} from "./App.jsx";

export default function CityCard({typeIcon = "favourite", cities = [], isSample = false, citiesData = [], onCityClick = () => {}}) {
    let citiesElements = []
    // console.log("received", citiesData)
    if (citiesData.length > 0) {
        citiesElements = citiesData.map((cityData) => {
                return <CityElement city={cityData.city} typeIcon={typeIcon} value={cityData.temperature} icon={cityData.icon} key={cityData.id} onCityClick={() => onCityClick(cityData)} latitude={cityData.latitude} longitude={cityData.longitude}/>
            }
        )
    } else {
        citiesElements = cities.map((city) => {
                const {weather, icon} = getCachedCurrentWeather(city)
                return <CityElement city={city} typeIcon={typeIcon} value={weather} icon={icon} onCityClick={onCityClick}/>
            }
        )
    }



    return <div className="CityCard">
        {citiesElements}
        {(isSample)? (
            <>
                <CityElement city={"Krakow, Poland"} typeIcon={"history"} value={"+15"} icon={"cloud"} onCityClick={onCityClick}/>
                <CityElement city={"Warsaw, Poland"} typeIcon={"favourite"} value={"+17"} icon={"rain"} onCityClick={onCityClick}/>
                <CityElement city={"Amsterdam, Netherlands"} typeIcon={"search"} value={"+12"} icon={"sun"} onCityClick={onCityClick}/>
            </>
        ): null}
    </div>
}