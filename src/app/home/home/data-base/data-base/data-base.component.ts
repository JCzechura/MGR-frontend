import { Component, OnInit } from '@angular/core';
import {DataBaseService} from "../data-base.service";

@Component({
  selector: 'app-data-base',
  templateUrl: './data-base.component.html',
  styleUrls: ['./data-base.component.css']
})
export class DataBaseComponent implements OnInit {

  constructor(private dataBaseService: DataBaseService) { }

  ngOnInit() {
  }

}
