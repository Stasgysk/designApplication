import React, {useEffect, useState} from "react";
import {getImageSize} from "react-image-size";
import { useDrag } from '@use-gesture/react';
import { animated, useSpring } from '@react-spring/web';


function CanvasImage(props) {
    const [imageInfo, setImageInfo] = useState({});
    const position = useSpring({ x: 0, y: 0 });
    const setElementPos = useDrag((event) => {
        position.x.set(event.offset[0]);
        position.y.set(event.offset[1]);
    });

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

    if (imageInfo) {
        return (
            <animated.div {...setElementPos()} style={{
                    x: position.x,
                    y: position.y,
                    touchAction: 'none',}}>
                <div className="canvas-image" style={{
                    backgroundImage: `url(${imageInfo.src})`,
                    backgroundRepeat: 'no-repeat',
                    width: `${imageInfo.width}px`,
                    height: `${imageInfo.height}px`
                }}>
                </div>
            </animated.div>
        )
    }
}

export default CanvasImage;