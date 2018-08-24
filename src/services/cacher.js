import camelCase from 'camel-case';

// 就像LRU CACHE那样保存Googlemap的信息，使我们不用重复的去取值。

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