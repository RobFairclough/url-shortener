const app = require("express")();
const bodyParser = require("body-parser");
const { sendNew, sendRedirect, sendAll } = require("./controllers/controller");

app.use(bodyParser.json());
app.get("/", (req, res, next) => {
  // homepage
  res.send(
    `USAGE: POST request to /api/shorturl/new with a body of {"url": [linktoshorter]} will create a new redirect link, /api/shorturl/[number] will redirect you to the site stored at that shorturl /api/all will display all shorturls`
  );
});

app.get("/api/all", sendAll);

app.get("/api/shorturl/:shorturl", sendRedirect);

app.post("/api/shorturl/new", sendNew);

module.exports = { app };
