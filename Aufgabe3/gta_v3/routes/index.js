// File origin: VS1LAB A3

/**
 * This script defines the main router of the GeoTag server.
 * It's a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * Define module dependencies.
 */

const express = require("express");
const router = express.Router();

/**
 * The module "geotag" exports a class GeoTagStore.
 * It represents geotags.
 *
 * TODO: implement the module in the file "../models/geotag.js"
 */
// eslint-disable-next-line no-unused-vars
const GeoTag = require("../models/geotag");

/**
 * The module "geotag-store" exports a class GeoTagStore.
 * It provides an in-memory store for geotag objects.
 *
 * TODO: implement the module in the file "../models/geotag-store.js"
 */
// eslint-disable-next-line no-unused-vars
const GeoTagStore = require("../models/geotag-store");

const currentStore = new GeoTagStore();

/**
 * Route '/' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests cary no parameters
 *
 * As response, the ejs-template is rendered without geotag objects.
 */

// TODO: extend the following route example if necessary
router.get("/", (req, res) => {
  console.log("SIIIUUU");
  let longitude = req.body.text_field_longitude;
  let latitude = req.body.text_field_latitude;
  const data = '[]'
  res.render("index", { taglist: [],
                        longitude: longitude,
                        latitude: latitude,
                        data: data });
});

/**
 * Route '/tagging' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests cary the fields of the tagging form in the body.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * Based on the form data, a new geotag is created and stored.
 *
 * As response, the ejs-template is rendered with geotag objects.
 * All result objects are located in the proximity of the new geotag.
 * To this end, "GeoTagStore" provides a method to search geotags
 * by radius around a given location.
 */

router.post("/tagging", (req, res) => {
  let longitude = req.body.text_field_longitude;
  let latitude = req.body.text_field_latitude;

  const newTag = [
    req.body.text_field_name,
    req.body.text_field_latitude,
    req.body.text_field_longitude,
    req.body.text_field_hashtag,
  ];
  currentStore.addGeoTag(newTag);

  let nearbyTags = currentStore.getNearbyGeoTags(
    req.body.text_field_latitude,
    req.body.text_field_longitude
  );

  const data = JSON.stringify(nearbyTags);
  console.log(data);
  
  res.render("index", { taglist: nearbyTags,
                        longitude: longitude,
                        latitude: latitude,
                        data: data});
});

/**
 * Route '/discovery' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests cary the fields of the discovery form in the body.
 * This includes coordinates and an optional search term.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * As response, the ejs-template is rendered with geotag objects.
 * All result objects are located in the proximity of the given coordinates.
 * If a search term is given, the results are further filtered to contain
 * the term as a part of their names or hashtags.
 * To this end, "GeoTagStore" provides methods to search geotags
 * by radius and keyword.
 */

router.post("/discovery", (req, res) => {
  let longitude = req.body.text_field_longitude;
  let latitude = req.body.text_field_latitude;

  let nearbyTags = currentStore.searchNearbyGeoTags(
    req.body.text_field_search_lat,
    req.body.text_field_search_lon,
    req.body.text_field_searchterm
  );

  let data = JSON.stringify(nearbyTags);
  //MOYIE-KOMMENTAR: JSON-String wird richtig generiert, siehe nachfolgenden console-log
  console.log("data: " + data);

  res.render("index", { taglist: nearbyTags,
                        latitude: latitude,
                        longitude: longitude,
                        data: data });
});

/* about */
router.get("/about", (req, res) => {
  res.render("about");
});

/* help */
router.get("/help", (req, res) => {
  res.render("help");
});

/* imprint */
router.get("/imprint", (req, res) => {
  res.render("imprint");
});

/* privacy */
router.get("/privacy", (req, res) => {
  res.render("privacy");
});

module.exports = router;
