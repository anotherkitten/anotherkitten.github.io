import { Injectable, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { Save, Saveable } from 'src/models/save';

@Injectable()
export class CoinService implements OnDestroy, Saveable {
  mainloop: Subscription;
  coin = 5;
  baseIncome = 0;

  constructor() {
    this.mainloop = interval(1e3).subscribe(this.loopFunc);
  }

  ngOnDestroy() {
    this.mainloop.unsubscribe();
  }

  save(): Save {
    const data = {
      coin: this.coin
    };

    return data;
  }

  load(data: Save) {
    this.coin = data.coin;
  }

  addCoins(coins: number) {
    this.coin += coins;
  }

  canAfford(cost: number) {
    return (this.coin >= cost);
  }

  removeCoins(coins: number) {
    this.coin -= coins;
  }

  calcIncome = (): number => {
    return this.baseIncome;
  }

  loopFunc = (iter: number) => {
    this.coin += this.calcIncome();
  }

}
