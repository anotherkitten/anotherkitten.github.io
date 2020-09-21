import { Component, OnInit } from '@angular/core';

import { PageService } from 'src/services/page.service';
import { Page } from 'src/models/page';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  pagesToBuy: Page[];

  constructor(private pageService: PageService) { }

  ngOnInit() {
    this.getPagesToBuy();
  }

  getPagesToBuy() {
    this.pagesToBuy = this.pageService.getLockedPages();
  }

  buyPage(id: number) {
    this.pageService.purchasePage(id);
    this.getPagesToBuy();
  }

}
