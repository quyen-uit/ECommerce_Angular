import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, delay, finalize, tap } from 'rxjs';
import { BusyService } from '../services/busy.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private busyService: BusyService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('email-exist')
      || (request.method === 'POST' && request.url.includes('order'))
      || request.method === 'DELETE') {
      return next.handle(request);
    }
    this.busyService.busy();
    return next.handle(request).pipe(
      tap(data => {
        console.log(data)
        // Do your success stuff in here
      }),
      // delay(1000),
      finalize(() => this.busyService.idle())
    )
  }
}
