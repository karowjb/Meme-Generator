import React, { useState } from "react";
import axios from "axios";
import "./AllMemes.css";

const AllMemes = () => {
    // const [memes, setMemes] = useState([]);
    const [imageArray, setImageArray] = useState([]);

    async function load() {
        let response = await fetch("/api4");
        let text = await response.text();
        let memes = JSON.parse(text);
        let data;
        let arr = [];
        for (let m in memes) {
            let res = await axios.post(
                "/api5",
                (data = { name: `${memes[m]["name"]}` })
            );
            console.log(data);
            arr.push({ url: res.data });
        }
        setImageArray(arr);
    }

    return (
        <div>
            <div className="meme-card-grid" onLoad={load()}>
                {imageArray.map((meme, index) => (
                    <div key={index} className="meme-card">
                        <div className="meme-card-body">
                            {/* <h4 className="meme-card-name">{meme.name}</h4> */}
                            <div className="image-container">
                                <img
                                    className="meme-card-content"
                                    src={meme.url}
                                    alt={meme.name}
                                    width="300"
                                    height="300"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="meme-button-grid">
                <button className="get-memes" onClick={load}>
                    Grab Memes
                </button>
            </div>
        </div>
    );
};

export default AllMemes;
