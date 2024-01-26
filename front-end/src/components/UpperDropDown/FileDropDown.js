import '../DropDown.css'

export default function FileDropDown(props) {
    return (
        <div className="dropdown-menu-upper">
            <button>Open</button>
            <button>Save</button>
            <button>Save as</button>
            <button onClick={props.openFile}>Import</button>
            <button>Export</button>
            <button onClick={props.leave}>Exit</button>
        </div>
    )
}