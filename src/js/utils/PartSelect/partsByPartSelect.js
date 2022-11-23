import axios from 'axios';
import cheerio from 'cheerio';

// https://www.partselect.ca/Search.ashx?SearchTerm=5304513033&SearchMethod=standard

export async function partByPartsWithPartSelect(input) {

    try {
        let url = `https://cors-anywhere.herokuapp.com/https://www.partselect.ca/Search.ashx?SearchTerm=${input}&SearchMethod=standard`;

        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        let results = [];
        let result = [];

        let name, link, image, content, partsNumber = "";
        let price = 0;

        $("div[class='row mb-4']").each(function () {
            //name = $("div[class='col-12']", this).find("h1").text();
            name = $("h1[class='title-lg mt-1 mb-3']").text();
            price = $("span[class='js-partPrice']").text();
            partsNumber = $("span[itemprop='mpn']").text();
            content = $("div[itemprop='description']").text();
            image = $("img[itemprop='image']").prop("src");
            link = $("link[itemprop='url']").prop("href");

            console.log(result);

            if (result) {
                results.push({
                    name: name,
                    url: link,
                    image: image,
                    content: content,
                    price: price,
                    number: partsNumber,
                })
            }
        });

        console.log(results);
        return (results);

    } catch (err) {
        console.error(err);
    }
}

export async function modelByPartsWithPartSelect(input, pageNumber) {

    try {
        let url = `https://cors-anywhere.herokuapp.com/https://www.partselect.ca/Search.ashx?SearchTerm=${input}&SearchMethod=standard`;

        let { data } = await axios.get(url);
        let $ = cheerio.load(data);

        const currentUrl = $("link[itemprop='url']").prop("href");
        const partSelectID = $("span[itemprop='productID']").text().slice(2);
        url = `https://cors-anywhere.herokuapp.com/${currentUrl}?currentPage=${pageNumber}&inventoryID=${partSelectID}&handler=ModelCrossReference`;
        //url = `https://cors-anywhere.herokuapp.com/${currentUrl}?currentPage=5&inventoryID=${partSelectID}&handler=ModelCrossReference`;


        console.log(currentUrl, partSelectID, url);
        data = await (await axios.get(url)).data;
        $ = cheerio.load(data);

        let results = [];
        //let result = [];

        let brands, link, modelNumber, category = "";

        $("div[class='row']").each(function () {
            brands = $("div[class='col-6 col-md-3']", this).html();
            link = $("a[class='col-6 col-md-3 col-lg-2']", this).prop("href");
            modelNumber = $("a[class='col-6 col-md-3 col-lg-2']", this).html();
            category = $("div[class='col col-md-6 col-lg-7']", this).html();;

            if (modelNumber) {
                results.push({
                    brand: brands,
                    link: `https://www.partselect.ca/${link}`,
                    number: modelNumber,
                    description: category,
                })
            }
        });

        console.log({ results });
        return results;

    } catch (err) {
        console.error(err);
    }
}
