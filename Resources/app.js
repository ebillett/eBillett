
//
// Bootstrapper
//

// Patch commonJS module
require('plugins/require_patch').monkeypatch(this);

// Setup debugging environment
var DEBUG = true; // set to false for production
Ti.include('plugins/debug.js');

// Global app namespace
var app = require('ui/core');


app.launch();