import React, {Fragment, useEffect, useState} from "react";
import { Transformer, Image, Text} from 'react-konva';
function CanvasText(props) {
    const shapeRef = React.useRef();
    const trRef = React.useRef();

    useEffect(() => {
        if(trRef.current){
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, []);

    const onSelect = () => {
    }

    const updateImage = (e) => {
        console.log(e);
        console.log(shapeRef);
        console.log(trRef);
    }

    return (
        <Fragment>
            <Text
                text="sdsadasd"
                onClick={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                x={0}
                y={0}
                draggable
                onDragEnd={(e) => {
                    updateImage(e.target.attrs);
                }}
                onTransformEnd={(e) => {
                    updateImage(e.currentTarget.attrs);
                }}
            />
            <Transformer
                ref={trRef}
                flipEnabled={false}
                boundBoxFunc={(oldBox, newBox) => {
                    if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
                        return oldBox;
                    }
                    return newBox;
                }}
            />
        </Fragment>
    );
}

export default CanvasText;