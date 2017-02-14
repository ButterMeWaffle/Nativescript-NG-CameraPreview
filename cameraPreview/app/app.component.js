var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var platformModule = require("platform");
var camera_component_1 = require("./shared/camera/camera.component");
var AppComponent = (function () {
    function AppComponent(page) {
        this.page = page;
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
    __metadata("design:paramtypes", [page_1.Page])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsc0NBQTZEO0FBRTdELGdDQUErQjtBQUMvQix5Q0FBNEM7QUFFNUMscUVBQTBEO0FBTzFELElBQWEsWUFBWTtJQU1yQixzQkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFMdkIsU0FBSSxHQUFZLEtBQUssQ0FBQztRQU16QixJQUFJLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQztJQUM5RCxDQUFDO0lBR0wsbUJBQUM7QUFBRCxDQUFDLEFBWEQsSUFXQztBQU5zQjtJQUFsQixnQkFBUyxDQUFDLHlCQUFNLENBQUM7OEJBQWdCLHlCQUFNOzRDQUFDO0FBTGhDLFlBQVk7SUFKeEIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFdBQVcsRUFBRSxvQkFBb0I7S0FDcEMsQ0FBQztxQ0FPNEIsV0FBSTtHQU5yQixZQUFZLENBV3hCO0FBWFksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUGxhY2Vob2xkZXIgfSBmcm9tIFwidWkvcGxhY2Vob2xkZXJcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCBwbGF0Zm9ybU1vZHVsZSA9IHJlcXVpcmUoXCJwbGF0Zm9ybVwiKTtcclxuaW1wb3J0IGFwcGxpY2F0aW9uID0gcmVxdWlyZShcImFwcGxpY2F0aW9uXCIpO1xyXG5pbXBvcnQgeyBDYW1lcmEgfSBmcm9tICcuL3NoYXJlZC9jYW1lcmEvY2FtZXJhLmNvbXBvbmVudCc7XHJcbmRlY2xhcmUgdmFyIGFuZHJvaWQ7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm15LWFwcFwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiYXBwLmNvbXBvbmVudC5odG1sXCIsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xyXG4gICAgcHVibGljIGluaXQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBoZWlnaHQ6IGFueTtcclxuXHJcblxyXG4gICAgQFZpZXdDaGlsZChDYW1lcmEpIHB1YmxpYyBDYW1lcmE6IENhbWVyYTtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSkgeyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBwbGF0Zm9ybU1vZHVsZS5zY3JlZW4ubWFpblNjcmVlbi5oZWlnaHRESVBzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxufVxyXG4iXX0=