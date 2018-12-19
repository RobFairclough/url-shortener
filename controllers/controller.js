const { getRedirect, makeNewLink, getAll } = require("../models/model");

// get shortened link
const sendRedirect = (req, res, next) => {
  getRedirect(req.params.shorturl, (err, link) => {
    if (err) next(err);
    else res.status(302).redirect(link);
  });
};
// create new shortened link
const sendNew = (req, res, next) => {
  console.log(req.body);
  if (req.body.url) {
    makeNewLink(req.body.url, (err, done) => {
      if (err) {
        next(err);
      } else {
        console.log(done);
        res.send(
          JSON.stringify(
            `Let's throw out that old URL. Here's your brand new, short, snappy and very magical new one: ${done} \n \n Much better than something dull and long like ${
              req.body.url
            }, isn't it?`,
            null,
            2
          )
        );
      }
    });
  } else next({ status: 400, error: "no url found in POST request" });
};

const sendAll = (req, res, next) => {
  getAll((err, done) => {
    if (err) next(err);
    else res.send(done);
  });
};

module.exports = { sendRedirect, sendNew, sendAll };
