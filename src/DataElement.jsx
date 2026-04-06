import Icon from "./Icon.jsx";
import "./DataElement.css"

export default function DataElement({icon, title, value}) {

    return (
        <div className="DataElement">
            <Icon name={icon}/>
            <p className="DataElementValue">{value}</p>
            <p className="DataElementTitle">{title}</p>
        </div>
    )
}