import React, { useState, useEffect } from 'react';
import dataFromReliableParts from "../utils/ReliableParts/reliableParts_Parts";
import relatedModelEasyParts from '../utils/EasyApplianceParts/easyParts_Parts';
import multiPartsEasyParts from '../utils/EasyApplianceParts/multiPartsEasyParts';
import { partScrperbyParts, modelScraperbyParts } from '../utils/SearsPartsDirect/searsDirect_Parts';
import { List, Select } from 'antd';

function Scraper() {

    let results = [];
    let models = [];

    const [Input, setInput] = useState("");
    const [Products, setProducts] = useState([]);
    const [Models, setModels] = useState([]);
    const [TargetPartsSites, setTargetPartsSites] = useState("ReliableParts");
    const [TargetModelSites, setTargetModelSites] = useState("SearsParts");

    /*
    useEffect = (() => {

    }, [TargetPartsSites]);

    useEffect = (() => {

    }, [TargetModelSites]);
    */


    async function getData(input, site) {
        setTargetPartsSites(site);
        switch (TargetPartsSites) {
            case "ReliableParts":
                results = await dataFromReliableParts(`https://cors-anywhere.herokuapp.com/https://www.reliableparts.ca/search?q=${input}`);
                break;
            case "PartSelect":
                break;
            case "SearsParts":
                results = await partScrperbyParts(input);
                break;
            case "EasyParts":
                break;
            default:
                console.log("Site selection is invalid");
                break;
        }

        setProducts(results);
    }

    async function getModels(input, site) {

        setTargetModelSites(site);
        switch (TargetModelSites) {
            case "ReliableParts":
                //results = await 
                break;
            case "PartSelect":
                break;
            case "SearsParts":
                models = await modelScraperbyParts(input);
                console.log(models);
                break;
            case "EasyParts":
                models = await relatedModelEasyParts(`https://cors-anywhere.herokuapp.com/https://www.easyapplianceparts.ca/Search.ashx?SearchTerm=${input}&SearchMethod=standard`);
                console.log("model: ", models);
                if (models[0].easyPartsNumber) {
                    models = await multiPartsEasyParts(`https://cors-anywhere.herokuapp.com/https://www.easyapplianceparts.ca/PartInfo.aspx?inventory=${models[0].easyPartsNumber}`);
                }
                break;
            default:
                console.log("Site selection is invalid");
                break;
        }
        setModels(models);
    }

    const inputHandler = (e) => {
        setInput(e.currentTarget.value);
    }
    const onClickHandler = (e) => {
        getData(Input, TargetPartsSites);
        getModels(Input, TargetModelSites);
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
    const onChangePartSites = (value) => {
        setTargetPartsSites(value);
    }
    const onChangeModelSites = (value) => {
        setTargetModelSites(value);
    }

    return (
        <div>
            <br />
            <form>
                <label>Parts Number: </label>
                <input type="text" style={{ marginRight: "10px" }} id="inputs" name='partsNumber' value={Input} onChange={inputHandler} />
                <input type="button" style={{ marginRight: "5px" }} onClick={onClickHandler} value="Search" />
                <input type="button" onClick={onResetHandler} value="Reset" />
            </form>

            <br /><br />
            <h2>Parts Information</h2>
            <br />
            <Select
                showSearch
                placeholder="Select a Site for the Parts Scraping"
                optionFilterProp="children"
                style={{ width: 250 }}
                defaultValue="ReliableParts"
                onChange={onChangePartSites}
                filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={[
                    {
                        value: 'ReliableParts',
                        label: 'reliableParts.ca',
                    },
                    {
                        value: 'PartSelect',
                        label: 'partselect.ca',
                    },
                    {
                        value: 'SearsParts',
                        label: 'searspartsdirect.com',
                    },
                    {
                        value: 'EasyParts',
                        label: 'easyapplianceparts.ca',
                    },
                ]}
            />
            <br /><br />

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
                /*
                footer={
                    <div>
                        Scraping Data with <b>{Input}</b>
                    </div>
                }
                */
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
            <br />

            <h2>Related Models</h2>
            <br />

            <Select
                showSearch
                placeholder="Select a Site for the Related Models Scraping"
                optionFilterProp="children"
                style={{ width: 250 }}
                defaultValue="SearsParts"
                onChange={onChangeModelSites}
                filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={[
                    {
                        value: 'ReliableParts',
                        label: 'reliableParts.ca',
                    },
                    {
                        value: 'PartSelect',
                        label: 'partselect.ca',
                    },
                    {
                        value: 'SearsParts',
                        label: 'searspartsdirect.com',
                    },
                    {
                        value: 'EasyParts',
                        label: 'easyapplianceparts.ca',
                    },
                ]}
            />
            <br /><br />

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



