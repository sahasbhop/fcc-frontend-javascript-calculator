import './App.css';
import {useState} from "react";

const App = () => {
    const [display, setDisplay] = useState('0')
    const [baseNumber, setBaseNumber] = useState(0.0)
    const [operator, setOperator] = useState(null)
    const [nextNumberAwaited, setNextNumberAwaited] = useState(false)

    const onClear = () => {
        setDisplay('0')
        setBaseNumber(0.0)
        setOperator(null)
        setNextNumberAwaited(false)
    }

    const onClickNumber = (event) => {
        const id = event.target.id;

        if (id === 'decimal') {
            setDisplay((prevState) => hasDecimal(prevState) ? prevState : nextNumberAwaited ? '0.' : prevState + '.')
        } else {
            setDisplay((prevState) => {
                const number = id === 'zero' ? '0' : id === 'one' ? '1' : id === 'two' ? '2' : id === 'three' ? '3' : id === 'four' ? '4' : id === 'five' ? '5' : id === 'six' ? '6' : id === 'seven' ? '7' : id === 'eight' ? '8' : id === 'nine' ? '9' : '';
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

    const onClickOperand = (event) => {
        const id = event.target.id;

        if (!operator) {
            setOperator(id)
            setBaseNumber(parseFloat(display))
            setNextNumberAwaited(true)
        } else if (nextNumberAwaited) {
            if (id === 'subtract') {
                console.log('Prompt to input negative value')
                setDisplay('-')
                setNextNumberAwaited(false)
            } else {
                console.log(`Change operator to ${id}`)
                setOperator(id)
            }
        } else if (isNaN(parseFloat(display))) {
            console.log('Fail to input negative value')
            setDisplay(baseNumber.toString())
            setOperator(id)
            setNextNumberAwaited(true)
        } else {
            console.log('Calculate automatically')
            calculateResult()
            setOperator(id)
            setNextNumberAwaited(true)
        }
    }

    const onClickEquals = () => {
        if (!operator) {
            console.log('Missing operator')
            return
        }
        calculateResult()
    }

    const hasDecimal = (string) => string.match(/\./g)

    const calculateResult = () => {
        const anotherNumber = parseFloat(display)
        let result
        switch (operator) {
            case 'add':
                result = baseNumber + anotherNumber
                console.log(`${baseNumber} + ${anotherNumber} = ${result}`)
                break
            case 'subtract':
                // check if operator is already set, must apply this to the 2nd value instead
                result = baseNumber - anotherNumber
                console.log(`${baseNumber} - ${anotherNumber} = ${result}`)
                break
            case 'multiply':
                result = baseNumber * anotherNumber
                console.log(`${baseNumber} × ${anotherNumber} = ${result}`)
                break
            case 'divide':
                result = baseNumber / anotherNumber
                console.log(`${baseNumber} ÷ ${anotherNumber} = ${result}`)
                break
            default:
        }
        setOperator(null)
        setBaseNumber(result)
        setDisplay(result.toString())
    }

    return (<div id="app">
        <div id="horizontal">
            <div id="clear" className="clear-bg" onClick={onClear}/>
            <div id="display">{display}</div>
        </div>
        <div id="horizontal">
            <label id="seven" className="small-key number-bg light" onClick={onClickNumber}>7</label>
            <label id="eight" className="small-key number-bg light" onClick={onClickNumber}>8</label>
            <label id="nine" className="small-key number-bg light" onClick={onClickNumber}>9</label>
            <label id="divide" className="small-key operand-bg heavy" onClick={onClickOperand}>÷</label>
        </div>
        <div id="horizontal">
            <label id="four" className="small-key number-bg light" onClick={onClickNumber}>4</label>
            <label id="five" className="small-key number-bg light" onClick={onClickNumber}>5</label>
            <label id="six" className="small-key number-bg light" onClick={onClickNumber}>6</label>
            <label id="multiply" className="small-key operand-bg heavy" onClick={onClickOperand}>×</label>
        </div>
        <div id="horizontal">
            <label id="one" className="small-key number-bg light" onClick={onClickNumber}>1</label>
            <label id="two" className="small-key number-bg light" onClick={onClickNumber}>2</label>
            <label id="three" className="small-key number-bg light" onClick={onClickNumber}>3</label>
            <label id="subtract" className="small-key operand-bg heavy" onClick={onClickOperand}>-</label>
        </div>
        <div id="horizontal">
            <label id="zero" className="small-key number-bg light" onClick={onClickNumber}>0</label>
            <label id="decimal" className="small-key number-bg heavy" onClick={onClickNumber}>.</label>
            <label id="equals" className="small-key operand-bg heavy" onClick={onClickEquals}>=</label>
            <label id="add" className="small-key operand-bg heavy" onClick={onClickOperand}>+</label>
        </div>
    </div>);
}

export default App;
