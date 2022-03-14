import './App.css';
import {useState} from "react";
import {marked} from 'marked';

marked.setOptions({
    breaks: true,
})

const App = () => {
    const parseMarkdown = (text) => marked.parse(text)

    const initialInput = "# Heading level 1\n"
        + "## Heading level 2\n"
        + "**MARKDOWN** Previewer\n"
        + "![Logo Maker](https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/6087f2b060c7a92408bac811_logo.svg)\n"
        + "[Google Search](https://google.com)\n"
        + "Inline `code`\n"
        + "```\n"
        + "const variable = 'Hello World';\n"
        + "console.log(variable);\n"
        + "```\n"
        + "* Item 1\n"
        + "* Item 2\n"
        + "* Item 3\n\n"
        + "> \"blockquote\""

    const [renderedMarkdown, setRenderedMarkdown] = useState(parseMarkdown(initialInput))

    const onInputChange = (event) => {
        const text = event.target.value;
        console.log(`onInputChange: ${text}`)
        setRenderedMarkdown(parseMarkdown(text))
    }

    return (
        <div id="app" className="App">
            <div id="title">Markdown Previewer</div>
            <div id="body">
                <div id="editor-container">
                    Editor
                    <textarea id="editor" defaultValue={initialInput} onChange={onInputChange}/>
                </div>
                <div id="preview-container">
                    Preview
                    <div id="preview" dangerouslySetInnerHTML={{__html: renderedMarkdown}}/>
                </div>
            </div>
        </div>
    );
}

export default App;
