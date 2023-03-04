import React, { useState, useRef } from "react";
import "./App.css";
const axios = require("axios");
function CanvasPage() {
    const [imageSrc, setImageSrc] = useState("");
    const [text, setText] = useState("");
    const [textPosition, setTextPosition] = useState({ x: 10, y: 50 });
    const [textColor, setTextColor] = useState("#ffffff");
    const [textSize, setTextSize] = useState(20);
    const canvasRef = useRef(null);

    function handleImageChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImageSrc(reader.result);
        };
        reader.readAsDataURL(file);
    }

    function handleTextChange(event) {
        setText(event.target.value);
    }

    function handleTextPositionChange(event) {
        setTextPosition({
            ...textPosition,
            [event.target.name]: event.target.value,
        });
    }

    function handleTextColorChange(event) {
        setTextColor(event.target.value);
    }

    function handleTextSizeChange(event) {
        setTextSize(parseInt(event.target.value));
    }

    async function handleFetchImage() {
        const response = await fetch("/api2");
        const data = await response.json();
        // console.log(data);
        console.log(data["image"]);

        let img = new Image();
        // let res = await axios.get(data["image"]);
        // console.log(res);
        // img.crossOrigin = "";
        img.src = data["image"];

        // localStorage.setItem("image", data["image"]);
        // console.log(response.formData);
        // setImageSrc(data["image"]);
        // let test = localStorage.getItem("image");
        setImageSrc(img.src);
        // img.crossOrigin = null;
        // console.log(img.crossOrigin);
    }
    async function handleFetchText() {
        // new async function
        const response = await fetch("/api1");
        const data = await response.json();
        // console.log();
        console.log(data["quoteContent"]);
        setText(data["quoteContent"]);
    }

    function handleExportClick() {
        const canvas = canvasRef.current;
        // document.crossOrigin = "";
        const link = document.createElement("a");
        console.log("1");
        console.log(link.origin);
        link.download = "canvas.png";
        console.log("2");
        link.href = canvas.toDataURL();
        console.log("3");
        link.click();
    }

    function drawCanvas() {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const image = new Image();
        // image.crossOrigin = "anonymous";
        image.onload = () => {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            ctx.font = `${textSize}px Arial`;
            ctx.fillStyle = textColor;
            ctx.fillText(text, textPosition.x, textPosition.y);
        };
        console.log(imageSrc);
        image.src = `data:image/png;base64,${imageSrc}`;
        // image.crossOrigin = "anonymous"; // This enables CORS
        // image.onload = function (event) {
        //     try {
        //         ctx.drawImage(image, 0, 0, 200, 200);
        //         // button.download = "cat.png";
        //         // button.href = canvas.canvas.toDataURL();
        //     } catch (e) {
        //         alert(e);
        //     }
        // };

        // image.src = "https://i.chzbgr.com/maxW500/1691290368/h07F7F378/";
    }

    return (
        <div className="container">
            <div className="input-container">
                <input type="file" onChange={handleImageChange} />
                <br />
                <button onClick={handleFetchImage}>Fetch image</button>
                <br />
                <br />
                <button onClick={handleFetchText}>Fetch text</button>
                <br />
                <textarea onChange={handleTextChange} />
                <br />
            </div>
            <div className="position-container">
                <label>
                    X position: {textPosition.x}
                    <input
                        type="range"
                        min="0"
                        max="400"
                        step="1"
                        name="x"
                        value={textPosition.x}
                        onChange={handleTextPositionChange}
                    />
                </label>
                <br />
                <label>
                    Y position: {textPosition.y}
                    <input
                        type="range"
                        min="0"
                        max="400"
                        step="1"
                        name="y"
                        value={textPosition.y}
                        onChange={handleTextPositionChange}
                    />
                </label>
                <br />
                <label>
                    Font size: {textSize}px
                    <input
                        type="range"
                        min="10"
                        max="50"
                        step="1"
                        value={textSize}
                        onChange={handleTextSizeChange}
                    />
                </label>
                <br />
                <input
                    type="color"
                    value={textColor}
                    onChange={handleTextColorChange}
                />
            </div>
            <div className="button-container">
                <br />
                <button onClick={drawCanvas}>Draw canvas</button>
                <button onClick={handleExportClick}>Export canvas</button>
                <br />
            </div>

            <div className="canvas-container">
                <canvas ref={canvasRef} width="400" height="400" />
            </div>
        </div>
    );
}

export default CanvasPage;
