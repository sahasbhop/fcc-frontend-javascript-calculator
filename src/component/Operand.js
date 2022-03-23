import './Operand.css'
import './InputButton.css'

const Operand = (props) => {
    const onClick = () => {
        props.onOperandEnter(props.operand)
    }
    return <label
        id={props.id}
        className="input-button operand-bg operand-font"
        onClick={onClick}>
        {OPERANDS[props.operand]}
    </label>
}

export default Operand

export const OPERAND_ADD = 'add'
export const OPERAND_SUBTRACT = 'subtract'
export const OPERAND_MULTIPLY = 'multiply'
export const OPERAND_DIVIDE = 'divide'
export const OPERAND_EQUALS = 'equals'
export const OPERANDS = {
    [OPERAND_ADD]: '+',
    [OPERAND_SUBTRACT]: '-',
    [OPERAND_MULTIPLY]: '×',
    [OPERAND_DIVIDE]: '÷',
    [OPERAND_EQUALS]: '='
}