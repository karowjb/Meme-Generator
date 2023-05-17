import React, { useState } from "react";
import axios from "axios";
import "./AllMemes.css";
let loaded = false;
// Gets all memes from the database and puts them into cards that the user can view
const AllMemes = () => {
    const [imageArray, setImageArray] = useState([]);
    const load = async () => {
        if (loaded === false) {
            let response = await fetch("/memesall");
            let text = await response.text();
            let memes = JSON.parse(text);
            let arr = [];
            for (let m in memes) {
                let res = await axios.post("/bucket", {
                    name: `${memes[m]["name"]}`,
                });
                arr.push({ url: res.data });
            }
            setImageArray(arr);
        }
    };

    return (
        <div>
            <div className="meme-card-grid" id="pleaseWork">
                {imageArray.map((meme, index) => (
                    <div key={index} className="meme-card">
                        <div className="meme-card-body">
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
