
//
// Bootstrapper
//

// Patch commonJS module
require('plugins/require_patch').monkeypatch(this);

// Setup debugging environment
var DEBUG = true; // set to false for production
Ti.include('plugins/debug.js');

// Underscore lib
var _ = require('plugins/underscore-min')._;

// Global app namespace
var app = require('ui/bootstrap');

app.db.bootstrap();

app.launch();
