"use strict";
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var router_extensions_1 = require("nativescript-angular/router/router-extensions");
var platformModule = require("platform");
var camera_component_1 = require("./shared/camera/camera.component");
var AppComponent = (function () {
    function AppComponent(page, routerExtensions) {
        this.page = page;
        this.routerExtensions = routerExtensions;
        this.init = false;
        this.height = platformModule.screen.mainScreen.heightDIPs;
    }
    return AppComponent;
}());
__decorate([
    core_1.ViewChild(camera_component_1.Camera),
    __metadata("design:type", camera_component_1.Camera)
], AppComponent.prototype, "Camera", void 0);
AppComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        templateUrl: "app.component.html",
    }),
    __metadata("design:paramtypes", [page_1.Page, router_extensions_1.RouterExtensions])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map