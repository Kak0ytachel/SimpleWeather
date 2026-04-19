import "./Placeholder.css"
import uni from "./assets/uni.jpg"

export default function Placeholder() {
    return (
        <div className={"Placeholder"}>
            <img className={"PlaceholderImage"} src={uni} alt={"Uni the cat"} draggable={"false"} title={"Uni the cat"}/>
            <div className={"PlaceholderText"}>Search results, history &<br/>favourites would appear here</div>
        </div>
    )
}