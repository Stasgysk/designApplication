import '../DropDown.css'

export default function FileDropDown(props) {
    return (
        <div className="dropdown-menu-upper">
            <button>Open</button>
            <button onClick={props.save}>Save</button>
            <button>Save as</button>
            <button onClick={props.openFile}>Import</button>
            <button>Export</button>
            <button onClick={props.leave}>Exit</button>
        </div>
    )
}