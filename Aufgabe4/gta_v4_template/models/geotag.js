// File origin: VS1LAB A3
/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/** * 
 * A class representing geotags.
 * GeoTag objects should contain at least all fields of the tagging form.
 */
class GeoTag {
    #latitude = '';
    #longitude = '';
    #name = '';
    #hashtag = '';

    get latitude(){
        return this.#latitude;
    }

    get longitude(){
        return this.#longitude;
    }

    get name(){
        return this.#name;
    }

    get hashtag(){
        return this.#hashtag;
    }

    constructor(name, lat, lon, hash){
        this.#latitude = lat;
        this.#longitude = lon;
        this.#name = name;
        this.#hashtag = hash;
    }

    toJSON(){
        return {
            name: this.#name,
            latitude: this.#latitude,
            longitude: this.#longitude,
            hashtag: this.#hashtag,
        };
    }
        
}

module.exports = GeoTag;
