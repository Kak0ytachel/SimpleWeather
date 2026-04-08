import CityElement from "./CityElement.jsx";
import "./CityCard.css"

export default function CityCard() {
    return <div className="CityCard">
        <CityElement city={"Amsterdam, Netherlands"} typeIcon={"search"} value={"+12"} icon={"sun"}/>
        <CityElement city={"Krakow, Poland"} typeIcon={"history"} value={"+15"} icon={"cloud"}/>
        <CityElement city={"Warsaw, Poland"} typeIcon={"favourite"} value={"+17"} icon={"rain"}/>
        <CityElement city={"Amsterdam, Netherlands"} typeIcon={"search"} value={"+12"} icon={"sun"}/>
    </div>
}