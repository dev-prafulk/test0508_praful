import { Injectable } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _open = new BehaviorSubject<boolean>(false);
  public isOpen$ = this._open.asObservable();

  constructor(private overlayRef: OverlayRef) {}

  open(content: any): Promise<void> {
    return new Promise((resolve) => {
      this.overlayRef.attach(content);
      this._open.next(true);
      resolve();
    });
  }

  close(): Promise<void> {
    return new Promise((resolve) => {
      this.overlayRef.detach();
      this._open.next(false);
      resolve();
    });
  }
}
