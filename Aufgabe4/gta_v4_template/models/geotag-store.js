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

    #geoTagMap = new Map;

    addGeoTag(geoTag){
        id = this.#geoTagMap.length;
        const geoTagElement = new GeoTag(geoTag.latitude, geoTag.longitude, geoTag.name, geoTag.hashtag);
        this.#geoTagMap.push(id ,geoTagElement);
        return id;
    }

    removeGeoTag(id){
        this.#geoTagMap.delete(id);
    }
    
    getNearbyGeoTags(lat, lon){
        const r = 0.1;
        //let nearbyTags = [];
        /*for(let i = 0; i < this.#geoTagArr.length; i++){
            if(lat - this.#geoTagArr[i].latitude < r && lon - this.#geoTagArr[i].longitude < r){
                nearbyTags.push(this.#geoTagArr[i]);
            }
        }*/
        return this.#geoTagMap.filter(tag => lat - tag.latitude < r && lon - tag.longitude < r);
    }

    searchNearbyGeoTags(lat, lon, keyword){
        let nearbyTags = this.getNearbyGeoTags(lat, lon);
        let filteredTags = new Map;
        if(!keyword) return nearbyTags;

        for(let i = 0; i < nearbyTags.length; i++){
            if (nearbyTags.get(i).name.includes(keyword) || nearbyTags.get(i).hashtag.includes(keyword)){
                filteredTags.push(nearbyTags[i]);
            }
        }
        return filteredTags;
    }

    constructor(){
        let exampleTags = GeoTagExamples.tagList;
        for (let i = 0; i < exampleTags.length; i++) {
            this.addGeoTag(exampleTags[i]);
        }
    }
}

module.exports = InMemoryGeoTagStore
