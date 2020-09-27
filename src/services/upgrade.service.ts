import { Injectable } from '@angular/core';

import { Upgrade, UPGRADES } from 'src/models/upgrade';
import { Save, Saveable } from 'src/models/save';
import { CoinService } from 'src/services/coin.service';

@Injectable({
  providedIn: 'root'
})
export class UpgradeService implements Saveable {

  upgrades = UPGRADES;

  constructor(private coinService: CoinService) { }

  save(): Save {
    const data = {
      upgrades: this.upgrades.map(upg => { return { id: upg.id, level: upg.level || 0 }})
    }

    return data;
  }

  load(data: Save) {
    data.upgrades.forEach((upg: Upgrade) => this.getUpgrade(upg.id).loadLevel(upg.level));
  }

  getUpgrade = (id: number): Upgrade => {
    return this.upgrades.find(upg => upg.id === id);
  }

  getUpgrades = (ids: number[]): Upgrade[] => {
    return ids.map(this.getUpgrade);
  }

  canBuy = (upg: Upgrade): boolean => {
    return this.coinService.canAfford(upg.getCost()) && upg.canBuy();
  }

  buyUpgrade(id: number) {
    const upg = this.getUpgrade(id);

    if (this.canBuy(upg)) {
      this.coinService.removeCoins(upg.getCost());
      upg.upgradeLevel();
    }
  }
}
