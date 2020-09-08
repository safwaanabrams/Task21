const express = require("express");

const path = require("path");

const bodyParser = require("body-parser");

const searchMedia = require("./routes/searchMedia");
const searchAll = require("./routes/searchAll");
const favourite = require("./routes/favourite");
const getList = require("./routes/getList");
const LoadMore = require("./routes/LoadMore");


const fetch = require("node-fetch");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/search/:term/:media", searchMedia);
app.get("/search/:term", searchAll);
app.get("/api/batman", getList);
app.get("/api/favourites", favourite);
app.get("/search/:term/:media/:limit", LoadMore)


const helmet = require("helmet");
app.use(helmet());


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

module.exports = app;