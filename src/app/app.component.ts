import { fromEvent as observableFromEvent, merge as observableMerge, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  debounceTime,
  startWith,
  mapTo,
  tap,
  filter,
  map
} from 'rxjs/operators';
import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './core/reducers';
import { getHasApiActivity, NetworkConnectivityAction } from './core';
import { AppConfigService } from './config';
import { HeaderNavItem } from '@cpp/application/layout/layout.component';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { CppApplicationLayoutComponent } from '@cpp/application';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [CppApplicationLayoutComponent, RouterOutlet, AsyncPipe]
})
export class AppComponent implements OnInit {
  private store = inject<Store<AppState>>(Store);
  private translate = inject(TranslateService);
  private router = inject(Router);
  private titleService = inject(Title);
  private activatedRoute = inject(ActivatedRoute);

  accessibilityLink: string;
  hasApiActivity$: Observable<boolean>;
  online: boolean;
  headerNavItems: HeaderNavItem[];

  logoutUrl: string;
  accountUrl: string;
  homeUrl: string;

  constructor() {
    const store = this.store;
    const appConfigService = inject(AppConfigService);

    this.accessibilityLink = `${appConfigService.getAppUrl()}/accessibility`;
    this.accountUrl = appConfigService.getAccountUrl();
    this.logoutUrl = appConfigService.getLogoutUrl();
    this.homeUrl = appConfigService.getAppUrl();

    this.headerNavItems = [
      {
        title: 'Home',
        href: this.homeUrl
      },
      {
        title: 'Hearing Results',
        onClick: () => {
          this.router.navigate(['/']);
        }
      }
    ];

    if (this.accountUrl) {
      this.headerNavItems = [
        ...this.headerNavItems,
        {
          title: 'Your Account',
          href: this.accountUrl
        }
      ];
    }

    if (this.logoutUrl) {
      this.headerNavItems = [
        ...this.headerNavItems,
        {
          title: 'Sign out',
          href: this.logoutUrl
        }
      ];
    }

    this.hasApiActivity$ = this.store.select(getHasApiActivity).pipe(debounceTime(1));

    observableMerge(
      observableFromEvent(window, 'online').pipe(mapTo(true)),
      observableFromEvent(window, 'offline').pipe(mapTo(false))
    )
      .pipe(
        startWith(navigator.onLine),
        distinctUntilChanged(),
        tap((online) => (this.online = online))
      )
      .subscribe((online) => store.dispatch(new NetworkConnectivityAction(online)));

    // Translate
    this.translate.addLangs(['en']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|cy/) ? browserLang : 'en');
  }
  ngOnInit(): void {
    const appTitle = this.titleService.getTitle();
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child.firstChild) {
            child = child.firstChild;
          }
          if (child.snapshot.data['title']) {
            return child.snapshot.data['title'];
          }
          return appTitle;
        })
      )
      .subscribe((ttl: string) => {
        this.titleService.setTitle(ttl);
      });
  }
}
