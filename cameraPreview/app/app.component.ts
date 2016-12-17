import { Component, OnInit, ViewChild } from "@angular/core";
import { Placeholder } from "ui/placeholder";
import { Page } from "ui/page";
import {RouterExtensions} from 'nativescript-angular/router/router-extensions'
import platformModule = require("platform");
import application = require("application");
import { Camera } from './shared/camera/camera.component';
declare var android;

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
    public init: boolean = false;
    public height: any;


    @ViewChild(Camera) public Camera: Camera;
    constructor(private page: Page, private routerExtensions: RouterExtensions) {        
        this.height = platformModule.screen.mainScreen.heightDIPs;
    }
    
    
}
