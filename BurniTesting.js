const axios = require("axios");
const fs = require("fs");
const DATA = require("./json/DATA.json");
const RESOURCE = require("./SFBundleDocument.json");
const resContent = require("./buildData");
const resources = resContent.DATA(RESOURCE);

async function POSTBurni(url, data, resID) {
    try {
        let postFhirURL = url.split(`/${resID}`)[0];
        const res = await axios.post(postFhirURL, data);
        // console.log(res.data)

        return {
            status: res.status,
            data: res.data,
            id: res.data.id,
        };
    } catch (e) {
        console.log(e.response.data);

        return e.response.data;
    }
}

async function PUTBruni(url, data) {
    try {
        const res = await axios.put(url, data);
        // console.log(res.data);

        return res.data;
    } catch (e) {
        // console.log(e.response.data);

        return e.response.data;
    }
}

async function GETBurni(url) {
    try {
        const res = await axios.get(url);
        // console.log(res.data);

        return res.data;
    } catch (e) {
        // console.log(e.response.data);

        return e.response.data;
    }
}

async function changeRef(resources, resID) {
    resources.managingOrganization !== undefined ? (resources.managingOrganization.reference = `Organization/${resID}`) : "Not Found";
    resources.subject !== undefined ? (resources.subject.reference = `Patient/${resID}`) : "Not Found";
    resources.resourceType === "Practitioner" ? (PraId = resources.id) : "Error";
    resources.resourceType === "Encounter" ? (EncId = resources.id) : "Error";
    if (resources.resourceType === "Condition") {
        if (resources.performer !== undefined) {
            resources.performer.reference = `Practitioner/${PraId}`;
            resources.encounter.reference = `Encounter/${EncId}`;
        }
    }
}

let stored = [];
let ID = [];
let index = 4
let resType = resources[index].resourceType;
let resID = resources[index].id;
let baseLocal = "http://localhost:8080/fhir/";
let baseVM = "http://192.168.253.128:8080/fhir/";
let BurniURL = `${baseLocal}${resType}/${resID}`;

POSTBurni(BurniURL, resources[index], resID)
    .then((res) => {
        if (res.status !== 201 ) {
            throw new Error("Invalid status code: " + postRes.status);
        }
        stored.push(res.data);
        console.log(stored)
    })
    .catch((e) => {
        console.error(e);
    });

// console.log(resources[0].id)

// PUTBruni(BurniURL, resources[0])
//     .then((res) => {
//         stored.push(res);
//         console.log(stored);
//     })
//     .catch((e) => {
//         console.error(e);
//     });

// GETBurni(BurniURL)
//     .then((res) => {
//         stored.push(res);

//         console.log(stored);
//     })
//     .catch((e) => {
//         console.error(e);
//     });

async function main() {
    try {
        const postRes = await POSTBurni(BurniURL, resources[1]);

        // console.log(postRes.data)

        resources[0].id = postRes.id;
        resID = resources[0].id;
        BurniURL = `http://192.168.253.128:8080/fhir/${resType}/${resID}`;

        const putRes = await PUTBruni(BurniURL, resources[1]);
        // console.log(putRes)

        const getRes = await GETBurni(BurniURL, resources[1]);
        console.log(getRes);
    } catch (e) {
        console.error(e);
    }
}

console.log(resources[4])

async function main2() {
    try {
        console.log("start");
        for (i in resources) {
            let resType = resources[i].resourceType;
            let resID = resources[i].id;
            let BurniURL = `${baseLocal}${resType}/${resID}`;
            // console.log(BurniURL)
            const postRes = await POSTBurni(BurniURL, resources[i], resID);

            if (postRes.status !== 201) {
                throw new Error("Invalid status code: " + postRes.status);

            } else {
                console.log(postRes.data, "\n");
            }

            

            // resources[i].id = postRes.id;
            // resID = resources[i].id;
            // BurniURL = `${baseLocal}${resType}/${resID}`;

            // resources[i].managingOrganization !== undefined ? (resources[i].managingOrganization.reference = `Organization/${resID}`) : "Not Found";
            // resources[i].subject !== undefined ? (resources[i].subject.reference = `Patient/${resID}`) : "Not Found";

            // await changeRef(resources[i], resID);

            // const putRes = await PUTBruni(BurniURL, resources[i]);
            // console.log(putRes)

            // const getRes = await GETBurni(BurniURL, resources[i]);
            // console.log(getRes);

            if (i % 5 == 0) console.log("\n========================pass========================\n");
        }
    } catch (e) {
        console.error(e);
    }
}
console.log("end");
// for (i in resources)
// {
//     console.log(resources[i])
// }

// main();
// main2();

// // GET
// const getFhir = axios.get(Burni);
// getFhir
//     .then((res) => console.log(res.data))
//     .catch((e) => {
//         console.log(e.response.data);
//     });

// delete DATA.managingOrganization

// // PUT
// const putFhir = axios.put(Burni, DATA);
// putFhir
//     .then((res) => console.log(res.data))
//     .catch((e) => {
//         console.log(e.response.data);
//     });

// // POST
// let postFhirURL = Burni.split(`${resID}`)[0]
// console.log(postFhirURL)

// const postFhir = axios.post(postFhirURL, DATA);
// postFhir
//     .then((res) => console.log(res.data))
//     .catch((e) => {
//         console.log(JSON.stringify(e.response.data));
//     });

// const path = __dirname + "/json/result.json";
// const resultJson = JSON.stringify(result, null, 4);
// fs.writeFileSync(path, resultJson, "utf-8", (e) => {
//     if (e) {
//         console.log(e);
//         return;
//     }
// });
