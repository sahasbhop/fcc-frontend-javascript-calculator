import './Clear.css'

const Clear = (props) => {
    return <div id={props.id} className="clear-bg" onClick={props.onClear}/>
}

export default Clear