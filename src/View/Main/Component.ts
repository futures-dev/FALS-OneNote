import { Component, OnInit, Input } from "@angular/core";
import { InitializationPublisher } from "Service/Office/InitializationPublisher";

@Component({
    selector: "main",
    templateUrl: "View/Main/Main.html",
    providers: [InitializationPublisher]
})
export class MainComponent implements OnInit {
    title: string = "AppComponent Title";

    constructor(
        private _initializationPublisher : InitializationPublisher,
    ) {
        console.log("AppComponent ctor");

        _initializationPublisher.subscribe(this.onOfficeInitialized);

        Office.initialize = function() {
            console.log("Office initialized");

            _initializationPublisher.publish();
        };
    }

    onOfficeInitialized() : void {        
        OneNote.run(async context => {
            const nb = context.application.getActiveNotebook();
            nb.load();

            await context.sync().then(async context => {
                console.log(`${nb.id}`);
            });
        });
    }

    ngOnInit(): void {        
        console.log("AppComponent OnInit");
    }
}
