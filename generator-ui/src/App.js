import React, { useState, useRef } from "react";
import "./App.css";
import { Buffer } from "buffer";
import axios from "axios";

const width = 600;
const height = 600;
let FileWhere = true;

function CanvasPage() {
    const [imageSrc, setImageSrc] = useState("");
    const [text, setText] = useState("");
    let [downloadName, setDownload] = useState("");
    const [textPosition, setTextPosition] = useState({ x: 0, y: 20 });
    const [textColor, setTextColor] = useState("#cc0000");
    const [textSize, setTextSize] = useState(20);
    const canvasRef = useRef(null);
    const [fontFamily, setFontFamily] = useState("Arial");
    const [textHeight, setTextHeight] = useState("20");
    // Updates the image property on a user change
    function handleImageChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            FileWhere = false;
            setImageSrc(reader.result);
        };
        reader.readAsDataURL(file);
    }
    // Updates the text property on a user change
    function handleTextChange(event) {
        setText(event.target.value);
        drawCanvas();
    }
    // Downloads the canvas
    function handleDownloadChange(event) {
        setDownload(event.target.value);
        drawCanvas();
    }
    // Moves the text and rerenders the canvas
    function handleTextPositionChange(event) {
        setTextPosition({
            ...textPosition,
            [event.target.name]: event.target.value,
        });
        drawCanvas();
    }
    // Changes the color and redraws canvas
    function handleTextColorChange(event) {
        setTextColor(event.target.value);
        drawCanvas();
    }
    // Font family and redraws
    function handleFontFamilyChange(event) {
        setFontFamily(event.target.value);
        drawCanvas();
    }
    // Text Y position handled here
    function handleTextHeight(event) {
        setTextHeight(event.target.value);
        drawCanvas();
    }
    //Font size
    function handleTextSizeChange(event) {
        setTextSize(parseInt(event.target.value));
        drawCanvas();
    }
    // Gets image to draw on Canvas
    async function handleFetchImage() {
        const response = await fetch("/memes");
        const data = await response.json();
        await getBase64(data["image"]);
        let test = await localStorage.getItem("image");
        FileWhere = true;
        await setImageSrc(test);
    }
    // Getting a base 64 string
    async function getBase64(url) {
        return await axios
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
    // Gets preloaded data from API
    async function handleFetchText() {
        textPosition.y = 20;
        const response = await fetch("/quotes");
        const data = await response.json();
        let quote = data["quoteContent"];
        setText(quote);
    }
    // Exports the meme
    function handleExportClick() {
        const canvas = canvasRef.current;
        const link = document.createElement("a");
        if (downloadName.trim().length !== 0) {
            link.download = `${downloadName}.png`;
            link.href = canvas.toDataURL();
            link.click();
        } else {
            downloadName = "result";
            link.download = `${downloadName}.png`;
            link.href = canvas.toDataURL();
            link.click();
        }
    }
    // Configuring word break for the quotes from the DB
    function renderWordBreak(ctx) {
        let words = text.split(" ");
        let newString = "";
        let currentLineLength = 0;
        let pos = Number(textHeight);
        for (let i = 0; i < words.length; i++) {
            if (currentLineLength >= 5) {
                newString += words[i] + " ";
                ctx.fillText(newString, textPosition.x, pos);
                newString = "";
                currentLineLength = 0;
                pos += textSize;
            } else {
                newString += words[i] + " ";
                currentLineLength += 1;
            }
        }
        ctx.fillText(newString, textPosition.x, pos);
        pos = Number(textHeight);
    }
    // Draws the actual canvas and renders the different components
    function drawCanvas() {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.onload = () => {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            ctx.font = `${textSize}px ${fontFamily}`;
            ctx.fillStyle = textColor;
            renderWordBreak(ctx);
        };
        if (FileWhere === true) {
            image.src = `data:image/png;base64,${imageSrc}`;
        } else if (FileWhere === false) {
            image.src = imageSrc;
        }
    }
    // Creating all the needed html
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
                    Font family:
                    <select
                        value={fontFamily}
                        onChange={handleFontFamilyChange}
                    >
                        <option value="Arial">Arial</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Courier New">Courier New</option>
                    </select>
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
                <label>
                    X position: {textPosition.x}
                    <input
                        type="range"
                        min="0"
                        max={width / 2}
                        step="1"
                        name="x"
                        value={textPosition.x}
                        onChange={handleTextPositionChange}
                    />
                </label>
                <br />
                <label>
                    Y position:
                    <br></br>
                    <select value={textHeight} onChange={handleTextHeight}>
                        <option value="20">Top</option>
                        <option value="275">Middle</option>
                        <option value="500">Bottom</option>
                    </select>
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
