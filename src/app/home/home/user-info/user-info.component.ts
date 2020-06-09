import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BackendService} from "../../../services/backend.service";
import {urlList} from "../../../../environments/url-list";
import {UserDetails} from "../../../models/user-details.model";
import {MatDialog} from "@angular/material/dialog";
import {PasswordChangeDialogComponent} from "./password-change-dialog/password-change-dialog.component";
import {switchMap, takeUntil, tap} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, OnDestroy {
    form: FormGroup;
    private ngDestroy$ = new Subject();

    constructor(private userService: UserService,
                private fb: FormBuilder,
                public dialog: MatDialog,
                private backendService: BackendService) {
    }

    ngOnInit() {
      this.form = this.fb.group({
          id: [null, Validators.required],
          login: ['', Validators.required],
          role: ['', Validators.required],
          description: ['', Validators.required],
          password: [null]
      });
        this.getCurrentUser()
            .pipe(takeUntil(this.ngDestroy$.asObservable()))
            .subscribe();
    }

    saveUserDetails() {
        this.backendService.post<UserDetails>(urlList.updateUserPOST, this.form.value)
            .pipe(
                takeUntil(this.ngDestroy$.asObservable())
            ).subscribe(value => {
                console.log(value);
                this.form.patchValue(value);
            }
        );
    }

    changePassword() {
        const dialogRef = this.dialog.open(PasswordChangeDialogComponent, {
            data: this.form.value
        });

        dialogRef.afterClosed().pipe(
            takeUntil(this.ngDestroy$.asObservable()),
            switchMap(() => this.getCurrentUser()))
            .subscribe();
    }

    getCurrentUser() {
        return this.userService.getCurrentUser()
            .pipe(
                takeUntil(this.ngDestroy$.asObservable()),
                tap(value => {
                        console.log(value);
                        this.form.patchValue(value);
                    }
                )
            )
    }

    ngOnDestroy(): void {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
}
