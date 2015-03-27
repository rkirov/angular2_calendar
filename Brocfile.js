var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var typescriptCompiler = require('./broccoli-typescript');
var stew = require('broccoli-stew');


var appScripts = new Funnel('app', {
    srcDir: '',
    include: ['**/*.js', '**/*.ts'],
    destDir: '/'
});
//appScripts = stew.log(appScripts, { output: 'tree', label: 'appScripts' })


var appAssets =  new Funnel('app', {
    include: ['index.html'],

    // TODO(i): temporarily rename index.html to index-debug.html so that directory listing is served at /
    getDestinationPath: function(relativePath) {
        if (relativePath === 'index.html') {
            relativePath = 'index-debug.html'
        }

        return relativePath;
    }
});
//appAssets = stew.log(appAssets, { output: 'tree', label: 'appAssets' })


var systemjs = new Funnel('node_modules/systemjs', {
    srcDir: '/dist/',
    destDir: '/vendor/systemjs'
});
//systemjs = stew.log(systemjs, { output: 'tree', label: 'systemjs' })


var es6SuffixRexexp = /(.+)\.es6/;
var angularES6 = new Funnel('node_modules/angular2', {
    srcDir: '/es6/prod/',
    include: ['**/*.es6'],
    destDir: '/vendor/angular',
    getDestinationPath: function(relativePath) {
        if (es6SuffixRexexp.test(relativePath)) {
            relativePath = relativePath.replace(es6SuffixRexexp, '$1.js');
        }

        return relativePath;
    }
});
//angularES6 = stew.log(angularES6, { output: 'tree', label: 'angularES6' })


var ts2jsFiles = typescriptCompiler(mergeTrees([appScripts, angularES6]));
//ts2jsFiles = stew.log(ts2jsFiles, { output: 'tree', label: 'ts2jsFiles' });



module.exports = mergeTrees([ts2jsFiles, appAssets, systemjs]);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/*
 var _COMPILER_CONFIG_JS_DEFAULT = {
 sourceMaps: true,
 annotations: true, // parse annotations
 types: true, // parse types
 script: false, // parse as a module
 memberVariables: true, // parse class fields
 modules: 'instantiate'
 };
 */

//var es5 = traceurTranspiler(mergeTrees([appScripts, angularES6]), {
//    //annotations: true,
//    //memberVariables: true,
//    typeAssertions: false,
//    types: true
//});


//var testsES6 = pickFiles('tests', {
//    srcDir: '/',
//    files: ['**/*.js'],
//    destDir: '/tests'
//});

//var scripts = esTranspiler(mergeTrees([srcES6, angular]), {
//    sourceMap: 'inline',
//    modules: 'amd',
//    moduleIds: true
//});
