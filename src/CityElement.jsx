import search from "./assets/magnifying-glass-solid-full.svg"
import history from "./assets/clock-rotate-left-solid-full.svg"
import favourite from "./assets/star-regular-full.svg"

export default function CityElement({city, typeIcon, value, icon}) {
    let typeIconSrc = (() => {
        switch (typeIcon) {
            case "search":
                return search;
            case "history":
                return history;
            case "favorite":
                return favourite;
        }
    })()

    return (
        <div className="CityElement">
            <div>
                <img src={typeIconSrc} className="cityIcon" alt={typeIcon}/>
                <p className="CityElementCity">{city}</p>
            </div>
        </div>
    )
}