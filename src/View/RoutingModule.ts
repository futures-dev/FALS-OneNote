import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MainComponent } from "View/Main/Component";
import { SocketComponent } from "View/Socket/Component";

const routes: Routes = [
    { path:"socket", component: SocketComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule {}

export const routedComponents = [MainComponent];
