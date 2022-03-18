import './App.css';
import $ from "jquery";
import {useEffect, useState} from "react";

const App = () => {
    const setup = {
        Q: {display: "Heater-1", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"},
        W: {display: "Heater-2", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"},
        E: {display: "Heater-3", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"},
        A: {display: "Heater-4_1", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"},
        S: {display: "Heater-6", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"},
        D: {display: "Dsc_Oh", audio: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"},
        Z: {display: "Kick_n_Hat", audio: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"},
        X: {display: "RP4_KICK_1", audio: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"},
        C: {display: "Cev_H2", audio: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"},
    }
    const [display, setDisplay] = useState('---')

    useEffect(() => {
        const keydownListener = (event) => {
            $(`#${event.key.toUpperCase()}`).click()
        }
        document.addEventListener("keydown", keydownListener, false)
        return () => {
            document.removeEventListener("keydown", keydownListener, false)
        }
    }, [])
    const handleOnClick = (event) => {
        let key = event.target.id;
        event.target.children[0].play()
        setDisplay(setup[key].display)
    }
    const drumPad = (char) => {
        return <div id={char} className="drum-pad" onClick={handleOnClick}>
            {char}
            <audio id={char} className="clip" src={setup[char].audio}/>
        </div>
    }
    return (
        <div id="app">
            <div id="title">Drum Machine</div>
            <div id="drum-machine">
                <label id="display">{display}</label>
                <div id="drum-pads-row">
                    {drumPad("Q")}
                    {drumPad("W")}
                    {drumPad("E")}
                </div>
                <div id="drum-pads-row">
                    {drumPad("A")}
                    {drumPad("S")}
                    {drumPad("D")}
                </div>
                <div id="drum-pads-row">
                    {drumPad("Z")}
                    {drumPad("X")}
                    {drumPad("C")}
                </div>
            </div>
        </div>);
}

export default App;
