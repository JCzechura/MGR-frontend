import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { CustomerService } from '../customer.service';
import { UserData } from '../userData';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userData : UserData;
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router,
    private customerService: CustomerService) {
    this.createForm();
   }

  ngOnInit() {
  }
  createForm() {
    this.form = this.fb.group({
      username:  ['', Validators.required ],
      password: ['', Validators.required ]
    });
  }
  submit() {
    if (this.form.valid) {
      this.userData= {
        login: this.form.controls["username"].value,
        password: this.form.controls["password"].value
      }
      console.log(this.userData);
      this.authService.getToken(this.userData).subscribe(result => {
        const helper = new JwtHelperService();
        if (result["token"]){ 
          this.customerService.clear();
          this.customerService.setToken(result["token"]);
          const decodedToken = helper.decodeToken(result["token"]);

          if (decodedToken["enable"] == "dispatcher" || decodedToken["enable"] == "driver&dispatcher") {
            this.customerService.setEnableAsDispatcher(decodedToken["enable"]);
            console.log("dispatcher");
            this.router.navigateByUrl("dispatcher");
          }
          if (decodedToken["enable"] == "driver") {
            this.customerService.setEnableAsDriver(decodedToken["enable"]);
            console.log("driver");
            this.router.navigateByUrl("driver");
          }
          console.log(decodedToken);
        }
    });
  }
}
noUserError() {
  return this.authService.getUserIncorrect();
  }
}