import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DatabaseEditDialogEntry} from "./data-base-edit-dialog-entry";
import {DataBaseService} from "../data-base.service";
import {DatabaseEntry, DatabaseEntryFieldName} from "../data-base.model";

@Component({
    selector: 'app-data-base-edit-dialog',
    templateUrl: './data-base-edit-dialog.component.html',
    styleUrls: ['./data-base-edit-dialog.component.css']
})
export class DataBaseEditDialogComponent implements OnInit {
    formGroup: FormGroup;

    constructor(private dialogRef: MatDialogRef<DataBaseEditDialogComponent>,
                private builder: FormBuilder,
                private readonly dataBaseService: DataBaseService,
                private readonly matSnackBar: MatSnackBar,
                @Inject(MAT_DIALOG_DATA) readonly editData: DatabaseEditDialogEntry) {
    }

    ngOnInit(): void {
        const controlsConfig = {
            tableName: [this.editData.data.tableName],
            attrib01: [this.editData.data.attrib01],
            attrib02: [this.editData.data.attrib02],
            attrib03: [this.editData.data.attrib03],
            attrib04: [this.editData.data.attrib04],
            attrib05: [this.editData.data.attrib05],
            attrib06: [this.editData.data.attrib06]
        };
        this.formGroup = this.builder.group(controlsConfig);
    }

    close() {
        this.dialogRef.close();
    }

    get<T extends AbstractControl>(fieldName: DatabaseEntryFieldName): T {
        return this.formGroup.controls[fieldName] as T;
    }

    async save() {
        let updatedDict: DatabaseEntry;
        try {
            updatedDict = await this.dataBaseService.updateDataBaseElement(this.formGroup.getRawValue());
        } catch (e) {
            console.error('Error while updating editData', e);
            this.matSnackBar.open('BLĄD');
            return;
        }
        this.matSnackBar.open('SUKCES');
        this.dataBaseService.tableName = this.formGroup.get('tableName').value;
        this.dialogRef.close(updatedDict);
    }
}
