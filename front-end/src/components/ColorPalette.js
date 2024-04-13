import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import {useEffect} from "react";

export function ColorPalette(props) {
    const [color, setColor] = useColor(props.color);

    useEffect(() => {
        props.onChange(color);
    }, [color]);

    return (
        <div>
            <ColorPicker color={color} onChange={setColor} />
        </div>
    );
}