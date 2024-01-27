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

    const onMouseDown = (event) => {
        const element = event.target.parentElement;
        console.log(imageInfo.offsetLeft);
        imageInfo.left = parseInt(event.pageX) - imageInfo.offsetLeft;
        imageInfo.top = parseInt(event.pageY) - imageInfo.offsetTop;
        //element.style.left = this.imageInfo.left + "px";
        //element.style.top = this.imageInfo.top + "px";
        console.log(imageInfo.left);
        // console.log("MouseDownX" + event.pageX);
        // console.log("MouseDownY" + event.pageY);
    }

    function drag(event) {
        // event.preventDefault();
        // event.stopPropagation();
        // const offsetLeft = imageInfo.offsetLeft;
        // const offsetTop = imageInfo.offsetTop;
        // if (event.pageX < offsetLeft || event.pageY < offsetTop) {
        //     return;
        // }
        // const element = event.target;
        // //const offsetLeftRelElement = element.x - event.clientX;
        // //const offsetTopRelElement = element.y - event.clientY;
        //
        // imageInfo.left = parseInt(event.clientX) - offsetLeft;
        // imageInfo.top = parseInt(event.clientY) - offsetTop;
        // element.style.left = imageInfo.left + "px";
        // element.style.top = imageInfo.top + "px";
    }

    function disableGhostImage(event) {
        event.dataTransfer.setDragImage(new Image(),0 ,0);
        event.dataTransfer.dropEffect = "none";
    }

    function mouseHandlerDown(event) {
        console.log("DOWN");
        console.log(event);
    }

    function mouseHandlerUp(event) {
        console.log("UP");
        console.log(event);
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
            // <div draggable className="canvas-image-container" onDrag={drag}
            //      onDragStart={disableGhostImage}
            //      onMouseUp={mouseHandlerUp}
            //      onMouseDown={mouseHandlerDown}
            //      style={{width: `${imageInfo.width}px`, height: `${imageInfo.height}px`}}>
            //     <div className="canvas-image" style={{
            //         backgroundImage: `url(${imageInfo.src})`,
            //         backgroundRepeat: 'no-repeat',
            //         width: `${imageInfo.width}px`,
            //         height: `${imageInfo.height}px`
            //     }}>
            //     </div>
            // </div>
        )
    }
}

export default CanvasImage;