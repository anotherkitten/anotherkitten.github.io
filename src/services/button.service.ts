import { Injectable } from '@angular/core';

import { CoinService } from 'src/services/coin.service';
import { UpgradeService } from 'src/services/upgrade.service';
import { CoinButton } from 'src/models/coinbutton';
import { Save, Saveable } from 'src/models/save';

@Injectable()
export class ButtonService implements Saveable {
  buttons = [];
  buttonMult = 1;
  buttonPopUpChance = 0;

  buttonUpgradeCostScalingInterval = 5;

  constructor(private coinService: CoinService,
              private upgradeService: UpgradeService) {
    this.addButton();
    this.addButton();
    this.subscribeToUpgrades();
  }

  save(): Save {
    const data = {
      buttons: this.buttons.map((btn: CoinButton) => { return {id: btn.id, level: btn.level} })
    };

    return data;
  }

  load(data: Save) {
    this.buttons = data.buttons.map((btn: CoinButton) => Object.assign(new CoinButton(this), {id: btn.id, level: btn.level}));
  }

  addButton() {
    this.buttons.push(new CoinButton(this));
  }

  getButton(id: number) {
    return this.buttons.find(btn => btn.id === id);
  }

  getButtonVal(button: CoinButton, extraLevels?: number) {
    return (button.getValue(extraLevels || 0) * this.buttonMult);
  }

  pressButton(id: number) {
    const btn = this.getButton(id);
    this.coinService.addCoins(this.getButtonVal(btn));
    btn.trigger();
  }

  upgradeButton(id: number) {
    const cost = this.getButton(id).getUpgradeCost();
    if (this.coinService.canAfford(cost)) {
      this.coinService.removeCoins(cost);
      this.getButton(id).upgrade();
    }
  }

  subscribeToUpgrades() {
    const getUpg = (id: number) => this.upgradeService.getUpgrade(id);
    getUpg(1).$onLoadAndPurchase.subscribe(() => this.buttonMult *= 2);
    getUpg(2).$onLoadAndPurchase.subscribe(() => this.buttonPopUpChance += 5);
    getUpg(3).$onLoadAndPurchase.subscribe(() => this.buttonUpgradeCostScalingInterval += 3);
    getUpg(4).$onPurchase.subscribe(() => this.addButton());
  }
}
