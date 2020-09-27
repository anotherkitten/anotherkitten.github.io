import { Injectable } from '@angular/core';

import { Page } from 'src/models/page';
import { Save, Saveable } from 'src/models/save';
import { CoinService } from 'src/services/coin.service';

@Injectable()
export class PageService implements Saveable {
  pages: Page[] = [
    new Page(1, 5, "Button Machine",
             "A machine with buttons that make coins on press.\n\nNot very exciting but it's some starting coin!",
             "/buttons"),
    new Page(2, 250, "Farm",
             "A farm with land for crops to be planted and harvested.\n\nA great way to start building passive income!",
             "/farm"),
    new Page(3, 2500, "WIP Upgrade Store",
             "not yet implemented\n\nsorry!!",//"A shop that sells upgrades for your unlocked pages.\n\nThe backbone of all your future progression.",
             "/upgrades")
  ]

  constructor(private coinService: CoinService) {}

  save(): Save {
    const data = {
      pages: this.pages
    }

    return data;
  }

  load(data: Save) {
    data.pages.forEach((page: Page) => this.getPage(page.id).unlocked = page.unlocked);
  }

  getLockedPages() {
    return this.pages.filter(pg => !pg.unlocked);
  }

  getUnlockedPages() {
    return this.pages.filter(pg => pg.unlocked);
  }

  getPage(id: number) {
    return this.pages.find(pg => pg.id === id);
  }

  purchasePage(id: number) {
    if (this.coinService.canAfford(this.getPage(id).cost)) {
      this.coinService.removeCoins(this.getPage(id).cost);
      this.unlockPage(id);
    }
  }

  unlockPage(id: number) {
    this.getPage(id).unlocked = true;
  }
}
