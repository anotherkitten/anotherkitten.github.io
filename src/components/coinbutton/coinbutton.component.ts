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

  getDownButtons() {
    return this.getButtons().filter(btn => btn.disabled);
  }

  clickButton(id: number) {
    const downedButtons = this.getDownButtons();
    if (downedButtons.length && Math.random() * 100 < this.buttonService.buttonPopUpChance) {
      downedButtons[Math.floor(Math.random() * downedButtons.length)].popUp();
    }

    this.buttonService.pressButton(id);
  }

  upgradeButton(id: number) {
    this.buttonService.upgradeButton(id);
  }

  getBtnVal(button: CoinButton, num?: number) {
    return this.buttonService.getButtonVal(button, num);
  }
}
