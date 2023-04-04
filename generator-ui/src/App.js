import React, { useState, useRef } from "react";
import "./App.css";
import { Buffer } from "buffer";
const axios = require("axios");
const width = 600;
const height = 600;
let FileWhere = true;

function CanvasPage() {
    const [imageSrc, setImageSrc] = useState("");
    const [text, setText] = useState("");
    const [downloadName, setDownload] = useState("");
    const [textPosition, setTextPosition] = useState({ x: 10, y: 50 });
    const [textColor, setTextColor] = useState("#ffffff");
    const [textSize, setTextSize] = useState(20);
    const canvasRef = useRef(null);

    function handleImageChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        console.log(file);
        reader.onload = () => {
            FileWhere = false;
            console.log(FileWhere);
            console.log(reader.result);
            setImageSrc(reader.result);
        };
        reader.readAsDataURL(file);
    }

    function handleTextChange(event) {
        setText(event.target.value);
    }

    function handleDownloadChange(event) {
        setDownload(event.target.value);
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
        console.log(data["image"]);
        await getBase64(data["image"]);
        let test = localStorage.getItem("image");
        FileWhere = true;
        console.log(FileWhere);
        setImageSrc(test);
    }
    async function getBase64(url) {
        console.log("Converting image");
        return axios
            .get(url, {
                responseType: "arraybuffer",
            })
            .then((response) => {
                let img = Buffer.from(response.data, "binary").toString(
                    "base64"
                );
                localStorage.setItem("image", img);
            });
    }
    async function handleFetchText() {
        // new async function
        const response = await fetch("/api1");
        const data = await response.json();
        console.log(data["quoteContent"]);
        setText(data["quoteContent"]);
    }

    function handleExportClick() {
        const canvas = canvasRef.current;
        const link = document.createElement("a");
        console.log("1");
        console.log(link.origin);
        link.download = `${downloadName}.png`;
        console.log("2");
        link.href = canvas.toDataURL();
        console.log("3");
        link.click();
    }

    function drawCanvas() {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.onload = () => {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            ctx.font = `${textSize}px Arial`;
            ctx.fillStyle = textColor;
            ctx.fillText(text, textPosition.x, textPosition.y);
        };
        console.log(imageSrc);
        console.log(`File location: ${FileWhere}`);
        if (FileWhere === true) {
            image.src = `data:image/png;base64,${imageSrc}`;
        } else if (FileWhere === false) {
            image.src = imageSrc;
        }
    }

    return (
        <div className="grid-container">
            <div className="input-container">
                <br />
                <button onClick={handleFetchImage}>Use Template Image</button>
                <br />
                <button onClick={handleFetchText}>Use Template Text</button>
                <br />
                <textarea
                    onChange={handleTextChange}
                    placeholder="Insert meme here..."
                ></textarea>
                <h3>Insert your own meme</h3>
                <input type="file" onChange={handleImageChange} />
                <br />
            </div>
            <div className="canvas-container">
                <canvas ref={canvasRef} width={width} height={height} />
            </div>
            <div className="position-container">
                <label>
                    X position: {textPosition.x}
                    <input
                        type="range"
                        min="0"
                        max={width}
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
                        max={height}
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
                <label>Text Color: {textColor}</label>
                <input
                    type="color"
                    value={textColor}
                    onChange={handleTextColorChange}
                />
            </div>
            <div className="button-container">
                <br />
                <button onClick={drawCanvas}>Draw Meme</button>
                <input
                    type="name"
                    value={downloadName}
                    onChange={handleDownloadChange}
                    placeholder="Enter filename here..."
                ></input>
                <button onClick={handleExportClick}>Export Meme</button>

                <br />
            </div>
        </div>
    );
}

export default CanvasPage;
