import { tap } from 'rxjs/operators';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CppHttpConfig } from '@cpp/core';
import { AppConfig } from './interfaces';

// AppConfigService can be used as the provider for all configuration
// dependencies required by submodules, so long as it implements their
// interfaces

@Injectable({ providedIn: 'root' })
export class AppConfigService implements CppHttpConfig {
  private http = inject(HttpClient);

  appUrl: string;
  baseUrl: string;
  logoutUrl: string;
  accountUrl: string;
  cppHomeUrl?: string;

  load() {
    return new Promise((resolve, reject) => {
      this.http
        .get('./app.override.config.json')
        .pipe(
          tap((config: AppConfig) => {
            this.appUrl = config.appUrl;
            this.baseUrl = config.apiRoot;
            this.accountUrl = config.idamProfilePage;
            this.logoutUrl = config.idamLogoutPage;
          })
        )
        .subscribe(resolve, reject);
    });
  }

  getLogoutUrl(): string {
    return this.logoutUrl;
  }

  getAccountUrl(): string {
    return this.accountUrl;
  }

  getAppUrl(): string {
    return this.appUrl;
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }
}
