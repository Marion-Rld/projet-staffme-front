import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-button',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './edit-button.component.html',
  styleUrl: './edit-button.component.scss',
})
export class EditButtonComponent {
  @Input() icon: string = 'edit';
  @Input() text: string = '';
  @Output() clickEvent = new EventEmitter<void>();

  onClick() {
    this.clickEvent.emit();
  }
}
