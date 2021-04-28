const path = require("path");
const express = require("express");
const hbs = require("hbs");
const goecode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup hanlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Joe",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Joe",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is helpful text",
    title: "Help",
    name: "Joe",
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({ error: "You must provide a address" });
  }

  goecode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecast) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast,
        location,
        address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  const { search, rating } = req.query;
  if (!search) {
    return res.send({ error: "You must provide a search term" });
  }

  console.log(search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errMsg: "Help article not found.",
    name: "Joe",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errMsg: "Page not found.",
    name: "Joe",
  });
});

app.listen(2900, () => {
  console.log("Server is up on prot 2900.");
});
