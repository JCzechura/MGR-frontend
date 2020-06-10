import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserDetails, UserPasswordData} from "../user-details.model";
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {BackendService} from "../../../../core/backend/backend.service";
import {urlList} from "../../../../../environments/url-list";
import {UserInfoService} from "../user-info.service";

const newPasswordValid: ValidatorFn = control => {
    if (control instanceof FormGroup) {
        const {newPassword, newPasswordRepeated} = control.controls;
        console.log(newPassword.value, newPasswordRepeated.value);
        if (newPasswordRepeated.value !== '' && (newPassword.value !== newPasswordRepeated.value)) {
          console.log('invalid');
            return {
                newPasswordIncorrectlyRepeated: true
            };
        }
      console.log('valid');
    }
    return null;
};

@Component({
    selector: 'app-password-change-dialog',
    templateUrl: './password-change-dialog.component.html',
    styleUrls: ['./password-change-dialog.component.css']
})
export class PasswordChangeDialogComponent {
    id: number;
    title = 'ZMIANA HASŁA';
    passwordFormGroup: FormGroup;

    constructor(public dialogRef: MatDialogRef<PasswordChangeDialogComponent>,
                private fb: FormBuilder,
                @Inject(MAT_DIALOG_DATA) public data: UserPasswordData,
                private userInfoService: UserInfoService) {
        this.id = data.id;
        this.passwordFormGroup = this.fb.group(
            {
                id: [data.id, Validators.required],
                oldPassword: ['', Validators.required],
                newPassword: ['', Validators.required],
                newPasswordRepeated: ['', Validators.required]
            },
            {
                validators: newPasswordValid
            });
    }

    onConfirm(): void {
        console.log(this.passwordFormGroup.value);
        this.userInfoService.updatePassword(this.passwordFormGroup.value);
        this.dialogRef.close(true);
    }

    onDismiss(): void {
        this.dialogRef.close(false);
    }

}


