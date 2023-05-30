import MAP_API_KEY from './config.js';
import MapManager from "./map-manager.js";
import LocationHelper from "./location-helper.js";

// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
console.log("The geoTagging script is going to start...");

// Constants for http elements
const long_name = document.getElementById("long_name");
const lat_name = document.getElementById("lat_name");
const long_name_hidden = document.getElementById("long_name_hidden");
const lat_name_hidden = document.getElementById("lat_name_hidden");

const mapView = document.getElementById('mapView');

/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */
const mapManager = new MapManager(MAP_API_KEY);

function updateLocation(){
    LocationHelper.findLocation((locationHelper) => {
        long_name.value = locationHelper.longitude;
        long_name_hidden.value = locationHelper.longitude;

        lat_name.value = locationHelper.latitude;
        lat_name_hidden.value = locationHelper.latitude;

        const newImageURL = mapManager.getMapUrl(locationHelper.latitude, locationHelper.longitude);
        mapView.src = newImageURL;
    });
}

// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    updateLocation();
});