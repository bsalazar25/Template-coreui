import {Component } from '@angular/core';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }


  constructor(private router: Router, private auth: AuthService) { }

  OnlogOut() {

    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
