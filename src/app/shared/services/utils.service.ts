import {Injectable} from '@angular/core';
import {Toaster} from 'ngx-toast-notifications';
import {TranslateService} from '@ngx-translate/core';
import {first} from 'rxjs/operators';
import moment from 'moment';

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

const declension = ['год', 'года', 'лет'];

@Injectable({
  providedIn: 'root'
})

export class UtilsService {

  constructor(
    private toaster: Toaster,
    private translateService: TranslateService,
  ) {
  }

  private plural(num: number, titles = declension): string {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[(num % 100 > 4 && num % 100 < 20) ? 2 : cases[(num % 10 < 5) ? num % 10 : 5]];
  }

  public translateNotification(key: string, type: TypeNotification = TypeNotification.success,
                               position: PositionNotification = PositionNotification.bottomCenter): void {
    this.translateService.get(key)
      .pipe(first())
      .subscribe((value) =>
        this.showNotification(value, type, position)
      );
  }

  public serverError(error: any): void {
    this.translateNotification('registration.getServerError', TypeNotification.danger);
    console.log('Error from server: ', error);
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

  getDiffAgeNow(birthDay: Date): string {
    const starts = moment(birthDay);
    const ends = moment();
    const result = ends.diff(starts, 'years');

    return `${result} ${this.plural(result)}`;
  }
}
