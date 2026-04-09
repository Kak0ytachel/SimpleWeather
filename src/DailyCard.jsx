import DailyElement from "./DailyElement.jsx";
import "./DailyCard.css"


export default function DailyCard() {
    return (
        <div className="DailyCard">
            <DailyElement/>
            <DailyElement weekday={"Tomorrow"} date={"Apr 03"} weatherHigher={"+12°"} weatherLower={"-1°"} rainChance={"10%"} icon={"sun"}/>
            <DailyElement weekday={"Monday"} date={"Apr 04"} weatherHigher={"+10°"} weatherLower={"+3°"} rainChance={"20%"} icon={"cloud"}/>
            <DailyElement weekday={"Tuesday"} date={"Apr 05"} weatherHigher={"+8°"} weatherLower={"+1°"} rainChance={"20%"} icon={"cloud"}/>
            <DailyElement weekday={"Wednesday"} date={"Apr 06"} weatherHigher={"+5°"} weatherLower={"-1°"} rainChance={"20%"} icon={"sun"}/>
            <DailyElement weekday={"Thursday"} date={"Apr 07"} weatherHigher={"+3°"} weatherLower={"-3°"} rainChance={"20%"} icon={"rain"}/>
            <DailyElement weekday={"Friday"} date={"Apr 08"} weatherHigher={"+9°"} weatherLower={"+1°"} rainChance={"20%"} icon={"cloud"}/>
        </div>
    )
}