import React, {Fragment, useEffect, useState} from "react";
import { Stage, Layer, Rect, Transformer, Image } from 'react-konva';
function TestImage(props) {
    const shapeProps = useState();
    const [isSelected, setIsSelected] = useState(false);
    const onChange = useState();
    const shapeRef = React.useRef();
    const trRef = React.useRef();
    const [imageSize, setImageSize] = useState({x: props.x, y: props.y});

    useEffect(() => {
        if (isSelected) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected, imageSize]);

    const image = new window.Image();
    image.src = props.src;

    const onSelect = () => {
        if (isSelected) {
            setIsSelected(false);
        } else {
            setIsSelected(true);
        }
    }

    return (
                <Fragment>
                    <Image
                        image={image}
                        onClick={onSelect}
                        onTap={onSelect}
                        ref={shapeRef}
                        x={imageSize.x}
                        y={imageSize.y}
                        draggable
                        onDragEnd={(e) => {
                        }}
                        onTransformEnd={(e) => {
                            const change = e.currentTarget.attrs;
                            setImageSize({x: change.x, y: change.y});
                        }}
                    />
                    {isSelected && (
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

export default TestImage;