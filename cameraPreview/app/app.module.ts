import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/platform";
import { Camera } from './shared/camera/camera.component';

import { AppComponent } from "./app.component";

@NgModule({
    declarations: [AppComponent, Camera],
    bootstrap: [AppComponent],
    imports: [NativeScriptModule]
})
export class AppModule { }
