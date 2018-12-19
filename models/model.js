const fs = require("fs");
const dns = require("dns");
exports.getRedirect = (url, cb) => {
  cb(null, url);
};

exports.makeNewLink = (url, cb) => {
  fs.readFile("./data/links.json", (err, data) => {
    // array of stored urls
    const file = JSON.parse(data);
    // if already exists
    const found = file.find(shorturl => shorturl.original_url === url);
    if (found) {
      // return the already existing shortened url json through callback
      cb(null, found);
    } else {
      // verify that the link is functional
      dns.lookup(url, (err, address, family) => {
        console.log(address, family);
        //if valid
        if (family === 4 || family === 6) {
          // add new link json to file
          const obj = { original_url: url, shorturl: file.length + 1 };
          file.push(obj);
          // rewrite file including new json
          fs.writeFile(
            "./data/links.json",
            JSON.stringify(file, null, 2),
            err => {
              if (err) cb(err);
            }
          );
        } else {
          cb("invalid url");
        }
      });
    }
  });
};
