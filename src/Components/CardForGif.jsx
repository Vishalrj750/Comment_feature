import React from "react";
import "./CardForGif.css";

export const CardForGif = (props) => {
    return(
        <div className="gif-main">
            <div className="gif-user">
                <h3>User</h3>
            </div>
            <div className="gif-img">
                <img src={props.url} alt="gif_img" />
            </div>
        </div>
    )
} 