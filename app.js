const app = require("express")();
const bodyParser = require("body-parser");
const { sendNew, sendRedirect, sendAll } = require("./controllers/controller");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.get("/", (req, res, next) => {
  // homepage
  res.send(`<!DOCTYPE html>
<head>
  <title>The Incredible Link Shortening Machine</title>
</head>
<style>
  #wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 50%);
    text-align: center;
    margin: auto;
  }
  #container {
    display: inline-block;
    margin: auto;
  }
</style>
<body>
  <header></header>
  <main id="wrapper">
    <div id="container">
      <form
        enctype="application/json"
        id="new link"
        action="/api/shorturl/new"
        method="post"
      >
        <label for="url">Your url: </label>
        <input
          type="url"
          id="urlInput"
          placeholder="A link to shrink"
          name="url"
        />
        <button type="submit">Say the magic words...</button>
        <span id="status"></span>
      </form>
    </div>
  </main>
</body>
`);
});

app.get("/api/all", sendAll);

app.get("/api/shorturl/:shorturl", sendRedirect);

app.post("/api/shorturl/new", sendNew);

module.exports = { app };
