import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { MainModule } from "View/Main/Module";
import { enableProdMode } from "@angular/core";

// when Office has initalized, manually bootstrap the app
(() => {
  enableProdMode();
  platformBrowserDynamic().bootstrapModule(MainModule);
})();
