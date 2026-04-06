import DataElement from "./DataElement.jsx";
import './DataCard.css'

export default function DataCard() {
    return (
        <div className="DataCard">
            <DataElement icon="rain" title={"Rain\nchance"} value="10%"/>
            <DataElement icon="wind" title={"Wind\nspeed"} value="2 m/s"/>
            <DataElement icon="humidity" title={"Humidity"} value="32%"/>
            <DataElement icon="cloud" title={"Cloud\ncoverage"} value="23%"/>
        </div>
    )
}