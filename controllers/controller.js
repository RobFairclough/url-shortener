const { getRedirect, makeNewLink } = require("../models/model");

// get shortened link
const sendRedirect = (req, res, next) => {
  getRedirect(req.params.shorturl, (err, link) => {
    if (err) next(err);
    else res.send(link);
  });
};
// create new shortened link
const sendNew = (req, res, next) => {
  if (req.body.url) {
    makeNewLink(req.body.url, (err, done) => {
      if (err) next(err);
      else res.send(done);
    });
  } else next({ status: 400, error: "no url found in POST request" });
};

module.exports = { sendRedirect, sendNew };
