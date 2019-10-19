import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-as-dispatcher',
  templateUrl: './user-as-dispatcher.component.html',
  styleUrls: ['./user-as-dispatcher.component.css']
})
export class UserAsDispatcherComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(localStorage);
  }

}
