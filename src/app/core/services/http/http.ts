import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  CppHttp,
  CppHttpBackend,
  NotificationDispatcher,
  HttpQueryOptions,
  HttpComandOptions,
  HttpCommandSyncOptions,
  GENERATE_UNIQUE_KEY,
  GenerateUniqueKeyFn
} from '@cpp/core';

import { finalize } from 'rxjs/operators';
import { PendingApiRequest, CompletedApiRequest } from '../../actions';
import { AppState } from '../../reducers';

export type RequestOptions = HttpQueryOptions | HttpComandOptions | HttpCommandSyncOptions;

// extend CppHttp so that we can spy on its requests

@Injectable()
export class CCE2EHttp extends CppHttp {
  private store = inject<Store<AppState>>(Store);

  constructor() {
    const generateUniqueKey = inject<GenerateUniqueKeyFn>(GENERATE_UNIQUE_KEY);
    const backend = inject(CppHttpBackend);
    const notificationDispatcher = inject(NotificationDispatcher);

    super(generateUniqueKey, backend, notificationDispatcher);
  }

  handleRequest(options: RequestOptions) {
    this.store.dispatch(new PendingApiRequest(options));
  }

  handleResponse(options: RequestOptions) {
    return (source$) =>
      source$.pipe(
        finalize(() => {
          this.store.dispatch(new CompletedApiRequest(options));
        })
      );
  }

  query<R>(options: HttpQueryOptions): Observable<R> {
    this.handleRequest(options);

    return super.query<R>(options).pipe(this.handleResponse(options));
  }

  command<R>(options: HttpComandOptions): Observable<R> {
    this.handleRequest(options);

    return super.command(options).pipe(this.handleResponse(options));
  }

  commandSync<R>(options: HttpCommandSyncOptions): Observable<R> {
    this.handleRequest(options);

    return super.commandSync(options).pipe(this.handleResponse(options));
  }
}

export function cce2eHttpFactory(
  generateUniqueKey: any,
  backend: CppHttpBackend,
  notificationDispatcher: NotificationDispatcher,
  store: Store<AppState>
) {
  return new CCE2EHttp();
}
