import axios from 'axios';
import cheerio from 'cheerio';

//https://www.easyapplianceparts.ca/PartInfo.aspx?inventory=12365300&SourceCode=3&SearchTerm=5304513033

async function relatedModelEasyParts(url) {
    //exports.dataFromReliableParts = async url => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        let results = [];
        let result = [];

        let brands, numbers, descriptions = "";

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
        return result;


    } catch (err) {
        console.error(err);
    }
}

export default relatedModelEasyParts