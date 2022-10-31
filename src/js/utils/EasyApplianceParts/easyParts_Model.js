import axios from 'axios';
import cheerio from 'cheerio';

//https://www.easyapplianceparts.ca/PartInfo.aspx?inventory=12365300&SourceCode=3&SearchTerm=5304513033

async function relatedPartsEasyParts(url) {
    //exports.dataFromReliableParts = async url => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        let results = [];
        let result = [];

        let name, link, image, content = "";
        let price = 0;

        $("div[class='seo-item js-ua-km-partrow']").each(function () {
            name = $("[id*='PageContent_rptPartsGrid_PartLink2_']", this).html();
            link = 'https://www.easyapplianceparts.ca/' + $("a[id*='PageContent_rptPartsGrid_PartLink2_']", this).prop("href");
            image = $("img", this).prop("src");;
            content = $("p[class='copy-text kenmore-desc-wrap']", this).text()
            price = $("div[class='seo-price-wrap']", this).find("strong").text().slice(1)
            console.log(result);

            if (result) {
                results.push({
                    name: name,
                    link: link,
                    image: image,
                    content: content,
                    price: price
                })
            }
        });
        return results;


    } catch (err) {
        console.error(err);
    }
}

export default relatedPartsEasyParts