import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig} from "@angular/material/snack-bar";
import {Provider} from "@angular/core";

export const MGR_SNACK_BAR_DEFAULT_OPTIONS: MatSnackBarConfig = {
    duration: 5_000,
    verticalPosition: 'bottom',
    horizontalPosition: 'center',
};

export const MAT_SNACK_BAR_DEFAULT_OPTIONS_PROVIDER: Provider = {
    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
    useValue: MGR_SNACK_BAR_DEFAULT_OPTIONS
};