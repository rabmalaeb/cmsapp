import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { BannersComponent } from './banners/banners.component';
import { BannerAddComponent } from './banner-add/banner-add.component';
import { ViewBannerGuard } from './guards/view-banner.guard';
import { EditBannerGuard } from './guards/edit-banner.guard';
import { AddBannerGuard } from './guards/add-banner.guard';

const routes: Routes = [
  {
    path: 'banners',
    component: BannersComponent,
    canActivate: [ViewBannerGuard]
  },
  {
    path: 'banners/:id/view',
    component: BannerAddComponent,
    canActivate: [EditBannerGuard]
  },
  {
    path: 'banners/add',
    component: BannerAddComponent,
    canActivate: [AddBannerGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class BannerRoutingModule {}
