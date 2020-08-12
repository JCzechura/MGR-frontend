import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-plans-confirm-dialog',
  templateUrl: './plans-confirm-dialog.component.html',
  styleUrls: ['./plans-confirm-dialog.component.css']
})
export class PlansConfirmDialogComponent {

  constructor(private dialogRef: MatDialogRef<PlansConfirmDialogComponent>) {
  }

  close() {
    this.dialogRef.close(false);
  }

  load() {
    this.dialogRef.close(true);
  }
}
