/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  // map tells the System loader where to look for things
  var map = {
    "socket.io-client": "socket.io-client/dist",
    app: "/",
    config: "/cfg.js",

    '@angular/cdk': '@angular/cdk/bundles/cdk.umd.js',
    '@angular/cdk/a11y': '@angular/cdk/bundles/cdk-a11y.umd.js',
    '@angular/cdk/accordion': '@angular/cdk/bundles/cdk-accordion.umd.js',
    '@angular/cdk/bidi': '@angular/cdk/bundles/cdk-bidi.umd.js',
    '@angular/cdk/coercion': '@angular/cdk/bundles/cdk-coercion.umd.js',
    '@angular/cdk/collections': '@angular/cdk/bundles/cdk-collections.umd.js',
    '@angular/cdk/keycodes': '@angular/cdk/bundles/cdk-keycodes.umd.js',
    '@angular/cdk/layout': '@angular/cdk/bundles/cdk-layout.umd.js',
    '@angular/cdk/observers': '@angular/cdk/bundles/cdk-observers.umd.js',
    '@angular/cdk/overlay': '@angular/cdk/bundles/cdk-overlay.umd.js',
    '@angular/cdk/platform': '@angular/cdk/bundles/cdk-platform.umd.js',
    '@angular/cdk/portal': '@angular/cdk/bundles/cdk-portal.umd.js',
    '@angular/cdk/rxjs': '@angular/cdk/bundles/cdk-rxjs.umd.js',
    '@angular/cdk/table': '@angular/cdk/bundles/cdk-table.umd.js',
    '@angular/cdk/scrolling': '@angular/cdk/bundles/cdk-scrolling.umd.js',
    '@angular/cdk/stepper': '@angular/cdk/bundles/cdk-stepper.umd.js'
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    app: {
      main: "/View/app.js",
      map: {
        app: "/View",
        View: "/View",
        Service: "/Service"
      }
    },
    rxjs: { main: "rx.js" },
    "@angular/common/http": {
      main: "../bundles/common-http.umd.js",
      map: {
        tslib: "tslib/tslib.js"
      }
    },
    "angular2-in-memory-web-api": { main: "index.js" },
    "socket.io-client": { main: "socket.io.js" },
    "url-parse": { main: "index.js" },
    "requires-port": { main: "index.js" },
    querystringify: { main: "index.js" }
  };
  var ngPackageNames = [
    "animations",
    "material",
    "common",
    "compiler",
    "core",
    "forms",
    "http",
    "platform-browser",
    "platform-browser-dynamic",
    "router"
  ];
  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages["@angular/" + pkgName] = { main: "index.js" };
  }
  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages["@angular/" + pkgName] = {
      main: "/bundles/" + pkgName + ".umd.js"
    };
  }
  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);
  var config = {
    baseURL: "node_modules/",
    packageConfigPaths: ["npm:*/package.json", "npm:@angular/*/package.json"],
    map: map,
    paths: {
      "npm:": "node_modules/"
    },
    packages: packages
  };
  System.config(config);
})(this);
