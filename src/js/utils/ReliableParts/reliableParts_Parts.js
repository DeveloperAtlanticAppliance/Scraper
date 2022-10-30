import axios from 'axios';
import cheerio from 'cheerio';
const Product = require("../../models/Product");
//const httpProxy = require('http-proxy');

function multipleResults(html) {
    const results = [];

    html("[class^=product-box-4col]").each(function () {
        results.push({
            name: (html("[class^=productName]", this).text()),
            number: (html("[class^=item-details]", this).text()),
            price: (html("[class^=product-price]", this).text().match(/\d+(,\d{3})*(\.\d{1,2})?/)[0]),
            url: (html("[class^=productName]", this).prop("href")),
            image: (html("[class^=product-image]", this).html().match(/url.*200/)[0].slice(4)),
            related: ''
        });
    });
    return results;
}


async function dataFromReliableParts(url) {
    //exports.dataFromReliableParts = async url => {
    try {
        //const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
        //url = `https://cors-anywhere.herokuapp.com${url}`;
        const { data } = await axios.get(url);

        const $ = cheerio.load(data);
        let Products = [];

        let productTitle = $("[id^=mainHeading]").text();
        const retailPrice = $("[class^=product-details-price]").text().slice(1);
        let partsNumber = $("[class^=partNumber]").text();
        const imageLink = $("[data-zoom-id^=productGallery]").prop("href");
        partsNumber = partsNumber.slice(8);
        productTitle = productTitle.substr(productTitle.indexOf(" ") + 1);
        const currentUrl = $("[rel^=canonical]").prop("href");

        if (partsNumber) {

            const result = new Product(productTitle, partsNumber, retailPrice, currentUrl, imageLink, "");

            Products.push(result);
            console.log(Products);

        } else {
            Products = (multipleResults($))
            console.log(Products);
        }
        return (Products);

    } catch (err) {
        console.error(err);
    }
}

export default dataFromReliableParts 