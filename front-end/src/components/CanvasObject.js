import React from "react";

class CanvasObject extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            left: 10,
            top: 0,
            src: props.src,
            alt: props.alt,
            offsetLeft: document.getElementById('canvas').offsetLeft,
            offsetTop: document.getElementById('canvas').offsetTop
        }
    }

    onMouseDown = (event) => {
        const element = event.target.parentElement;
        console.log(this.state.offsetLeft);
        this.state.left = parseInt(event.pageX) - this.state.offsetLeft;
        this.state.top = parseInt(event.pageY) - this.state.offsetTop;
        //element.style.left = this.state.left + "px";
        //element.style.top = this.state.top + "px";
        console.log(this.state.left);
        console.log(this);
        // console.log("MouseDownX" + event.pageX);
        // console.log("MouseDownY" + event.pageY);
    }

    onMouseUp = (event) => {
        // console.log("MouseUpX" + event.pageX);
        // console.log("MouseUpY" + event.pageY);
    }

    drag = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const offsetLeft = this.state.offsetLeft;
        const offsetTop = this.state.offsetTop;
        //console.log(event.clientX);
        if (event.pageX < offsetLeft || event.pageY < offsetTop) {
            return;
        }
        const parentElement = event.target.parentElement;
        const element = event.target;
        const offsetLeftRelElement = element.x - event.clientX;
        const offsetTopRelElement = element.y - event.clientY;
        console.log(offsetLeftRelElement);
        this.state.left = parseInt(event.clientX) - offsetLeft;
        this.state.top = parseInt(event.clientY) - offsetTop;
        parentElement.style.left = this.state.left + "px";
        parentElement.style.top = this.state.top + "px";
    }
    render() {
        return (
            <div onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} className="canvas-image" onDrag={this.drag}>
                <img src={this.state.src} alt={this.state.alt}/>
            </div>
        )
    }
}

export default CanvasObject;