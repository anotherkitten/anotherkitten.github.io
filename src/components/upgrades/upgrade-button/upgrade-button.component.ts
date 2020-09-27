import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Upgrade } from 'src/models/upgrade';

import { formatNum } from 'src/common/globalfuncs';

@Component({
  selector: 'app-upgrade-button',
  templateUrl: './upgrade-button.component.html',
  styleUrls: ['./upgrade-button.component.scss']
})
export class UpgradeButtonComponent implements OnInit {
  @Input() upgrade: Upgrade;
  @Input() disabled: boolean;
  @Output() upgradeButton = new EventEmitter<void>();

  formatNum = formatNum;

  constructor() { }

  ngOnInit(): void {
  }

  clickButton() {
    this.upgradeButton.emit();
  }

  isMaxed() {
    return this.upgrade.level >= this.upgrade.limit;
  }
}
