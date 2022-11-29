import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take, tap } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private matDialog: MatDialog) {}
  confirmDialog(message: string, confirmCallback: Function) {
    const dialog = this.matDialog.open(ConfirmDialogComponent, {
      data: message,
    });
    return dialog.afterClosed().pipe(
      take(1),
      tap((isConfirm) => {
        isConfirm ? confirmCallback() : null;
      })
    );
  }
}
