import { ReplaySubject } from 'rxjs';

export class Upgrade {
  id: number;
  name: string;
  effect: string;
  level: number;
  limit: number;
  baseCost: number;
  costFunc: ((baseCost?: number, level?: number) => number) = (baseCost) => baseCost;

  // includes levels set while loading the game
  $onLoadAndPurchase = new ReplaySubject<number>();
  // does not include loading the game
  $onPurchase = new ReplaySubject<number>();

  constructor(id: number) {
    this.id = id;
    this.level = 0;
  }

  single(name: string, effect: string, baseCost: number): Upgrade {
    return this.multi(name, effect, baseCost, 1);
  }

  multi(name: string, effect: string, baseCost: number, limit: number): Upgrade {
    return this.scaling(name, effect, baseCost, limit, this.costFunc);
  }

  scaling(name: string, effect: string, baseCost: number, limit: number, costFunc: ((baseCost: number, level: number) => number)): Upgrade {
    this.name = name;
    this.effect = effect;
    this.baseCost = baseCost;
    this.limit = limit;
    this.costFunc = costFunc;
    return this;
  }

  getCost() {
    return this.costFunc(this.baseCost, this.level);
  }

  canBuy() {
    return this.level < this.limit;
  }

  loadLevel(level: number) {
    while (this.canBuy() && level--) {
      this.$onLoadAndPurchase.next(this.level);
      this.level += 1;
    }
  }

  upgradeLevel(levels?: number) {
    let level = levels || 1
    while (this.canBuy() && level--) {
      this.$onPurchase.next(this.level);
      this.$onLoadAndPurchase.next(this.level);
      this.level += 1;
    }
  }
}

const buttonUpgrades: Upgrade[] = [
  new Upgrade(1).scaling("Button Multiplier", "2x to button value.", 2500, 5, (c, l) => (c * 4 ** l)),
  new Upgrade(2).multi("Popup Chance", "Add a 5% chance clicking a button will pop another button back up.", 5000, 10),
  new Upgrade(3).single("Cheaper Upgrades", "Reduces button level cost scaling.", 10000),
  new Upgrade(4).single("New Button", "Adds a third button.", 20000)
]

export const UPGRADES: Upgrade[] = [].concat(buttonUpgrades);
