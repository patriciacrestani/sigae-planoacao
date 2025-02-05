import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutService } from './service/layout.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
        <div class="layout-wrapper layout-static-inactive">
            <div class="layout-main-container">
                <div class="layout-main">
                    <router-outlet></router-outlet>
                </div>
            </div>
            <div class="layout-mask animate-fadein"></div>
        </div>
    `
})
export class AppComponent {
    constructor(public layoutService: LayoutService) { }

    
  get containerClass() {
    return {
        'layout-overlay': this.layoutService.layoutConfig().menuMode === 'overlay',
        'layout-static': this.layoutService.layoutConfig().menuMode === 'static',
        'layout-static-inactive': this.layoutService.layoutState().staticMenuDesktopInactive && this.layoutService.layoutConfig().menuMode === 'static',
        'layout-overlay-active': this.layoutService.layoutState().overlayMenuActive,
        'layout-mobile-active': this.layoutService.layoutState().staticMenuMobileActive
    };
}
}
