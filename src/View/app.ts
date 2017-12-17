import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { MainModule } from "View/Main/Module";

// when Office has initalized, manually bootstrap the app
(() => {
    platformBrowserDynamic().bootstrapModule(MainModule);
})();
