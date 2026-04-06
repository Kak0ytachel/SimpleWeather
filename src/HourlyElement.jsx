import './HourlyElement.css'
import Icon from "./Icon.jsx";


export default function HourlyElement({hour, icon, value}) {

    if (hour == null) hour = "Now";
    if (icon == null) icon = "na";
    if (value == null) value = "N/A";

    return (
        <div className="HourlyElement">
            <p className={"HourlyElementHour"}>{hour}</p>
            <Icon name={icon} size={42}/>
            <p className="HourlyElementValue">{value}</p>
        </div>
    )
}