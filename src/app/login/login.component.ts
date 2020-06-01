import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthService} from '../auth.service';
import {UserData} from '../login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() error: string | null;
  @Output() submitEM = new EventEmitter();

  form: FormGroup;
  userData: UserData;
  accessDenied = false;

  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router) {
   }


  ngOnInit() {
    this.form = this.fb.group({
      username:  ['', Validators.required ],
      password: ['', Validators.required ]
    });
  }

  async submit() {

    if (!this.form.valid) {
      return;
    }

    this.userData = this.form.value;

    try {
      const authData = await this.authService.signIn(this.userData);
      this.authService.storeUserAuthData(authData.token);
      await this.router.navigateByUrl('/dispatcher');
    } catch (error) {
      console.error('Error occurred during signing in', error);
      this.accessDenied = true;
    }
  }
}