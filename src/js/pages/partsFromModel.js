import React, { useState } from 'react';
import dataFromReliableParts from "../utils/ReliableParts/reliableParts_Parts";
import relatedModelEasyParts from '../utils/EasyApplianceParts/easyParts_Parts';
import { List } from 'antd';
import dataFromReliableParts2 from '../utils/EasyApplianceParts/easyParts_Model';

function ModelScraper() {

    let results = [];
    let models = [];

    const [ModelInput, setModelInput] = useState("5304513033");
    const [PartsProducts, setPartsProducts] = useState([]);
    const [ModelsProducts, setModelsProducts] = useState([]);
    async function getData(input) {
        //results = await dataFromReliableParts("https://www.reliableparts.ca/search?q=" + input);
        results = await dataFromReliableParts2(input);
        setPartsProducts(results);
    }

    async function getModels(input) {
        models = await relatedModelEasyParts("https://www.easyapplianceparts.ca/PartInfo.aspx?inventory=12365300&SourceCode=3&SearchTerm=" + input);
        console.log("model: ", models)
        setModelsProducts(models);
    }

    const inputHandler = (e) => {
        setModelInput(e.currentTarget.value);
    }
    const onClickHandler = (e) => {
        getData(ModelInput);
        getModels(ModelInput);
    }
    const onResetHandler = (e) => {
        setModelInput("");
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
                <label>Model Number: </label>
                <input type="text" style={{ marginRight: "10px" }} id="inputs" name='partsNumber' value={ModelInput} onChange={inputHandler} />
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
                dataSource={PartsProducts}
                footer={
                    <div>
                        Scraping Data with <b>{ModelInput}</b>
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
                            title={<a href={item.sourceLink}>{item.name}</a>}
                            description={description(item.url, item.price, item.number)}
                        />
                        {item.related}
                    </List.Item>
                )}
            />
            <h2>Parts in this Model</h2>
            <List
                itemLayout="horizontal"
                dataSource={ModelsProducts}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={<a href="https://ant.design">{item.number}</a>}
                            description={desc(item.brand, item.description)}
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}

export default ModelScraper



