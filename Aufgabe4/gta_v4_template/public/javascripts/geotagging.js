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
const tag_name = document.getElementById("tagg_name");
const hashtag = document.getElementById("hashtag");

const long_name_hidden = document.getElementById("long_name_hidden");
const lat_name_hidden = document.getElementById("lat_name_hidden");

const form_tagging = document.getElementById("tag-form");

const mapView = document.getElementById("mapView");

/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */
const mapManager = new MapManager(MAP_API_KEY);

async function updateLocation(){
    let longitude = long_name_hidden.value;
    let latitude = lat_name_hidden.value;

    const taglist_json = JSON.parse(mapView.dataset.tags); //...dadurch parsing nicht möglich, hier ABBRUCH
    
    if(longitude == "" && latitude == ""){
        LocationHelper.findLocation((locationHelper) => {
            longitude = locationHelper.longitude;
            latitude = locationHelper.latitude;
            long_name.value = longitude;
            long_name_hidden.value = longitude;
        
            lat_name.value = latitude;
            lat_name_hidden.value = latitude;
            mapView.src = mapManager.getMapUrl(latitude, longitude, taglist_json);
        });
    }else{
        mapView.src = mapManager.getMapUrl(latitude, longitude, taglist_json);
    }
    
}

async function postTag(tag){
    let response = await fetch("http://localhost:3000/api/geotags", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(tag),
    });
    return await response.json();
}

// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    updateLocation();
});

form_tagging.addEventListener("submit", function(event) {
    event.preventDefault();

    let tag = {
        name: tag_name.value,
        latitude: lat_name.value,
        longitude: long_name.value,
        hashtag: hashtag.value
    }

    postTag(tag);
});