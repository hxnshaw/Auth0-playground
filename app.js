const express = require("express");
const app = express();
const { auth } = require("express-openid-connect");
const { requiresAuth } = require("express-openid-connect");
require("dotenv").config();

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
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
  console.log(oidc);
});

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
  console.log(req.oidc.user);
});

app.listen(3000, () => {
  console.log(`App is listening on 3000`);
});
