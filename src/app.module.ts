import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { environment } from 'src/environments/environment';

import { AppRoutingModule } from 'src/app-routing.module';

import { PageGuard } from 'src/guards/page.guard';

import { ButtonService } from 'src/services/button.service';
import { CoinService } from 'src/services/coin.service';
import { PageService } from 'src/services/page.service';

import { AppComponent } from 'src/components/app/app.component';
import { SidemenuComponent } from 'src/components/sidemenu/sidemenu.component';
import { MainComponent } from 'src/components/main/main.component';
import { CoinbuttonComponent } from 'src/components/coinbutton/coinbutton.component';
import { FarmComponent } from 'src/components/farm/farm.component';
import { FarmIconComponent } from 'src/common/farm-icon/farm-icon.component';
import { FarmService } from 'src/services/farm.service';
import { SaveService } from 'src/services/save.service';
import {APP_BASE_HREF} from '@angular/common';

@NgModule({
  imports:      [ AppRoutingModule, BrowserModule, FormsModule, MatButtonModule, MatIconModule, MatTooltipModule ],
  declarations: [ AppComponent, SidemenuComponent, MainComponent, CoinbuttonComponent, FarmComponent, FarmIconComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ ButtonService, CoinService, PageService, PageGuard, FarmService, SaveService, {provide: APP_BASE_HREF, useValue: environment.baseHref} ]
})
export class AppModule { }
