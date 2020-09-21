import { Injectable } from '@angular/core';

import { CoinService } from 'src/services/coin.service';
import { CoinButton } from 'src/models/coinbutton';
import { Save, Saveable } from 'src/models/save';

@Injectable()
export class ButtonService implements Saveable {
  buttons = [];
  buttonMult = 1;

  buttonUpgradeCostScalingInterval = 5;

  constructor(private coinService: CoinService) {
    this.addButton();
    this.addButton();
  }

  save(): Save {
    const data = {
      buttons: this.buttons
    };

    return data;
  }

  load(data: Save) {
    this.buttons = data.buttons;
  }

  addButton() {
    this.buttons.push(new CoinButton(this));
  }

  getButton(id: number) {
    return this.buttons.find(btn => btn.id === id);
  }

  pressButton(id: number) {
    this.coinService.addCoins(this.getButton(id).getValue() * this.buttonMult);
    this.getButton(id).trigger();
  }

  upgradeButton(id: number) {
    const cost = this.getButton(id).getUpgradeCost();
    if (this.coinService.canAfford(cost)) {
      this.coinService.removeCoins(cost);
      this.getButton(id).upgrade();
    }
  }
}
