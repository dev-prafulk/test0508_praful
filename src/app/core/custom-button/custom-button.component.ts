import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss']
})
export class CustomButtonComponent {
  @Input() icon: string = ''; // Default icon
  @Input() text: string = ''; // Optional text
  @Output() buttonClick = new EventEmitter<void>(); // Event emitter for button click

  constructor() {}

  handleClick(): void {
    this.buttonClick.emit();
  }
}
