import { Injectable, OnDestroy } from '@angular/core';
import { timer, Subscription } from 'rxjs';

import { CoinService } from 'src/services/coin.service';
import { UpgradeService } from 'src/services/upgrade.service';
import { Crop, CropPlot, CropSilo } from 'src/models/farm';
import { Save, Saveable } from 'src/models/save';

@Injectable()
export class FarmService implements OnDestroy, Saveable {
  crops: Crop[] = [];
  plots: CropPlot[][] = [];
  silos: CropSilo[] = [];
  autosell = 0;
  $checkCrops: Subscription;

  constructor(private coinService: CoinService,
              private upgService: UpgradeService) {
    this.addRow();
    this.addRow();
    this.crops = this.makeCrops();
    this.subscribeToUpgrades();

    this.silos = this.crops.map(crop => new CropSilo(crop));
    this.$checkCrops = timer(1, 1000).subscribe(this.checkCrops);
  }

  ngOnDestroy() {
    this.$checkCrops.unsubscribe();
  }

  save(): Save {
    const data = {
      plots: this.plots,
      silos: this.silos.map(silo => { return { capacityLevel: silo.capacityLevel, cropId: silo.crop.id, stored: silo.stored }; })
    }

    return data;
  }

  load(data: Save) {
    this.plots = data.plots.map((plotRow: CropPlot[]) => plotRow.map((plot: CropPlot) => Object.assign(new CropPlot(0,0), plot, {
      crop: plot.crop ? this.getCrop(plot.crop.id) : null
    })));
    this.silos.map((silo: CropSilo) => Object.assign(this.getSilo(silo.crop.id), data.silos.find(s => s.cropId === silo.crop.id)));
  }

  subscribeToUpgrades() {
    this.upgService.getUpgrade(101).$onLoadAndPurchase.subscribe(() => this.autosell += 20);
    this.upgService.getUpgrade(102).$onLoadAndPurchase.subscribe(() => this.crops.forEach(crop => {
      crop.growthTime /= 1.25;
      crop.prodRate /= 1.25;
    }));
  }

  // // // // CROP STUFF
  makeCrops(): Crop[] {
    const potato = new Crop(1, "potato", "Everyone loves a potato", 50, 15e3, 5e3, 5);
    const carrot = new Crop(2, "carrot", "Optometrist's favorite", 750, 30e3, 15e3, 35);
    const radish = new Crop(3, "radish", "Not quite rad, but close enough", 12500, 12e4, 45e3, 300);
    return [potato, carrot, radish];
  }

  getCrops() {
    return this.crops;
  }

  getCrop(id: number): Crop {
    return this.getCrops().find(crop => crop.id === id);
  }

  buyPlant(id: number, row: number, column: number) {
    if (!this.getPlot(row, column).crop) {
      if (this.coinService.canAfford(this.getCrop(id).cost)) {
        this.coinService.removeCoins(this.getCrop(id).cost)
        this.plantCrop(id, row, column)
      }
    }
  }

  plantCrop(id: number, row: number, column: number) {
    const plot = this.getPlot(row, column);
    plot.crop = this.getCrop(id);
    plot.grown = false;
    plot.harvested = +new Date();
  }

  checkCrops = () => {
    this.plots.reduce((flat, val) => flat.concat(val), [])
      .filter((plot: CropPlot) => plot.crop)
      .forEach((plot: CropPlot) => {
        const silo = this.getSilo(plot.crop.id);
        const amount = plot.getHarvests();
        const leftover = amount - (silo.getCapacity() - silo.stored);

        silo.add(amount);

        if (leftover > 0) {
          this.coinService.addCoins(this.autosell / 100 * leftover * silo.crop.sellValue);
        }
      });
  }

  sellCrops(id: number, percent: number) {
    this.coinService.addCoins(this.getSilo(id).sell(percent) * this.getCrop(id).sellValue);
  }


  // // // // PLOT STUFF
  getPlot(row: number, column: number): CropPlot {
    return this.plots[row][column];
  }

  getPlotsOfCrop(id: number): CropPlot[] {
    return this.plots.reduce((flat, val) => flat.concat(val), [])
      .filter((plot: CropPlot) => plot.crop && plot.crop.id === id);
  }

  getCostOfNewRow(): number {
    return 40 * 5 ** this.plots.length;
  }

  buyRow() {
    if (this.coinService.canAfford(this.getCostOfNewRow())) {
      this.coinService.removeCoins(this.getCostOfNewRow());
      this.addRow();
    }
  }

  addRow() {
    const x = this.plots.length;
    this.plots.push([
      new CropPlot(0,x),
      new CropPlot(1,x),
      new CropPlot(2,x),
      new CropPlot(3,x),
      new CropPlot(4,x)
    ]);
  }

  clearPlot(row: number, column: number) {
    this.getPlot(row, column).crop = null;
  }


  // // // // SILO STUFF
  getSilo(cropId: number): CropSilo {
    return this.silos.find(silo => silo.crop.id == cropId);
  }

  upgradeSilo(id: number) {
    const silo = this.getSilo(id);
    if (this.coinService.canAfford(silo.getUpgradeCost())) {
      this.coinService.removeCoins(silo.getUpgradeCost());
      silo.upgrade();
    }
  }
}
