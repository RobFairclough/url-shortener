const fs = require("fs");
const dns = require("dns");

exports.getAll = cb => {
  fs.readFile("./data/links.json", (err, data) => {
    const links = JSON.parse(data);
    cb(null, links);
  });
};

exports.getRedirect = (url, cb) => {
  fs.readFile("./data/links.json", (err, linkFile) => {
    const links = JSON.parse(linkFile);
    console.log(typeof links[0].short_url);
    const found = links.find(link => link.short_url === parseInt(url));
    console.log(found);
    if (found) {
      cb(null, found.original_url);
    } else {
      cb("url not found");
    }
  });
};

exports.makeNewLink = (url, cb) => {
  fs.readFile("./data/links.json", (err, data) => {
    // array of stored urls
    const file = JSON.parse(data);
    // if already exists
    let urlCheck = url.startsWith("http") ? url : `https://${url}`;
    const found = file.find(shorturl => shorturl.original_url === urlCheck);
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
          const obj = {
            original_url: urlCheck,
            short_url: file.length + 1
          };
          file.push(obj);
          // rewrite file including new json
          fs.writeFile(
            "./data/links.json",
            JSON.stringify(file, null, 2),
            err => {
              if (err) cb(err);
              else cb(null, "done");
            }
          );
        } else {
          cb("invalid url");
        }
      });
    }
  });
};
