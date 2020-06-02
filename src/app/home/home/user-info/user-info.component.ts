import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  form: any;

    constructor(private userService: UserService,
                private fb: FormBuilder) {
        this.userService.getCurrentUser().subscribe(value => console.log(value));
    }

    ngOnInit() {
      this.form = this.fb.group({
        username:  ['', Validators.required ],
        role: ['', Validators.required ],
        description: ['', Validators.required ]
      });
    }

  submit() {

  }
}
