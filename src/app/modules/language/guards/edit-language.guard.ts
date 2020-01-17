import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ModuleName } from 'src/app/models/general';

@Injectable({ providedIn: 'root' })
export class EditLanguageGuard implements CanActivate {
  constructor(
    private router: Router,
    private authorizationService: AuthorizationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authorizationService.canAdd(ModuleName.ADMINS);
  }
}
