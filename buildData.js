const RESOURCE = require("./SFBundleDocument.json");

// // console.log(resouces.entry[1])

// let profiles = [];
// // console.log(resouces.entry.length);

// profiles = profiles.concat(resouces.entry.slice(1));

// console.log(profiles.length);

// let resContent = profiles.map(profile => profile.resource);

// console.log(resContent[0]);

function DATA(resouces) {
    let profiles = resouces.entry.slice(1);
    let resContent = profiles.map(profile => profile.resource);
    return resContent;
}


module.exports = {
    DATA,
};


