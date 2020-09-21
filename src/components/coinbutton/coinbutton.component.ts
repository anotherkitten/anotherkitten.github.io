import { Component, OnInit } from '@angular/core';

import { ButtonService } from 'src/services/button.service';
import { CoinButton } from 'src/models/coinbutton';

@Component({
  selector: 'app-coinbutton',
  templateUrl: './coinbutton.component.html',
  styleUrls: ['./coinbutton.component.scss']
})
export class CoinbuttonComponent implements OnInit {

  constructor(private buttonService: ButtonService) { }

  ngOnInit() {
  }

  getButtons(): CoinButton[] {
    return this.buttonService.buttons;
  }

  clickButton(id: number) {
    this.buttonService.pressButton(id);
  }

  upgradeButton(id: number) {
    this.buttonService.upgradeButton(id);
  }
}
