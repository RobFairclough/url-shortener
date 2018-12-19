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
  if (req.body.url) {
    makeNewLink(req.body.url, (err, done) => {
      if (err) next(err);
      else res.send(done);
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
