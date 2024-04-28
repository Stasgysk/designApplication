import React, {Fragment, useEffect, useState} from "react";
import {Transformer, Image} from 'react-konva';

function CanvasImage(props) {
    const [file] = useState(props.file);
    const shapeRef = React.useRef();
    const trRef = React.useRef();
    const [isDragging, setDragging] = useState(false);

    useEffect(() => {
        if (file.isSelected) {
            if (trRef.current) {
                trRef.current.nodes([shapeRef.current]);
                trRef.current.getLayer().batchDraw();
            }
        }
    }, [file.isSelected]);

    const image = new window.Image();
    image.src = props.src;

    const onSelect = () => {
        if (file.isSelected) {
            props.selectById(file.id, false);
        } else {
            props.selectById(file.id, true);
        }
    }

    const updateImage = (e) => {
        const height = e.image.height;
        const width = e.image.width;
        let fileToChange = file
        fileToChange.width = width;
        fileToChange.height = height;
        fileToChange.isSelected = true;
        fileToChange.attrs = e;
        props.onSizeChange(file.id, fileToChange);
    }

    return (
        <Fragment>
            {props.isDrawing &&
                <Image
                    key={file.id}
                    image={image}
                    onClick={onSelect}
                    onTap={onSelect}
                    ref={shapeRef}
                    x={props.x}
                    y={props.y}
                    onDragEnd={(e) => {
                        updateImage(e.target.attrs);
                        setDragging(false);
                    }}
                    onDragStart={() => {
                        setDragging(true);
                    }}
                    onTransformEnd={(e) => {
                        updateImage(e.currentTarget.attrs);
                    }}
                />
            }
            {!props.isDrawing &&
                <Image
                    key={file.id}
                    image={image}
                    onClick={onSelect}
                    onTap={onSelect}
                    ref={shapeRef}
                    x={props.x}
                    y={props.y}
                    draggable
                    onDragEnd={(e) => {
                        updateImage(e.target.attrs);
                        setDragging(false);
                    }}
                    onDragStart={() => {
                        setDragging(true);
                    }}
                    onTransformEnd={(e) => {
                        updateImage(e.currentTarget.attrs);
                    }}
                />
            }
            {file.isSelected && (
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
            )}
        </Fragment>
    );
}

export default CanvasImage;