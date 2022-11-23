import axios from 'axios';
import cheerio from 'cheerio';

export async function partScrperbyParts(input) {

    try {
        let url = await readUrl(input);

        url = `https://cors-anywhere.herokuapp.com/${url}`;

        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        let results = [];
        let result = [];

        let name, link, image, content, partsNumber = "";
        let price = 0;

        $("div[class='product-page']").each(function () {
            name = $("div[class='col-12']", this).find("h1").text();
            name = name.substring(0, name.lastIndexOf(" "));
            partsNumber = ($("div[class='row no-gutters pt-2']").find("div[class='col-12']").text()).split(' ')[1].slice(1);
            link = url;
            image = $("img", this).prop("src");
            content = $("div[id='partDescription']", this).text();
            price = ($("div[class='pb-2 d-flex flex-column']").find("span[class='pricing red']").text()).slice(1);

            console.log(result);

            if (result) {
                results.push({
                    name: name,
                    link: link,
                    image: image,
                    content: content,
                    price: price,
                    partsNumber: partsNumber,
                })
            }
        });

        console.log(results);
        return (results);

    } catch (err) {
        console.error(err);
    }
}

export async function modelScraperbyParts(input) {

    try {
        let url = await readUrl(input);
        url = `https://cors-anywhere.herokuapp.com/${url}`;

        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        let results = [];
        let result = [];

        let name, link, modelNumber, category = "";

        $("div[class='product-page']").each(function () {
            name = $("table[class='model-cross-reference table text-break']").find("a").html();
            link = $("table[class='model-cross-reference table text-break']").find("a").prop("href");
            modelNumber = ($("table[class='model-cross-reference table text-break']").find("a").html().split(' ')[1]).slice(1);
            category = $("div[class='col col-md-6']", this).text();;

            if (result) {
                results.push({
                    name: name,
                    link: link,
                    number: modelNumber,
                    category: category,
                })
            }
        });

        console.log({ results });
        return ({
            results: results,
            maxPage: 1,
        });


    } catch (err) {
        console.error(err);
    }
}

async function readUrl(input) {
    try {
        let url = `https://cors-anywhere.herokuapp.com/https://www.searspartsdirect.com/search?q=${input}`;

        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        console.log(data)

        let scrapingNumber, currentUrl = "";

        $("div[class='container']").each(function () {

            currentUrl = $("span[class='partdesc__part-title']").children("a").prop("href");
            //scrapingNumber = $("span[class='spd-orange']").text().slice(1);
            scrapingNumber = $("span[class='partdesc__part-title']", this).html()

            /*
            if (scrapingNumber) {
                results.push({
                    name: name,
                    link: link,
                    number: modelNumber,
                    category: category,
                })
            }*/
        });


        console.log("scrapingNumber: ", scrapingNumber, " input: ", input, " currentUrl: ", currentUrl);

        if (input === scrapingNumber) {
            return currentUrl;
        }
        else {
            console.log("There is no data related to your input")
        }

    } catch (err) {
        console.error(err);
    }
}
