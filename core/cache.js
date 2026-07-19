const cache = new Map();

const CACHE_TIME = 5 * 60 * 1000; // 5 minutes

function get(key) {

    const item = cache.get(key);

    if (!item) return null;

    if (Date.now() > item.expire) {

        cache.delete(key);

        return null;

    }

    return item.data;

}

function set(key, data) {

    cache.set(key, {

        data,

        expire: Date.now() + CACHE_TIME

    });

}

function clear() {

    cache.clear();

}

module.exports = {

    get,

    set,

    clear

};
