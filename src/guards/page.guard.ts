import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { PageService } from 'src/services/page.service';

@Injectable()
export class PageGuard implements CanActivate {

  constructor(private pageService: PageService,
              private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const returnOnFail = this.router.getCurrentNavigation().previousNavigation === null ?
      this.router.parseUrl('/main') :
      false;

    return (this.pageService.getUnlockedPages().find(page => page.route === state.url) !== undefined) || returnOnFail;
  }
}
