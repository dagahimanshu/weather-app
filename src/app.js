const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode = require("./../utils/geocode");
const forecast = require("./../utils/forecast.js");

const app = express();

//Define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Set up handlebar engines and views
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "The Weather App.",
    name: "Himanshu Daga",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Himanshu Daga",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Himanshu",
    message: "I'm using hbs instead of html. May god help me!!",
  });
});

app.get("/weather", (req, resp) => {
  if (!req.query.address) {
    return resp.send({
      error: "You must provide an address!",
    });
  }
  const address = req.query.address;
  geoCode(address, (error, data) => {
    if (error) {
      return resp.send({
        error: error,
      });
    }
    forecast(data, (error, dataf) => {
      if (error) {
        return resp.send({
          error: error,
        });
      } else {
        resp.send({
          location: data.location,
          data: dataf,
        });
      }
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Add search query",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help page not found",
    name: "Himanshu Daga",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Error! page not found",
    name: "Himanshu Daga",
  });
});

app.listen(3000, () => {
  console.log("Server is up!!");
});
