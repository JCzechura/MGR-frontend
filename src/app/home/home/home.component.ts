import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/authorization/auth.service";
import {Role} from "../../core/authorization/authorization.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    navLinks: any;
    isLoggedAsAdmin: boolean;
    isLoggedAsDriver: boolean;

  constructor(
      private authService: AuthService) {
      this.isLoggedAsAdmin = authService.getRole() === Role.ADMIN;
      this.isLoggedAsDriver = authService.getRole() === Role.DRIVER;
      this.navLinks = [
          {
              label: 'KONTO',
              link: './user',
              show: true,
              index: 0
          }, {
              label: 'WYSZUKAJ TRASĘ',
              link: './routes',
              show: true,
              index: 1
          }, {
              label: 'AKTUALNA TRASA',
              link: './current_route',
              show: this.isLoggedAsDriver,
              index: 2
          }, {
              label: 'EDYTUJ BAZĘ DANYCH',
              link: './database',
              show: this.isLoggedAsAdmin,
              index: 3
          },
          {
              label: 'ZAPLANUJ TRASY',
              link: './plans',
              show: this.isLoggedAsAdmin,
              index: 4
          },
      ];
  }

  ngOnInit() {
  }

}
