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
        id = this.#geoTagMap.size;
        const geoTagElement = new GeoTag(geoTag.name, geoTag.latitude, geoTag.longitude,  geoTag.hashtag);
        this.#geoTagMap.push(id ,geoTagElement);
        return id;
    }

    removeGeoTag(id){
        this.#geoTagMap.delete(id);
    }
    
    getNearbyGeoTags(lat, lon){
        const r = 0.1;
        return  new Map([...this.#geoTagMap].filter((id,tag)=>tag => lat - tag.latitude < r && lon - tag.longitude < r));
    }

    searchNearbyGeoTags(lat, lon, keyword){
        let nearbyTags = this.getNearbyGeoTags(lat, lon);
        return new Map([...nearbyTags].filter((id,tag)=>tag.name.includes(keyword) || tag.hashtag.includes(keyword)));
    }

    constructor(){
        let exampleTags = GeoTagExamples.tagList;
        for (let i = 0; i < exampleTags.length; i++) {
            this.addGeoTag(exampleTags[i]);
        }
    }
}

module.exports = InMemoryGeoTagStore
