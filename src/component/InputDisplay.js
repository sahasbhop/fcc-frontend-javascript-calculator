import './InputDisplay.css'

const InputDisplay = (props) => {
    return <div id={props.id} className="input-display">{props.display.slice(0, 10)}</div>
}

export default InputDisplay