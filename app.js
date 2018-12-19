const app = require("express")();
const bodyParser = require("body-parser");
const { sendNew, sendRedirect } = require("./controllers/controller");

app.use(bodyParser.json());
app.get("/", () => {
  // homepage
});

app.get("/api/shorturl/:shorturl", sendRedirect);

app.post("/api/shorturl/new", sendNew);

module.exports = { app };
