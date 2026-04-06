import HourlyElement from "./HourlyElement.jsx";
import "./HourlyCard.css"

export default function HourlyCard(){
    return (
        <div className="HourlyCard">
            <HourlyElement hour={"Now"} icon={"sun"} value={"+15°"}/>
            <HourlyElement hour={"14"} icon={"sun"} value={"+17°"}/>
            <HourlyElement hour={"16"} icon={"cloud"} value={"+14°"}/>
            <HourlyElement hour={"18"} icon={"cloud"} value={"+13°"}/>
            <HourlyElement hour={"20"} icon={"rain"} value={"+11°"}/>
            <HourlyElement hour={"22"} icon={"rain"} value={"+10°"}/>
            <HourlyElement hour={"24"} icon={"moon-clouds"} value={"+7°"}/>
            <HourlyElement hour={"02"} icon={"moon-clouds"} value={"+5°"}/>
            <HourlyElement hour={"04"} icon={"cloud"} value={"+4°"}/>
            <HourlyElement hour={"06"} icon={"rain"} value={"+4°"}/>
            <HourlyElement hour={"08"} icon={"cloud"} value={"+8°"}/>
            <HourlyElement hour={"10"} icon={"sun"} value={"+11°"}/>
        </div>
    )
}