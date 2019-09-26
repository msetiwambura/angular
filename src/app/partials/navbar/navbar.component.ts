import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import {AuthserviceService} from "../../shared/authservice.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {
  id: string;
  public sidebarOpened = false;
  toggleOffcanvas() {
    this.sidebarOpened = !this.sidebarOpened;
    if (this.sidebarOpened) {
      document.querySelector('.sidebar-offcanvas').classList.add('active');
    }
    else {
      document.querySelector('.sidebar-offcanvas').classList.remove('active');
    }
  }

  public iconOnlyToggled = false;
  toggleIconOnlySidebar() {
    this.iconOnlyToggled = !this.iconOnlyToggled;
    if (this.iconOnlyToggled) {
      document.querySelector('body').classList.add('sidebar-icon-only');
    }
    else {
      document.querySelector('body').classList.remove('sidebar-icon-only');
    }
  }

  constructor(config: NgbDropdownConfig, private authService: AuthserviceService, private router: Router) {
    config.placement = 'bottom-right';
  }
  ngOnInit() {
    this.id = localStorage.getItem('token');
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
