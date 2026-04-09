import Icon from "./Icon.jsx";
import "./DailyElement.css"

export default function DailyElement({weekday, date, weatherHigher, weatherLower, rainChance, icon}) {
    if (weekday == null) {
        weekday = "Today";
    }
    if (weatherHigher == null) {
        weatherHigher = "+0°"
    }
    if (weatherLower == null) {
        weatherLower = "-0°"
    }
    if (rainChance == null) {
        rainChance = "N/A"
    }
    // className={"DailyElement"}
    return <>
        <span className={"DailyElementDayBlock"}>
            <p className={"DailyElementWeekday"}>{weekday}</p>
            {(date != null)? (<p className={"DailyElementDate"}>{date}</p>): null}
        </span>
        <span>
            <p className={"DailyElementWeatherHigher"}>{weatherHigher}</p>
            <p className={"DailyElementWeatherLower"}>{weatherLower}</p>
        </span>
        <span>
            <span className={"DailyElementRainIcon"}/>
            <p className={"DailyElementRainChance"}>{rainChance}</p>
        </span>
        <Icon size={46} name={icon}/>
    </>
}