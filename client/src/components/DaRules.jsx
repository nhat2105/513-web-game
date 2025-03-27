import {useState} from "react";

const DaRules = ({showRules, setShowRules}) => {
    const toggleRules = () => setShowRules(!showRules);
    if (!showRules) return null;
    return (
        <body className="rules-background">
            <div className="rules-container">
                <button onClick={toggleRules}>X</button>
                <h1>Rules</h1>
                <div>
                    <h2>SinglePlayer</h2>
                </div>
            </div>
        </body>
    );
};

export default DaRules;