import "./CityElement.css"
import Icon from "./Icon.jsx";
export default function CityElement({city, typeIcon, value, icon}) {
    let iconTypeClass = (() => {
        switch (typeIcon) {
            case "search":
                return "CityElementTypeIconSearch";
            case "history":
                return "CityElementTypeIconHistory";
            case "favourite":
                return "CityElementTypeIconFavourite";
        }
    })()

    if (value == null) {
        value = "N/A";
    }

    return (
        <div className="CityElement">
            <div className={"CityElementTypeIcon " + iconTypeClass} />
            <p className="CityElementCity">{city}</p>
            <p className={"CityElementWeather"}>{value}</p>
            <Icon name={icon} size={42}/>
        </div>
    )
}