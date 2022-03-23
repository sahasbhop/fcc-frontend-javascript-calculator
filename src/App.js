import './App.css';
import {useState} from "react";
import ValueInput from "./component/ValueInput";
import Operand, {
    OPERAND_ADD,
    OPERAND_DIVIDE,
    OPERAND_EQUALS,
    OPERAND_MULTIPLY,
    OPERAND_SUBTRACT,
    OPERANDS
} from "./component/Operand";
import InputDisplay from "./component/InputDisplay";
import Clear from "./component/Clear";

const App = () => {
    const [display, setDisplay] = useState('0')
    const [baseNumber, setBaseNumber] = useState(0.0)
    const [activeOperand, setActiveOperand] = useState(null)
    const [nextNumberAwaited, setNextNumberAwaited] = useState(false)

    const onClear = () => {
        setDisplay('0')
        setBaseNumber(0.0)
        setActiveOperand(null)
        setNextNumberAwaited(false)
    }

    const onValueInputEnter = (number) => {
        if (number === '.') {
            setDisplay((prevState) => prevState.match(/\./g) ? prevState : nextNumberAwaited ? '0.' : prevState + '.')
        } else {
            setDisplay((prevState) => {
                if (prevState === '0') {
                    return number
                } else if (nextNumberAwaited) {
                    return number
                } else {
                    return prevState.concat(number)
                }
            })
        }
        if (nextNumberAwaited) setNextNumberAwaited(false)
    }

    const onOperandEnter = (operand) => {
        if (!activeOperand) {
            setActiveOperand(operand)
            setBaseNumber(parseFloat(display))
            setNextNumberAwaited(true)
        } else if (nextNumberAwaited) {
            if (operand === OPERAND_SUBTRACT) {
                setDisplay('-')
                setNextNumberAwaited(false)
            } else {
                console.log(`Change operand to ${operand}`)
                setActiveOperand(operand)
            }
        } else if (isNaN(parseFloat(display))) {
            console.log('Fail to input negative value')
            setDisplay(baseNumber.toString())
            setActiveOperand(operand)
            setNextNumberAwaited(true)
        } else {
            const anotherNumber = parseFloat(display)
            const result = calculate(baseNumber, anotherNumber, activeOperand)
            console.log(`${baseNumber} ${OPERANDS[operand]} ${anotherNumber} = ${result}`)
            setDisplay(result.toString())
            setBaseNumber(result)

            if (operand === OPERAND_EQUALS) {
                setActiveOperand(null)
            } else {
                setActiveOperand(operand)
                setNextNumberAwaited(true)
            }
        }
    }

    const calculate = (baseNumber, anotherNumber, operand) => {
        if (operand === OPERAND_ADD) {
            return baseNumber + anotherNumber
        } else if (operand === OPERAND_SUBTRACT) {
            return baseNumber - anotherNumber
        } else if (operand === OPERAND_MULTIPLY) {
            return baseNumber * anotherNumber
        } else if (operand === OPERAND_DIVIDE) {
            return baseNumber / anotherNumber
        }
    }

    return (
        <div id="app">
            <div id="horizontal">
                <Clear id="clear" onClear={onClear}/>
                <InputDisplay id="display" display={display}/>
            </div>
            <div id="horizontal">
                <ValueInput id="seven" value="7" onValueInputEnter={onValueInputEnter}/>
                <ValueInput id="eight" value="8" onValueInputEnter={onValueInputEnter}/>
                <ValueInput id="nine" value="9" onValueInputEnter={onValueInputEnter}/>
                <Operand id="divide" operand={OPERAND_DIVIDE} onOperandEnter={onOperandEnter}/>
            </div>
            <div id="horizontal">
                <ValueInput id="four" value="4" onValueInputEnter={onValueInputEnter}/>
                <ValueInput id="five" value="5" onValueInputEnter={onValueInputEnter}/>
                <ValueInput id="six" value="6" onValueInputEnter={onValueInputEnter}/>
                <Operand id="multiply" operand={OPERAND_MULTIPLY} onOperandEnter={onOperandEnter}/>
            </div>
            <div id="horizontal">
                <ValueInput id="one" value="1" onValueInputEnter={onValueInputEnter}/>
                <ValueInput id="two" value="2" onValueInputEnter={onValueInputEnter}/>
                <ValueInput id="three" value="3" onValueInputEnter={onValueInputEnter}/>
                <Operand id="subtract" operand={OPERAND_SUBTRACT} onOperandEnter={onOperandEnter}/>
            </div>
            <div id="horizontal">
                <ValueInput id="zero" value="0" onValueInputEnter={onValueInputEnter}/>
                <ValueInput id="decimal" value="." onValueInputEnter={onValueInputEnter}/>
                <Operand id="equals" operand={OPERAND_EQUALS} onOperandEnter={onOperandEnter}/>
                <Operand id="add" operand={OPERAND_ADD} onOperandEnter={onOperandEnter}/>
            </div>
        </div>
    )
}

export default App;
