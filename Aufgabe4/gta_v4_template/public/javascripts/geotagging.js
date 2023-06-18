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
const doc_searchterm = document.getElementById("searchterm");

const form_tagging = document.getElementById("tag-form");

const form_discovery = document.getElementById("discoveryFilterForm");

const mapView = document.getElementById("mapView");

const page_left = document.getElementById("page-left");
const page_right = document.getElementById("page-right");
const page_nav = document.getElementById("page-nav");
const page_counter = document.getElementById("page-count");

const PAGE_LIMIT = 4;

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

async function getTags(pageNum){
        let latitude = lat_name_hidden.value;
        let longitude = long_name_hidden.value;
        let searchterm = doc_searchterm.value;

        let url = `http://localhost:3000/api/geotags/pages?latitude=${latitude}&longitude=${longitude}&searchterm=${searchterm}&page=${pageNum}`;

    let taglist = await fetch(url, {
        method: "GET",
    });
    console.log("Triggered getTags");
    console.log(taglist);

    return await taglist.json();
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

    postTag(tag).then(data => updateView(data));
});

form_discovery.addEventListener("submit", function(event){
    event.preventDefault();

    getTags(0).then(data => {
        updateView(data);
        let pageCount = Math.floor((data["total"]-1) / PAGE_LIMIT);
        page_counter.innerText = `${parseInt(page_nav.dataset.currentpage)+1}/${pageCount+1}`;
        page_nav.dataset.total = data["total"];
    });
    updateLocation();
});

page_left.addEventListener("click", event => {
    changePage(-1);
});

page_right.addEventListener("click", event => {
    changePage(1);
});

function changePage(amount){
    const largestPage = Math.floor((page_nav.dataset.total-1) / PAGE_LIMIT);

    const newPage = parseInt(page_nav.dataset.currentpage) + amount;

    if(newPage > largestPage || newPage < 0) return;

    page_nav.dataset.currentpage = newPage;
    
    getTags(newPage).then(data => {
        updateView(data)
        page_counter.innerText = `${newPage+1}/${largestPage+1}`;
        page_nav.dataset.total = data["total"];
    });
};

function updateView(data){
    const tagListDOM = document.getElementById("discoveryResults");

    if(data["total"] > PAGE_LIMIT ){
        page_nav.style.display = "flex";
    }else{
        page_nav.style.display = "none";
    }

    let arrayOfTags = [];
    tagListDOM.innerHTML = "";
    console.log(data);
    for (const [id, tag] of Object.entries(data["pageTags"])) {
        console.log(tag);
        const newListItem = `<li> ${tag.name} ( ${tag.latitude},${tag.longitude}) ${tag.hashtag} </li>`;
        tagListDOM.innerHTML += newListItem;
        arrayOfTags.push(tag);
    }

    let longitude = long_name_hidden.value;
    let latitude = lat_name_hidden.value;

    mapView.src = mapManager.getMapUrl(latitude, longitude, arrayOfTags);
}

