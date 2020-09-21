import { AfterContentChecked, Component, OnInit } from '@angular/core';

import { CoinService } from 'src/services/coin.service';
import { SaveService } from 'src/services/save.service';
import { formatNum } from 'src/common/globalfuncs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit, AfterContentChecked  {
  menuopen = false;
  lastSaved: string;
  lastExported: string;
  coin: string;

  constructor(private coinService: CoinService,
              private saveService: SaveService) {
  }

  ngOnInit() {
    this.saveService.loadSave();
    this.updateNav();
  }

  ngAfterContentChecked() {
    this.updateNav();
  }

  updateNav() {
    this.getLastSaved();
    this.getLastExported();
    this.getCoin();
  }

  getLastSaved() {
    this.lastSaved = this.saveService.getLastSaved();
  }

  getLastExported() {
    this.lastExported = this.saveService.getLastExported();
  }

  getCoin() {
    this.coin = formatNum(this.coinService.coin);
  }

  toggleMenu() {
    this.menuopen = !this.menuopen;
  }

  clickSave() {
    this.saveService.browserSave();
  }
}
