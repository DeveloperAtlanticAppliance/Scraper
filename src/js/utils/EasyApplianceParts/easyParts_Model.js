const puppeteer = require("puppeteer-core");
const cheerio = require("cheerio");
const Product = require("../../models/Product");


function processData(data) {
    console.log("Processing Data...");
    const $ = cheerio.load(data);
    const products = [];

    // From this point, the codes would be for one specific result (search by product number )

    let productTitle = $("[id^=mainHeading]").text();
    const retailPrice = $("[class^=product-details-price]").text().slice(1);
    let partsNumber = $("[class^=partNumber]").text();
    const imageLink = $("[data-zoom-id^=productGallery]").prop("href");
    partsNumber = partsNumber.slice(8);
    productTitle = productTitle.substr(productTitle.indexOf(" ") + 1);
    const currentUrl = $("[rel^=canonical]").prop("href");

    const result = new Product(productTitle, partsNumber, retailPrice, currentUrl, imageLink, "");

    if (partsNumber) {
        products.push(result);
        console.log("Complete");
    }
    else {
        console.log("Can't find a related product or parts");
        console.log(multipleResults($));
    }

    return products;
}

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


async function dataFromReliableParts(search) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = "https://www.reliableparts.ca/search?q=" + search;
    await page.goto(url);
    const data = await page.content();
    await browser.close();
    processData(data);
}

export default dataFromReliableParts;
 //getData("5304513033");