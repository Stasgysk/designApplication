import '../DropDown.css'

export default function ImageDropDown(props) {
    return (
        <div className="dropdown-menu-upper">
            <button>Size</button>
            <button>Trim</button>
            <button>Crop</button>
            <button>Duplicate</button>
        </div>
    )
}