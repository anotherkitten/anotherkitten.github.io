import { Injectable, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { CoinService } from 'src/services/coin.service';
import { Crop, CropPlot, CropSilo } from 'src/models/farm';
import { Save, Saveable } from 'src/models/save';

@Injectable()
export class FarmService implements OnDestroy, Saveable {
  plots: CropPlot[][] = [];
  silos: CropSilo[] = [];
  $checkCrops: Subscription;

  constructor(private coinService: CoinService) {
    this.addRow();
    this.addRow();
    this.silos = this.getCrops().map(crop => new CropSilo(crop));

    this.$checkCrops = interval(1000).subscribe(this.checkCrops);
  }

  ngOnDestroy() {
    this.$checkCrops.unsubscribe();
  }

  save(): Save {
    const data = {
      plots: this.plots,
      silos: this.silos
    }

    return data;
  }

  load(data: Save) {
    this.plots = data.plots.map((plotRow: CropPlot[]) => plotRow.map((plot: CropPlot) => Object.assign(new CropPlot(0,0), plot, {
      crop: plot.crop ? this.getCrop(plot.crop.id) : null
    })));
    this.silos = data.silos.map((silo: CropSilo) => Object.assign(new CropSilo(null), silo, {
      crop: this.getCrop(silo.crop.id)
    }));
  }

  // // // // CROP STUFF
  getCrops(): Crop[] {
    const potato = new Crop(1, "potato", "Basic crop", 50, 15e3, 5e3, 5);
    const carrot = new Crop(2, "carrot", "Basic crop", 750, 30e3, 15e3, 35);
    return [potato, carrot];
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
        this.getSilo(plot.crop.id).add(plot.getHarvests());
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
