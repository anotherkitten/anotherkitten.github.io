import { Component, OnInit } from '@angular/core';

import { Upgrade } from 'src/models/upgrade';
import { UpgradeService } from 'src/services/upgrade.service';

@Component({
  selector: 'app-upgrades',
  templateUrl: './upgrades.component.html',
  styleUrls: ['./upgrades.component.scss']
})
export class UpgradesComponent implements OnInit {

  canBuy = this.upgradeService.canBuy;

  buttonUpgrades1 = this.upgradeService.getUpgrades([1, 2, 3, 4]);

  constructor(private upgradeService: UpgradeService) { }

  ngOnInit(): void {
  }

  buyUpgrade(id: number) {
    this.upgradeService.buyUpgrade(id);
  }

}
