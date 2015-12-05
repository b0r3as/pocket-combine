module.exports = function(aRawTemplateString) {
    this.cacheable();

    return aRawTemplateString
        .replace(/\s*(?:\r|\n|\r\n)\s*/g, ' ')
        .replace(/\> /g, '>')
        .replace(/ \</g, '<');
};
