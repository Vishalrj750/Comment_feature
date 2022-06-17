import React from "react";
import "./CardForText.css";

export const CardForText = (props) => {
    return(
        <div className="text-main">
            <div className="user">
                <h3>User</h3>
            </div>
            <p>{props.text}</p>
        </div>
    )
}