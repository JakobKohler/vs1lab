// File origin: VS1LAB A3, A4

/**
 * This script defines the main router of the GeoTag server.
 * It's a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * Define module dependencies.
 */

const express = require('express');
const router = express.Router();

/**
 * The module "geotag" exports a class GeoTagStore. 
 * It represents geotags.
 */
// eslint-disable-next-line no-unused-vars
const GeoTag = require('../models/geotag');

/**
 * The module "geotag-store" exports a class GeoTagStore. 
 * It provides an in-memory store for geotag objects.
 */
// eslint-disable-next-line no-unused-vars
const GeoTagStore = require('../models/geotag-store');
const currentStore = new GeoTagStore;

// App routes (A3)

/**
 * Route '/' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests cary no parameters
 *
 * As response, the ejs-template is rendered without geotag objects.
 */

router.get("/", (req, res) => {
  let longitude = req.body.text_field_longitude;
  let latitude = req.body.text_field_latitude;
  const data = '[]'
  res.render("index", { taglist: [],
                        longitude: longitude,
                        latitude: latitude,
                        data: data });
});

// API routes (A4)

/**
 * Route '/api/geotags' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests contain the fields of the Discovery form as query.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * As a response, an array with Geo Tag objects is rendered as JSON.
 * If 'searchterm' is present, it will be filtered by search term.
 * If 'latitude' and 'longitude' are available, it will be further filtered based on radius.
 */

// TODO: ... your code here ...
router.get("/api/geotags", (req,res) => {
  let longitude = req.query.longitude || "";
  let latitude = req.query.latitude || "";
  let searchterm = req.query.searchterm || "";

  console.log(("QUERY " + latitude + longitude + searchterm));

  let currentJson = fetchRelevantTags(latitude, longitude, searchterm);

  res.json(JSON.stringify(currentJson));
});

router.get("/api/geotags/pages/:pageNum", (req, res) => {
  const pageSize = 5;

  let longitude = req.query.longitude || "";
  let latitude = req.query.latitude || "";
  let searchterm = req.query.searchterm || "";
  let pageNum = req.params.pageNum;

  let currentJson = fetchRelevantTags(latitude, longitude, searchterm);
  const entries = Object.entries(currentJson);
  
  const currentPageContent = entries.slice(pageNum * pageSize, (pageNum+1) * pageSize);
  console.log(currentPageContent);

});

function fetchRelevantTags(latitude, longitude, searchterm){
  let currentJson;
  if (searchterm != "") {
    currentJson = Object.fromEntries(currentStore.searchNearbyGeoTags(latitude, longitude, searchterm));
  } else if (latitude != "" && longitude != "") {
    currentJson = Object.fromEntries(currentStore.getNearbyGeoTags(latitude, longitude));
  } else {
    currentJson = Object.fromEntries(currentStore.getAll());
  }

  return currentJson;
}


/**
 * Route '/api/geotags' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests contain a GeoTag as JSON in the body.
 * (http://expressjs.com/de/4x/api.html#req.query)
 *
 * The URL of the new resource is returned in the header as a response.
 * The new resource is rendered as JSON in the response.
 */

// TODO: ... your code here ...
router.post("/api/geotags", (req,res) => {
  console.log(req.body);
  let element = currentStore.addGeoTag(req.body);
  
  res.json(JSON.stringify(element));
  res.status(201).end();
});

/**
 * Route '/api/geotags/:id' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests contain the ID of a tag in the path.
 * (http://expressjs.com/de/4x/api.html#req.params)
 *
 * The requested tag is rendered as JSON in the response.
 */

// TODO: ... your code here ...
router.get("/api/geotags/:id", (req,res) => {
  let id = req.params.id;
  res.json(JSON.stringify(currentStore.getById(id)));
});


/**
 * Route '/api/geotags/:id' for HTTP 'PUT' requests.
 * (http://expressjs.com/de/4x/api.html#app.put.method)
 *
 * Requests contain the ID of a tag in the path.
 * (http://expressjs.com/de/4x/api.html#req.params)
 * 
 * Requests contain a GeoTag as JSON in the body.
 * (http://expressjs.com/de/4x/api.html#req.query)
 *
 * Changes the tag with the corresponding ID to the sent value.
 * The updated resource is rendered as JSON in the response. 
 */

// TODO: ... your code here ...
router.put("/api/geotags/:id", (req,res) => {
  let id = req.params.id;
  let json_tag = req.body;
  let newTag = new GeoTag(json_tag.name, 
                          json_tag.latitude, 
                          json_tag.longitude, 
                          json_tag. hashtag);
  currentStore.updateId(id, newTag);
  res.json(JSON.stringify(newTag));
  res.status(202).end();
});


/**
 * Route '/api/geotags/:id' for HTTP 'DELETE' requests.
 * (http://expressjs.com/de/4x/api.html#app.delete.method)
 *
 * Requests contain the ID of a tag in the path.
 * (http://expressjs.com/de/4x/api.html#req.params)
 *
 * Deletes the tag with the corresponding ID.
 * The deleted resource is rendered as JSON in the response.
 */

// TODO: ... your code here ...
router.delete("/api/geotags/:id", (req,res) => {
  let id = req.params.id;
  let oldTag = currentStore.deleteById(id);
  res.json(JSON.stringify(oldTag));
  res.status(202).end();
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
