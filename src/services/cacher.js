import camelCase from 'camel-case';

let instance = null;

export class Cacher {

    cache ={};

    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    // check if visited or not
    isValueCached(key) {
        return this.getCacheValue(key);
    }

    // add
    cacheValue(key, value) {
        this.cache[camelCase(key)] = value;
    }

    // get value
    getCacheValue(key) {
        return this.cache[camelCase(key)];
    }
}