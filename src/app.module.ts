import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FileSaverModule } from 'ngx-filesaver';

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
import { UpgradesComponent } from 'src/components/upgrades/upgrades.component';
import { FarmIconComponent } from 'src/common/farm-icon/farm-icon.component';
import { FarmService } from 'src/services/farm.service';
import { SaveService } from 'src/services/save.service';
import { UpgradeService } from 'src/services/upgrade.service';
import { UpgradeButtonComponent } from './components/upgrades/upgrade-button/upgrade-button.component';

@NgModule({
  imports:      [ AppRoutingModule, BrowserAnimationsModule, BrowserModule, FileSaverModule, FormsModule, MatButtonModule, MatIconModule, MatTabsModule, MatTooltipModule ],
  declarations: [ AppComponent, SidemenuComponent, MainComponent, CoinbuttonComponent, FarmComponent, FarmIconComponent, UpgradesComponent, UpgradeButtonComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ ButtonService, CoinService, PageService, PageGuard, FarmService, SaveService, UpgradeService, {provide: APP_BASE_HREF, useValue: environment.baseHref} ]
})
export class AppModule { }
