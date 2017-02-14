import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/platform";
import { Camera } from './shared/camera/camera.component';
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { AppComponent } from "./app.component";

@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
    declarations: [AppComponent, Camera],
    bootstrap: [AppComponent],
    imports: [
        NativeScriptModule,
    ]
})
export class AppModule { }
