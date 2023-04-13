// File origin: VS1LAB A3

const GeoTag = require("./geotag");
const GeoTagExamples = require('./geotag-examples');

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * A class for in-memory-storage of geotags
 * 
 * Use an array to store a multiset of geotags.
 * - The array must not be accessible from outside the store.
 * 
 * Provide a method 'addGeoTag' to add a geotag to the store.
 * 
 * Provide a method 'removeGeoTag' to delete geo-tags from the store by name.
 * 
 * Provide a method 'getNearbyGeoTags' that returns all geotags in the proximity of a location.
 * - The location is given as a parameter.
 * - The proximity is computed by means of a radius around the location.
 * 
 * Provide a method 'searchNearbyGeoTags' that returns all geotags in the proximity of a location that match a keyword.
 * - The proximity constrained is the same as for 'getNearbyGeoTags'.
 * - Keyword matching should include partial matches from name or hashtag fields. 
 */
class InMemoryGeoTagStore{

    #geoTagArr = [];

    addGeoTag(geoTag){
        const geoTagElement = new GeoTag(geoTag[0], geoTag[1], geoTag[2], geoTag[3]);
        this.#geoTagArr.push(geoTagElement);
    }

    removeGeoTag(geoTag){
        //In welcher Form kommt der GeoTag hier an?
        for(let i = 0; i < this.#geoTagArr.length; i++){
            if(this.#geoTagArr[i].name == geoTag[0]){
                this.#geoTagArr.splice(i, 1);
            }
        }
    }
    
    getNearbyGeoTags(lat, lon){
        const r = 0.1;
        let nearbyTags = [];
        for(let i = 0; i < this.#geoTagArr.length; i++){
            if(lat - this.#geoTagArr[i].latitude < r && lon - this.#geoTagArr[i].longitude < r){
                nearbyTags.push(this.#geoTagArr[i]);
            }
        }
        return nearbyTags;
    }

    searchNearbyGeoTags(lat, lon, keyword){
        let nearbyTags = this.getNearbyGeoTags(lat, lon);
        if(!keyword) return nearbyTags;
        
        for(let i = 0; i < nearbyTags; i++){
            if (nearbyTags[i].name.contains(keyword) || nearbyTags[i].hashtag.contains(keyword)){
                continue;
            }

            nearbyTags.splice(i, 1);
        }

        return nearbyTags;
    }

    constructor(){
        let exampleTags = GeoTagExamples.tagList;
        for (let i = 0; i < exampleTags.length; i++) {
            this.addGeoTag(exampleTags[i]);
        }
    }

}

module.exports = InMemoryGeoTagStore
