const express = require("express");
const app = express();
const { auth } = require("express-openid-connect");
const { requiresAuth } = require("express-openid-connect");
require("dotenv").config();

//new
const jwt = require("express-jwt");
const jwtsRsa = require("jwks-rsa");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

app.use(auth(config));

// app.get("/", (req, res) => {
//   res.send("Hello there!");
// });

app.get("/", (req, res) => {
  // res.send("Working!");
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
  console.log(req.oidc.user);
  // console.log("Working well");
});

app.get("/profile", requiresAuth(), (req, res) => {
  res.send("My profile");
  // res.send(JSON.stringify(req.oidc.user));
  console.log(req.oidc.user);
});

//timesheet
app.post("/timesheets/upload", function (req, res) {
  res
    .status(201)
    .send({ message: "This is the POST /timesheets/upload endpoint" });
});

app.listen(3000, () => {
  console.log(`App is listening on 3000`);
});
