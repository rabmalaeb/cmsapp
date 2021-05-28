import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { BannersComponent } from './banners/banners.component';
import { BannerAddComponent } from './banner-add/banner-add.component';
import { ViewBannerGuard } from './guards/view-banner.guard';
import { EditBannerGuard } from './guards/edit-banner.guard';
import { AddBannerGuard } from './guards/add-banner.guard';
import { AuthenticationGuard } from 'src/app/core/guards/authentication.guard';

const routes: Routes = [
  {
    path: 'banners',
    component: BannersComponent,
    canActivate: [ViewBannerGuard, AuthenticationGuard]
  },
  {
    path: 'banners/:id/view',
    component: BannerAddComponent,
    canActivate: [EditBannerGuard, AuthenticationGuard]
  },
  {
    path: 'banners/add',
    component: BannerAddComponent,
    canActivate: [AddBannerGuard, AuthenticationGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
})
  ],
  exports: [RouterModule]
})
export class BannerRoutingModule {}
