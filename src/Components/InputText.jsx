import React from "react";
import { v4 as uuid } from "uuid";
import { CardForGif } from "./CardForGif";
import { CardForText } from "./CardForText";
import { GiphyFetch } from "@giphy/js-fetch-api";

export const InputText = () => {
    const [input, setInput] = React.useState("");
    const [items, setItems] = React.useState([]);
    const [gifs, setGifs] = React.useState([]);
    // const key = process.env.REACT_APP_GIPHY_KEY;
    // console.log(key);
    const giphy = new GiphyFetch("eeH8EyhsaxauVoJSotXI9x9TdE0WdYPX");

    const handleClick = () => {
        const payLoad = {
            text: input,
            id: uuid()
        }
        setItems([ ...items, payLoad ])
    }

    const handleGif = async () => {
        const res = await giphy.trending({ offset: 5, limit: 24 })
        const myData = res.data
        const allData = myData.map((item) => {
            return {
                url: item.images.downsized.url,
                id: item.id
            }
        })
        setGifs(allData)
        console.log(gifs)
        // const payLoad = {
        //     url: res.data.images.downsized.url,
        //     id: res.data.id
        // }
        // setItems(payLoad)
    }

    const handleImageClick = (id, url) => {
        const payLoad = {
            id,
            url
        }
        setItems([...items, payLoad])
        setGifs([])
    }

    return items.length || gifs.length ?
        <div>
            <input type="text" placeholder="Write Comment" value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleClick}>Send</button>
            <button onClick={handleGif}>GIF</button>
            { gifs.length && <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>{
                gifs.map((item) => <div key={item.id} style={{width: "250px", height: "250px"}}>
                <img src={item.url} alt="gif_img" style={{ width: "100%", height: "100%", objectFit: "contain" }} onClick={() => handleImageClick(item.id, item.url)} />
            </div>)
            }</div> }
            {items.map((item) => { return item.text ? <CardForText text={item.text} /> : <CardForGif url={item.url} />})}
        </div> : <div>
            <input type="text" placeholder="Write Comment" value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleClick}>Send</button>
            <button onClick={handleGif}>GIF</button>
            <div>....Nothing to Show</div>
        </div>

}