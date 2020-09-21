import { Component, OnInit } from '@angular/core';

import { formatNum, formatTime } from 'src/common/globalfuncs'
import { FarmService } from 'src/services/farm.service';
import { CropPlot, CropSilo } from 'src/models/farm';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.scss']
})
export class FarmComponent implements OnInit {
  selectedSilo: CropSilo = null;
  sellPercents = [10, 50, 100];
  selectedCrop = -1;
  crops = this.farmService.getCrops();
  formatNum = formatNum;
  formatTime = formatTime;

  constructor(private farmService: FarmService) { }

  ngOnInit() {
    this.selectCrop(1);
  }

  getPlots() {
    return this.farmService.plots;
  }

  getCostOfNewRow() {
    return this.farmService.getCostOfNewRow();
  }

  buyRow() {
    this.farmService.buyRow();
  }

  selectCrop(id: number) {
    this.selectedCrop = id;
    this.selectedSilo = this.farmService.getSilo(id) || null;
  }

  getAmountPlantsOfCrop() {
    return this.farmService.getPlotsOfCrop(this.selectedCrop).length;
  }

  getAmountGrownPlantsOfCrop() {
    return this.farmService.getPlotsOfCrop(this.selectedCrop)
                           .filter(plot => plot.grown)
                           .length;
  }

  getCropPerSecondOfCrop() {
    return this.getAmountGrownPlantsOfCrop() * 1000 / this.farmService.getCrop(this.selectedCrop).prodRate;
  }

  getCoinsPerSecondOfCrop() {
    return this.getCropPerSecondOfCrop() * this.farmService.getCrop(this.selectedCrop).sellValue;
  }

  clickPlot(plot: CropPlot) {
    if (this.selectedCrop === 0) {
      this.farmService.clearPlot(plot.row, plot.column);
    } else if (this.selectedCrop > 0) {
      this.farmService.buyPlant(this.selectedCrop, plot.row, plot.column);
    }
  }

  upgradeSilo() {
    this.farmService.upgradeSilo(this.selectedCrop);
  }

  sellCrop(percent: number) {
    this.farmService.sellCrops(this.selectedCrop, percent);
  }
}
