import { formatTime } from 'src/common/globalfuncs';

export class Crop {
  id: number;
  name: string;
  desc: string;
  cost: number;
  growthTime: number;
  prodRate: number;
  sellValue: number;

  constructor(id: number, name: string, desc: string, cost: number, gt: number, pr: number, sv: number) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.cost = cost;
    this.growthTime = gt;
    this.prodRate = pr;
    this.sellValue = sv;
  }
}

export class CropSilo {
  crop: Crop;
  capacityLevel: number;
  stored: number;

  constructor(crop: Crop) {
    this.crop = crop;
    this.capacityLevel = 1;
    this.stored = 0;
  }

  add(amount: number) {
    this.stored = Math.min(this.getCapacity(), this.stored + amount);
  }

  sell(percent: number): number {
    const sold = Math.min(this.stored, Math.ceil(this.getCapacity() * percent / 100));
    this.stored -= sold;
    return sold;
  }

  getCapacity(add?: number): number {
    const effectiveLevel = add ? this.capacityLevel + add : this.capacityLevel;
    return (effectiveLevel + 1) * effectiveLevel * 12.5 + 25;
  }

  getUpgradeCost(): number {
    return (this.capacityLevel / 2 + 1.5) * this.capacityLevel * 10 * this.crop.sellValue;
  }

  upgrade() {
    this.capacityLevel++;
  }
}

export class CropPlot {
  row: number;
  column: number;
  crop: Crop;
  grown: boolean;
  harvested: number;

  constructor(column: number, row: number) {
    this.row = row;
    this.column = column;
    this.crop = null;
    this.grown = false;
    this.harvested = +new Date();
  }

  getTimeLeft(): string {
    return formatTime(Math.max(this.harvested + (this.grown ? this.crop.prodRate : this.crop.growthTime) -+ new Date(), 0));
  }

  getHarvests(): number {
    if (!this.crop) return 0;

    let harvests = 0;

    while (+new Date() - this.harvested > (this.grown ? this.crop.prodRate : this.crop.growthTime)) {
      if (this.grown) {
        harvests++;
        this.harvested += this.crop.prodRate;
      } else {
        this.grown = true;
        this.harvested += this.crop.growthTime;
      }
    }

    return harvests;
  }
}
