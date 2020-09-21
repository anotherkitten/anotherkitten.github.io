import { Component, OnInit, Input } from '@angular/core';

import { PageService } from 'src/services/page.service';
import { Page } from 'src/models/page';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
  @Input() active: boolean;

  constructor(private pageService: PageService) { }

  ngOnInit() {
  }

  getUnlockedPages(): Page[] {
    return this.pageService.getUnlockedPages();
  }

}
