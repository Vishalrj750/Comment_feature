import React from "react";
import { v4 as uuid } from "uuid";
import { CardForGif } from "./CardForGif";
import { CardForText } from "./CardForText";
import { GiphyFetch } from "@giphy/js-fetch-api";
import "./InputText.css";

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
        // const arr = [...items, payLoad]
        setItems([...items, payLoad])
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
        <div className="main">
            <input type="text" placeholder="Add a comment....." value={input} onChange={(e) => setInput(e.target.value)} className="input" />
            <button onClick={handleClick} className="btn">Send</button>
            <button onClick={handleGif} className="btn">GIF</button>
            { gifs.length && <div className="gif-class">{
                gifs.map((item) => <div key={item.id} className="gifs-map">
                <img src={item.url} alt="gif_img" className="gifs-img" onClick={() => handleImageClick(item.id, item.url)} />
            </div>)
            }</div> }
            <div className="items-div">{items.map((item) => { return item.text ? <CardForText key={item.id} text={item.text} /> : <CardForGif key={item.id} url={item.url} />})}</div>
        </div> : <div className="main">
            <input type="text" placeholder="Add a comment....." value={input} onChange={(e) => setInput(e.target.value)} className="input" />
            <button onClick={handleClick} className="btn">Send</button>
            <button onClick={handleGif} className="btn">GIF</button>
            <div>....Nothing to Show</div>
        </div>

}