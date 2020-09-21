import { Injectable, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { ButtonService } from 'src/services/button.service';
import { CoinService } from 'src/services/coin.service';
import { FarmService } from 'src/services/farm.service';
import { PageService } from 'src/services/page.service';

import { Save, Saveable, SaveFile } from 'src/models/save';

import { formatTime } from 'src/common/globalfuncs';

@Injectable()
export class SaveService implements OnDestroy {
  lastSaved = +new Date();
  lastExported = 0;
  $autosave: Subscription;

  saveServices: {[key: string]: Saveable} = {
    buttons: this.buttonService,
    coins: this.coinService,
    farm: this.farmService,
    page: this.pageService
  };

  constructor(private buttonService: ButtonService,
              private coinService: CoinService,
              private farmService: FarmService,
              private pageService: PageService) {
    this.$autosave = interval(30e3).subscribe(() => this.browserSave());
  }

  ngOnDestroy() {
    this.$autosave.unsubscribe();
  }

  getLastSaved() {
    return `${formatTime(+new Date() - this.lastSaved)} ago`;
  }

  getLastExported() {
    if (!this.lastExported) { return 'Never' }
    return `${formatTime(+new Date() - this.lastSaved)} ago`;
  }

  generateSave(): SaveFile {
    const saveFile: SaveFile = {};

    for (let key in this.saveServices) {
      saveFile[key] = this.saveServices[key].save();
    }

    return saveFile;
  }

  loadSave() {

  }

  browserSave = () => {
    this.lastSaved = +new Date();
  }

  exportSave() {

  }

  importSave() {

  }
}
