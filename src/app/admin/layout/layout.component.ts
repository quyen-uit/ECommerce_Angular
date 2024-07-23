import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class AdminLayoutComponent {
  title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = true;

  menuItems = [
    { name: 'Category', icon: 'category', route: 'category' },
    { name: 'Product', icon: 'backpack', route: 'product' },
    { name: 'Product Brand', icon: 'business', route: 'product-brand' },
    { name: 'Color', icon: 'palette', route: 'color' },
  ]
  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.breakpointObserver.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }
  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false; // On mobile, the menu can never be collapsed
    } else {
      this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
    }
  }
}
