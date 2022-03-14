import './App.css';
import {useState} from "react";

function App() {
    const [inputText, setInputText] = useState('')

    const onEditorChange = (event) => {
        let inputText = event.target.value;
        setInputText(inputText)
    }
    return (
        <div id="app" className="App">
            <div id="title">Markdown Previewer</div>
            <div id="body">
                <div id="editor-container">
                    Editor
                    <textarea id="editor" onChange={onEditorChange}/>
                </div>
                <div id="preview-container">
                    Preview
                    <div id="preview">{inputText}</div>
                </div>
            </div>
        </div>
    );
}

export default App;
