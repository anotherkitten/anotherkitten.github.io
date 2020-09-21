import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from 'src/components/main/main.component';
import { CoinbuttonComponent } from 'src/components/coinbutton/coinbutton.component';
import { FarmComponent } from 'src/components/farm/farm.component';
import { UpgradesComponent } from 'src/components/upgrades/upgrades.component';

import { PageGuard } from 'src/guards/page.guard'

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'buttons', component: CoinbuttonComponent, canActivate: [PageGuard] },
  { path: 'farm', component: FarmComponent, canActivate: [PageGuard] },
  { path: 'upgrades', component: UpgradesComponent, canActivate: [PageGuard] },
  { path: '**', redirectTo: '/main', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
