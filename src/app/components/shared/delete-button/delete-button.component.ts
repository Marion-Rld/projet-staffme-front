import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent {
  @Input() itemType: string = 'élément';
  @Output() confirmDelete: EventEmitter<void> = new EventEmitter<void>();

  constructor(private dialog: MatDialog) {}

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialog, {
      width: '250px',
      data: { itemType: this.itemType }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.confirmDelete.emit();
      }
    });
  }
}

@Component({
  selector: 'delete-confirmation-dialog',
  template: `
    <h1 mat-dialog-title>Confirmer la suppression</h1>
    <div mat-dialog-content>
      <p>Êtes-vous sûr de vouloir supprimer cet {{data.itemType}} ?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Annuler</button>
      <button mat-button (click)="onConfirm()" cdkFocusInitial>Confirmer</button>
    </div>
  `,
})
export class DeleteConfirmationDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { itemType: string },
    private dialogRef: MatDialogRef<DeleteConfirmationDialog>
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}