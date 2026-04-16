import "./MainCard.css"
import Icon from "./Icon.jsx";

export default function MainCard({city, temperature = "N/A", temperatureHigher  = "+0°", temperatureLower  = "-0°", weather = "Unknown", icon = "na"}) {
    return (
        <div className="MainCard">
            <h2 className={"MainCardCityHeader"}>{city}</h2>
            <div className={"MainCardContainer"}>
                <div>
                <h1 className={"MainCardTemperatureHeader1"}>{temperature}</h1>
                <h2 className={"MainCardTemperatureHeader2"}>{`H: ${temperatureHigher} L: ${temperatureLower}`}</h2>
                </div>
                <div>
                    <Icon name={icon} size={112}/>
                    <p className={"MainCardWeatherText"}>{weather}</p>
                </div>
            </div>



        </div>
    )
}