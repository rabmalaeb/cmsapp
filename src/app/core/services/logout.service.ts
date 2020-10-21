import { Injectable, Inject } from "@angular/core";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../modules/authentication/authentication.service";
import { StorageParams } from "src/app/shared/models/general";

@Injectable({
  providedIn: "root",
})
export class LogoutService {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {}

  /**
   * remove user from local storage to log user out
   */
  logout() {
    if (this.authenticationService.isLoggedIn) {
      this.authenticationService.deleteAuthentication().subscribe(
        () => this.removeSession(),
        () => this.removeSession()
      );
    }
  }

  removeSession() {
    this.storage.remove(StorageParams.CURRENT_USER);
    this.router.navigate(["/login"]);
  }
}
