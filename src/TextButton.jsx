import "./TextButton.css"

export default function TextButton({text, onClick}) {
    return <span className={"TextButton"} onClick={onClick}>{text}</span>
}