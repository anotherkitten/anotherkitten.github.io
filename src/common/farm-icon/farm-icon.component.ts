import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-farm-icon',
  templateUrl: './farm-icon.component.html',
  styleUrls: ['./farm-icon.component.scss']
})
export class FarmIconComponent implements OnInit {
  @Input() icon: string;
  @Input() iconSize: string = "64px";
  @Input() iconColor: string;

  constructor() { }

  ngOnInit() {
  }

  isIcon(icon: string) {
    return this.icon === icon;
  }

  getIconColor(): string {
    return this.iconColor || `var(--${this.icon})`;
  }
}
