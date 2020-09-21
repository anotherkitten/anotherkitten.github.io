import { timer } from 'rxjs';

import { ButtonService } from 'src/services/button.service';

export class CoinButton {
  id: number;
  level: number;
  rechargeTime: number;
  disabled: boolean;
  buttonService: ButtonService;

  constructor(buttonService: ButtonService) {
    this.buttonService = buttonService;
    this.id = buttonService.buttons.length + 1;
    this.level = 1;
    this.rechargeTime = 2000;
    this.disabled = false;
  }

  trigger() {
    this.disabled = true;
    timer(this.rechargeTime).subscribe(() => {this.disabled = false});
  }

  upgrade() {
    this.level += 1;
  }

  getValue(addLevel?: number): number {
    const level = this.level + (addLevel ? addLevel : 0);
    return level * (level + 1) / 2;
  }

  getColor(): string {
    return `hsl(${60 - Math.min(this.level, 30) * 10},70%,60%)`
  }

  getShadowColor(): string {
    return `hsl(${60 - Math.min(this.level, 30) * 10},35%,40%)`
  }

  getUpgradeCost() {
    const costScalingInterval = this.buttonService.buttonUpgradeCostScalingInterval;
    let costScale = 0;

    for (let i = 1; i <= this.level; i++) {
      costScale += Math.ceil(i / costScalingInterval);
    }

    return ((9 + costScale) * this.getValue());
  }
}
