import React, { useState } from 'react';
import relatedPartsEasyParts from '../utils/EasyApplianceParts/easyParts_Model';
import { List, Pagination } from 'antd';

function ModelScraper() {

    let parts, data = [];
    let pages = 1;

    const [ModelInput, setModelInput] = useState("");
    const [PartsProducts, setPartsProducts] = useState([]);
    const [PageNumbers, setPageNumbers] = useState(1);

    // https://www.easyapplianceparts.ca/KenmoreModels.aspx?ModelNum=${input}&Page=${pageNumber}#PageContent_PagerTop
    async function getParts(input, pageNumber) {
        //let pageNumber = 1;
        data = await relatedPartsEasyParts(`https://cors-anywhere.herokuapp.com/https://www.easyapplianceparts.ca/KenmoreModels.aspx?ModelNum=${input}&Page=${pageNumber}#PageContent_PagerTop`);
        parts = data.results;
        pages = data.maxPage;
        setPageNumbers(pages);
        setPartsProducts(parts);
    }

    const inputHandler = (e) => {
        setModelInput(e.currentTarget.value);
    }
    const onClickHandler = (e) => {
        //getData(ModelInput);
        getParts(ModelInput, 1);
    }
    const onResetHandler = (e) => {
        setModelInput("");
    }

    const pageHandler = (page) => {
        getParts(ModelInput, page);
    };

    const desc = (price) => {
        return `Retail Price: ${price}`
    }

    return (
        <div>
            <form>
                <label>Model Number: </label>
                <input type="text" style={{ marginRight: "10px" }} id="inputs" name='partsNumber' value={ModelInput} onChange={inputHandler} />
                <input type="button" style={{ marginRight: "5px" }} onClick={onClickHandler} value="Search" />
                <input type="button" onClick={onResetHandler} value="Reset" />
            </form>

            <h2>Parts in Model {ModelInput}</h2>

            <List
                itemLayout="vertical"
                size="large"
                dataSource={PartsProducts}
                footer={
                    <div>
                        <Pagination
                            showSizeChanger={false}
                            pageSize={15}
                            defaultCurrent={1}
                            total={PageNumbers}
                            onChange={pageHandler}
                        />

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
                            title={<a href={item.link}>{item.name}</a>}
                            description={desc(item.price)}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
        </div>
    )
}

export default ModelScraper



