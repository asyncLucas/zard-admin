import { HttpContextToken, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, finalize } from "rxjs";
import { LoadingService } from "../services/loading.service";

export const SkipLoading = 
  new HttpContextToken<boolean>(() => false);

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  readonly #loadingService = inject(LoadingService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.context.get(SkipLoading)) {
      return next.handle(req);
    }

    this.#loadingService.show();

    return next.handle(req).pipe(
      finalize(() => {
        this.#loadingService.hide();
      })
    );
  }
}
