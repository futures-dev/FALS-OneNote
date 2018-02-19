/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
  // map tells the System loader where to look for things
  var map = {
    "socket.io-client": "socket.io-client/dist",
    app: "/",
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    app: {
      main: "/View/app.js",
      map: {
        app: "/View",
        View: "/View",
        Service: "/Service",
      },
    },
    rxjs: { main: "rx.js" },
    "@angular/common/http": {
      main: "../bundles/common-http.umd.js",
      map: {
        tslib: "tslib/tslib.js",
      },
    },
    "angular2-in-memory-web-api": { main: "index.js" },
    "socket.io-client": { main: "socket.io.js" },
  };
  var ngPackageNames = [
    "common",
    "compiler",
    "core",
    "forms",
    "http",
    "platform-browser",
    "platform-browser-dynamic",
    "router",
  ];
  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages["@angular/" + pkgName] = { main: "index.js" };
  }
  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages["@angular/" + pkgName] = {
      main: "/bundles/" + pkgName + ".umd.js",
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
      "npm:": "node_modules/",
    },
    packages: packages,
  };
  System.config(config);
})(this);
