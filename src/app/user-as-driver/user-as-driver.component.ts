import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-as-driver',
  templateUrl: './user-as-driver.component.html',
  styleUrls: ['./user-as-driver.component.css']
})
export class UserAsDriverComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(localStorage);
  }

}
