import React from "react";

class CanvasObject extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            left: '0px',
            top: '0px',
            src: props.src,
            alt: props.alt
        }
    }

    onMouseDown = (event) => {
        console.log("MouseDownX" + event.pageX);
        console.log("MouseDownY" + event.pageY);
    }

    onMouseUp = (event) => {
        console.log("MouseUpX" + event.pageX);
        console.log("MouseUpY" + event.pageY);
    }
    render() {
        return (
            <div onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} className="canvas-image">
                <img src={this.state.src} alt={this.state.alt}/>
            </div>
        )
    }
}

export default CanvasObject;