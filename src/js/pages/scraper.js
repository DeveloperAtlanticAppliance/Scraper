import React, { useState } from 'react';
import dataFromReliableParts from "../utils/ReliableParts/reliableParts_Parts";
import relatedModelEasyParts from '../utils/EasyApplianceParts/easyParts_Parts';
import { List } from 'antd';

function Scraper() {

    let results = [];
    let models = [];

    const [Input, setInput] = useState("");
    const [Products, setProducts] = useState([]);
    const [Models, setModels] = useState([]);
    async function getData(input) {
        //results = await dataFromReliableParts("https://www.reliableparts.ca/search?q=" + input);
        results = await dataFromReliableParts(`https://cors-anywhere.herokuapp.com/https://www.reliableparts.ca/search?q=${input}`);
        setProducts(results);
    }

    async function getModels(input) {
        //models = await relatedModelEasyParts("https://www.easyapplianceparts.ca/PartInfo.aspx?inventory=12365300&SourceCode=3&SearchTerm=" + input);
        models = await relatedModelEasyParts(`https://cors-anywhere.herokuapp.com/https://www.easyapplianceparts.ca/PartInfo.aspx?inventory=12365300&SourceCode=3&SearchTerm=${input}`);
        console.log("model: ", models)
        setModels(models);
    }

    const inputHandler = (e) => {
        setInput(e.currentTarget.value);
    }
    const onClickHandler = (e) => {
        getData(Input);
        getModels(Input);
    }
    const onResetHandler = (e) => {
        setInput("");
    }
    const description = (url, price, parts) => {
        return `Parts Number: ${parts}  ||  Price: ${price}  ||  Url: ${url}`
    }
    const desc = (brand, category) => {
        return `Brand: ${brand}   ||  Category: ${category}`
    }

    return (
        <div>
            <form>
                <label>Parts Number: </label>
                <input type="text" style={{ marginRight: "10px" }} id="inputs" name='partsNumber' value={Input} onChange={inputHandler} />
                <input type="button" style={{ marginRight: "5px" }} onClick={onClickHandler} value="Search" />
                <input type="button" onClick={onResetHandler} value="Reset" />
            </form>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 3,
                }}
                dataSource={Products}
                footer={
                    <div>
                        Scraping Data with <b>{Input}</b>
                    </div>
                }
                renderItem={item => (
                    <List.Item
                        key={item.name}
                        extra={
                            <img
                                height={200}
                                width={200}
                                alt="parts"
                                object-fit="cover"
                                src={item.image}
                            />
                        }
                    >
                        <List.Item.Meta
                            title={<a href={item.url}>{item.name}</a>}
                            description={description(item.url, item.price, item.number)}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
            <h2>Related Models</h2>
            <List
                itemLayout="horizontal"
                dataSource={Models}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={<a href={item.link}>{item.number}</a>}
                            description={desc(item.brand, item.description)}
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}

export default Scraper



