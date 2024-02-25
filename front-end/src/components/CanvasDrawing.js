import {Line} from "react-konva";
import {useState} from "react";

function CanvasDrawing(props) {
    const [lines, setLines] = useState(props.lines);

    const linesToRender = lines.map((line, i) => (
                <Line
                    key={i}
                    points={line.points}
                    stroke="#df4b26"
                    strokeWidth={5}
                    tension={0.5}
                    lineCap="round"
                    lineJoin="round"
                    globalCompositeOperation={
                        line.tool === 'eraser' ? 'destination-out' : 'source-over'
                    }
                />
            )
    );

    return (
        {linesToRender.length >= 1 && linesToRender}
    )
}

export default CanvasDrawing;