'use strict';

var Filter = require('broccoli-filter');
var tss = require('typescript-simple');
var ts = require('typescript');

var tssCompiler = new tss.TypeScriptSimple({target: ts.ScriptTarget.ES5, noImplicitAny: true,sourceMap: true});


function TypeScriptFilter(inputTree, options) {
    if (!(this instanceof TypeScriptFilter)) {
        return new TypeScriptFilter(inputTree, options);
    }

    this.inputTree = inputTree;
    this.options = options || {};
}

TypeScriptFilter.prototype = Object.create(Filter.prototype);
TypeScriptFilter.prototype.constructor = TypeScriptFilter;

TypeScriptFilter.prototype.extensions = ['ts'];
TypeScriptFilter.prototype.targetExtension = 'js';

TypeScriptFilter.prototype.processString = function (str, relativePath) {
    console.log('tsc compiling: ', relativePath);
    return tssCompiler.compile(str, relativePath);
};

module.exports = TypeScriptFilter;
