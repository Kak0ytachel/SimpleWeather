import "./MainCard.css"
import Icon from "./Icon.jsx";

export default function MainCard({city}) {
    return (
        <div className="MainCard">
            <h2 className={"MainCardCityHeader"}>{city}</h2>
            <div className={"MainCardContainer"}>
                <div>
                <h1 className={"MainCardTemperatureHeader1"}>+11°</h1>
                <h2 className={"MainCardTemperatureHeader2"}>H: +15° L: -2°</h2>
                </div>
                <div>
                    <Icon name={"sun"} size={112}/>
                    <p className={"MainCardWeatherText"}>Sunny</p>
                </div>
            </div>



        </div>
    )
}