import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-generic-button-wrapper',
  templateUrl: './generic-button-wrapper.component.html',
  styleUrls: ['./generic-button-wrapper.component.scss']
})
export class GenericButtonWrapperComponent {
  @Input() icon: string = ''; // Default icon
  @Input() styleClasses: string[] = []; // Renamed to reflect it's an array
  @Input() clickEvent: () => void = () => {}; // Provide a default noop function

  constructor() {}

  get styleClass(): string { // Getter to convert array to string
    return this.styleClasses.join(' ');
  }
}
