import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {first} from 'rxjs/operators';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Flyser';

  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang(environment.defaultLocale);
  }

  // setLanguage(languageCode: string): void {
  //   // устанавливаем выбранный язык
  //   this.translateService.use(languageCode);
  //   // для примера переводим строку вне шаблона, используя
  //   // для этого TranslateService
  //   this.translateService.get('info.about').pipe(first()).subscribe((value) => console.log(value));
  // }

}
