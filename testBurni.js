const axios = require("axios");
const fs = require("fs");
const resources = require("./BundleDocument.json");

const Burni = "http://192.168.253.128:8080/fhir/";

let resourceType = resources.entry[2].resource.resourceType;
let resourceID = resources.entry[2].resource.id;
let DATA = resources.entry[2]
const burniPutURL = `${Burni}${resourceType}/${resourceID}`;
const burniGetURL = `${Burni}${resourceType}/${resourceID}`;

delete DATA.resource.managingOrganization
console.log(DATA)
const putBurni = axios.put(burniPutURL, DATA);
let result = DATA
putBurni
    .then((res) => (console.log(res.data)))
    .catch((e) => {
        console.log(e.response.data);
    });
const path = __dirname + "\json.json"

const resultJson = JSON.stringify(result, null, 4);
fs.writeFileSync(path, resultJson, "utf-8", (e) => {
    if (e) {
        console.log(e);
        return;
    }
});
