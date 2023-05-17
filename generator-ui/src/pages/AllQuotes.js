import React, { useState } from "react";
import "./AllQuotes.css";
let loader = false;
// Gathers all the quotes from the database and lists them in cards
function AllQuotes() {
    const [quotes, setQuotes] = useState([]);

    const load = async () => {
        if (loader === false) {
            let response = await fetch("/quotesall");
            let text = await response.text();
            let quotes = JSON.parse(text);
            setQuotes(quotes);
        }
    };

    return (
        <div>
            <div className="card-grid">
                {quotes.map((quote, index) => (
                    <div key={index} className="card">
                        <div className="card-body">
                            <h4 className="card-name">{quote.name}</h4>
                            <p className="card-content">{quote.quoteContent}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="button-grid">
                <button className="get-quotes" onClick={load}>
                    Grab Quotes
                </button>
            </div>
        </div>
    );
}

export default AllQuotes;
