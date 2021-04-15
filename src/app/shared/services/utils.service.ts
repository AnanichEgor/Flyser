import {Injectable} from '@angular/core';
import {Toaster} from 'ngx-toast-notifications';
import {TranslateService} from '@ngx-translate/core';
import {first} from 'rxjs/operators';

export enum TypeNotification {
  primary = 'primary',
  secondary = 'secondary',
  success = 'success',
  danger = 'danger',
  warning = 'warning',
  info = 'info',
  light = 'light',
  dark = 'dark',
}

export enum PositionNotification {
  topLeft = 'top-left',
  topCenter = 'top-center',
  topRight = 'top-right',
  bottomLeft = 'bottom-left',
  bottomCenter = 'bottom-center',
  bottomRight = 'bottom-right'
}

@Injectable({
  providedIn: 'root'
})

export class UtilsService {

  constructor(
    private toaster: Toaster,
    private translateService: TranslateService,
  ) {
  }


  public translateNotification(key: string, type: TypeNotification = TypeNotification.success,
                               position: PositionNotification = PositionNotification.bottomCenter): void {
    this.translateService.get('registration.successCreate')
      .pipe(first())
      .subscribe((value) =>
        this.showNotification(value, type, position)
      );
  }

  public showNotification(message: string,
                          type: TypeNotification = TypeNotification.success,
                          position: PositionNotification = PositionNotification.bottomCenter): void {
    this.toaster.open({
      text: message,
      duration: 6000,
      type,
      position
    });
  }
}
