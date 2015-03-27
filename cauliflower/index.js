var broccoli = require('broccoli');
var Watcher = require('broccoli-sane-watcher');

var tree = broccoli.loadBrocfile();
var builder = new broccoli.Builder(tree);

var options = {
    watcher: null,
    port: 4200,
    host: 'localhost',
    verbose: true
};

var watcher = new Watcher(builder, options);
options.watcher = watcher;

broccoli.server.serve(builder, options);
