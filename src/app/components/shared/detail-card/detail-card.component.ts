import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { EditButtonComponent } from '../../shared/edit-button/edit-button.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, EditButtonComponent, MatDialogModule],
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.scss'],
})
export class DetailCardComponent {
  @Input() name?: string;
  @Input() firstName?: string;
  @Input() lastName?: string;
  @Input() email?: string;
  @Input() phoneNumber?: string;
  @Input() job?: string;
  @Input() startDate?: Date;
  @Input() endDate?: Date;
  @Input() postalAddress?: string;
  @Input() editComponent?: any;
  @Input() collaboratorsCount?: string;
  @Input() description?: string;
  @Input() data!: any;

  constructor(public dialog: MatDialog) {}

  openEditDialog(): void {
    const dialogRef = this.dialog.open(this.editComponent, {
      width: '800px',
      panelClass: 'custom-modal',
      data: { entity: this.data },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Entity updated:', result);
      }
    });
  }
}
