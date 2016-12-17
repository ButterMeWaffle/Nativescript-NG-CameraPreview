"use strict";
var core_1 = require("@angular/core");
var platform_1 = require("nativescript-angular/platform");
var camera_component_1 = require("./shared/camera/camera.component");
var app_component_1 = require("./app.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [app_component_1.AppComponent, camera_component_1.Camera],
        bootstrap: [app_component_1.AppComponent],
        imports: [platform_1.NativeScriptModule],
        schemas: [core_1.NO_ERRORS_SCHEMA]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map