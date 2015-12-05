module.exports = function(aJSONString) {
    this.cacheable();

    return JSON.stringify(JSON.parse(aJSONString));
};
