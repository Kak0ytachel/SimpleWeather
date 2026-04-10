import "./Divider.css"

export default function Divider() {
    return <div className={"Divider"}>
        <div className="DividerTicks"></div>
    </div>
}

export function VerticalDivider() {
    return <div className={"VerticalDivider"}/>
}