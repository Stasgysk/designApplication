import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import {useEffect, useState} from "react";
import React from "react";

export function StrokeWidthSlider (props) {
    const [stroke, setStroke] = useState(props.stroke);

    useEffect(() => {
        console.log(stroke);
        props.onStrokeChange(stroke)
    }, [stroke]);

    function processInput(e) {
        setStroke(e[1]);
    }

    function processInputField(e) {
        let number = parseFloat(e.target.value);
        if(number > 100.0) {
            number = 100.0;
        }
        if(number <= 0.0) {
            number = 0.01
        }
        setStroke(number);
    }

    return (
        <div id="stroke-slider">
            <div id="stroke-input-wrapper">Stroke width:<input className="form-control" id="stroke-input" type="number" step="0.01" min="0.01" max="100.0" value={stroke} onChange={processInputField}/></div>
            <RangeSlider
                className="single-thumb"
                min={0.01}
                defaultValue={[0, stroke]}
                value={[0, stroke]}
                step={0.01}
                thumbsDisabled={[true, false]}
                rangeSlideDisabled={true}
                onInput={processInput}
            />
        </div>
    );
}