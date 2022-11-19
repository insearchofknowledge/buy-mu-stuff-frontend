import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

export class AuthInterCeptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        console.log('Sending Request Interceptor');
        return next.handle(request);
    }
}