// File origin: VS1LAB A3
const { v4: uuidv4 } = require('uuid');
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
    #UUID = '';

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

    get UUID(){
        return this.#UUID;
    }

    constructor(name, lat, lon, hash){
        this.#latitude = lat;
        this.#longitude = lon;
        this.#name = name;
        this.#hashtag = hash;
        this.#UUID = uuidv4();
    }
        
}

module.exports = GeoTag;
