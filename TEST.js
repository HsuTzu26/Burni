const axios = require("axios");
const fs = require("fs");

const DATA = require("./json/DATA.json");

const resType = DATA.resourceType;
const resID = DATA.id;
let fhirURL = `https://hapi.fhir.tw/fhir/${resType}/${resID}`;
const getProfiles = require("../MITW_Track_10_TWCR/(SF)FHIR-Universal-Conversion-Kit/Bundle/getProfilesName");

let profileName = getProfiles.getProfilesName()

// const result = {};
// console.log(DATA);


// GET
// const getFhir = axios.get(fhirURL);
// getFhir
//     .then((res) => console.log(res.data))
//     .catch((e) => {
//         console.log(e.response.data);
//     });

// PUT
// const putFhir = axios.put(fhirURL, DATA);
// putFhir
//     .then((res) => console.log(res.data))
//     .catch((e) => {
//         console.log(e.response.data);
//     });

let Bundle = {
    "resourceType": "Bundle",
    "id": "38b3ba6c-cced-4716-b800-81bf56f814d2",
    "meta": {
        "versionId": "1",
        "lastUpdated": "2023-09-19T10:35:21.177+00:00",
        "source": "#DIfsaU6w94YeSgz3",
        "profile": [
            "https://hapi.fhir.tw/fhir/StructureDefinition/twcr-sf-bundle-profile"
        ]
    },
    "identifier": {
        "system": "https://www.cdc.gov.tw/",
        "value": "TWCR-SF-2023-09-19T18:35:20+08:00"
    },
    "type": "transcation",
    "timestamp": "2023-09-19T18:35:20+08:00",
    "entry": []
}
Bundle.entry[0] = DATA

console.log(JSON.stringify(Bundle, null, 4))
// POST
// let postFhirURL = fhirURL.split(`${resType}/${resID}`)[0]

// const postFhir = axios.post(postFhirURL, Bundle);
// postFhir
//     .then((res) => console.log(res.data))
//     .catch((e) => {
//         console.log(e.response.data);
//     });

const path = __dirname + "/json/result.json";
const json = JSON.stringify(DATA, null, 4);
fs.writeFileSync(path, json, "utf-8", (e) => {
    if (e) {
        console.log(e);
        return;
    }
});
