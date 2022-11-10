import axios from 'axios';
import cheerio from 'cheerio';

async function relatedModelEasyParts(url) {
    //exports.dataFromReliableParts = async url => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        let results = [];
        let result = [];

        let brands, numbers, descriptions, easyPartsNumber = "";

        easyPartsNumber = ($("div[class='seo-price-wrap']").find("p[class='nf-value']").text().split('\n')[0].slice(3));

        $("[class^=model-cross-reference]").each(function () {

            brands = ($("[class^=model-cross-reference__list-content__model-row__brand]", this).html());
            numbers = ($("[class^=model-cross-reference__list-content__model-row__model]", this).html());
            descriptions = ($("[class^=model-cross-reference__list-content__model-row__desc]", this).html());

            if (brands) {
                results.push({
                    brand: brands,
                    number: numbers,
                    description: descriptions,
                    link: `https://www.easyapplianceparts.ca/KenmoreModels.aspx?ModelNum=${numbers}`
                });
            }
            result = results.slice(2);
        });

        if (result.length === 0) {
            console.log("executed", result);
            result.push({
                easyPartsNumber: easyPartsNumber,
            })
        }
        return result;


    } catch (err) {
        console.error(err);
    }
}


export default relatedModelEasyParts