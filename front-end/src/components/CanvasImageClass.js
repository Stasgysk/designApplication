import {getImageSize} from "react-image-size";
import {animated} from "@react-spring/web";
import React from "react";
import { useDrag } from '@use-gesture/react';

class CanvasImageClass extends React.Component {

    constructor(props) {
        super(props);
        console.log(props.src);
        this.state = {
            id: `image-${props.id}`,
            src: props.src,
            height: 0,
            width: 0,
            offsetX: props.offsetX,
            offsetY: props.offsetY,
            x: props.x,
            y: props.y
        }
        this.fetchImageSize().then((response) => {
            console.log(response);
            this.setState({height: response.height});
            this.setState({width: response.width});
        });
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.move = this.move.bind(this);
    }

    async fetchImageSize() {
        return await getImageSize(this.state.src)
    }

    move(event) {
        const element=event.target
        element.style.left = `${event.pageX-this.state.x}px`
        element.style.top = `${event.pageY-this.state.y}px`
    }

    add(event) {
        const element = event.target.parentElement;
        console.log(element.clientX-element.style.left);
        this.setState({x: element.clientX-element.style.left})
        this.setState({y: element.clientY-element.style.top})
        element.addEventListener('mousemove', this.move)
    }

    remove(event) {
        const element=event.target
        element.removeEventListener('mousemove', this.move)
    }

    render() {
        const style = {
            left: this.state.x,
            top: this.state.y,
            touchAction: 'none',
            width: `${this.state.width}px`,
            height: `${this.state.height}px`
        }
        return (
            <div id={this.state.id} className="canvas-image-container" style={style} onMouseDown={this.add} onMouseUp={this.remove}>
                <div className="canvas-image" style={{
                    backgroundImage: `url(${this.state.src})`,
                    backgroundRepeat: 'no-repeat',
                    width: `${this.state.width}px`,
                    height: `${this.state.height}px`
                }}>
                </div>
            </div>
        )
    }
}

export default CanvasImageClass;