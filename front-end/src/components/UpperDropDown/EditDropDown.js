import '../DropDown.css'

export default function EditDropDown(props) {
    return (
        <div className="dropdown-menu-upper">
            <button>Undo</button>
            <button>Redo</button>
            <button>Cut</button>
            <button>Copy</button>
            <button>Paste</button>
        </div>
    )
}