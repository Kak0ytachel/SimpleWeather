import DataElement from "./DataElement.jsx";
import './DataCard.css'

export default function DataCard({type = 0, currentData = {}}) {
    console.log()
    if (type === 0 || Object.keys(currentData).length === 0) { // sample data
        return (
            <div className="DataCard">
                <DataElement icon="rain" title={"Rain\nchance"} value="10%"/>
                <DataElement icon="wind" title={"Wind\nspeed"} value="2 m/s"/>
                <DataElement icon="humidity" title={"Humidity"} value="32%"/>
                <DataElement icon="cloud" title={"Cloud\ncoverage"} value="23%"/>
            </div>
        )
    }

    if (type !== 2) {
        return (
            <div className="DataCard">
                <DataElement icon="rain" title={"Rain\nchance"} value={currentData.rainChance}/>
                <DataElement icon="wind" title={"Wind\nspeed"} value={currentData.windSpeed}/>
                <DataElement icon="humidity" title={"Humidity"} value={currentData.humidity}/>
                <DataElement icon="cloud" title={"Cloud\ncoverage"} value={currentData.cloudCoverage}/>
            </div>
        )
    }
    return (
        <div className="DataCard">
            <DataElement icon="sunrise" title={"Sunrise"} value={currentData.sunrise}/>
            <DataElement icon="sunset" title={"Sunset"} value={currentData.sunset}/>
            <DataElement icon="uv" title={"UV Index"} value={currentData.UVIndex}/>
            <DataElement icon="sunny_partly_cloudy" title={"Sunshine duration"} value={currentData.sunshineDuration}/>
        </div>
    )

}