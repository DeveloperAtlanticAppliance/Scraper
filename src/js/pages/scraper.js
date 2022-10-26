import React, { useEffect, useState } from 'react';
import dataFromReliableParts from "../utils/ReliableParts/reliableParts_Parts";

function Scraper() {

    const [Product, setProduct] = useState([{
        name: "",
        number: "",
        image: "",
        price: 0,
        url: "",
        related: {},
    }]);

    const [Url, setUrl] = useState("5304513033");


    //TODO invoke value of dataFromReliableParts should be modified as "base url" + input. input is Url state
    async function getData(input) {
        const result = await dataFromReliableParts("https://www.reliableparts.ca/search?q=" + input);
        console.log(result[0]);
        setProduct({
            name: result[0].name,
            number: result[0].number,
            image: result[0].image,
            price: result[0].price,
            url: result[0].url,
        })
    }

    const inputHandler = (e) => {
        setUrl(e.currentTarget.value);
    }


    useEffect(() => {
        getData(Url);
    }, [Url]);


    return (
        <div>
            <p>TEst999</p>
            <p>{Product.name}</p>
        </div>
    );
    //console.log(dataFromReliableParts("5304513033"))
}

export default Scraper



