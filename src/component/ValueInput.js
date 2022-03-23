import './InputButton.css'
import './ValueInput.css'

const ValueInput = (props) => {
    const onClick = () => {
        props.onValueInputEnter(props.value)
    }
    return <label id={props.id} className="input-button value-input-bg value-input-font" onClick={onClick}>{props.value}</label>
}

export default ValueInput