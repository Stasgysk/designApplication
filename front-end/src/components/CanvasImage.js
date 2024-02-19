import React, {useEffect, useState} from "react";
import {getImageSize} from "react-image-size";
import { useDrag } from '@use-gesture/react';
import { animated, useSpring } from '@react-spring/web';
import {useSpringValue} from "react-spring";
import Moveable from "react-moveable";

function CanvasImage(props) {
    const [imageInfo, setImageInfo] = useState({});
    const targetRef = React.useRef(null);
    const moveableRef = React.useRef(null);

    useEffect(() => {
        init();
    }, []);

    function init(){
        fetchImageSize().then((response) => {
            const stateToSave = {
                left: 10,
                top: 0,
                src: props.src,
                alt: props.alt,
                offsetLeft: document.getElementById('canvas').offsetLeft,
                offsetTop: document.getElementById('canvas').offsetTop,
                height: response.height,
                width: response.width
            }
            setImageInfo(stateToSave);
        });
    }

    async function fetchImageSize() {
        return await getImageSize(props.src);
    }

    const style = {
        maxWidth: "auto",
        maxHeight: "auto",
        minWidth: "auto",
        minHeight: "auto"
    }

    if (imageInfo) {
        return (
        <div>
            <img className="target" ref={targetRef} style={style} src={imageInfo.src}></img>
            <Moveable
                ref={moveableRef}
                target={targetRef}
                draggable={true}
                throttleDrag={1}
                edgeDraggable={false}
                startDragRotate={0}
                throttleDragRotate={0}
                resizable={true}
                keepRatio={false}
                throttleResize={1}
                renderDirections={["nw","n","ne","w","e","sw","s","se"]}
                rotatable={true}
                throttleRotate={0}
                rotationPosition={"top"}
                onDrag={e => {
                    e.target.style.transform = e.transform;
                }}
                onResize={e => {
                    e.target.style.width = `${e.width}px`;
                    e.target.style.height = `${e.height}px`;
                    e.target.style.transform = e.drag.transform;
                }}
                onRotate={e => {
                    e.target.style.transform = e.drag.transform;
                }}
            />
        </div>
        )
    }
}

export default CanvasImage;