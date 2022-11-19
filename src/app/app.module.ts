import { HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { ProductDtoComponent } from './components/product-dto/product-dto.component';
import { ProductDtoService } from './services/product-dto.service';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { AppService } from './services/app.service';
import { RegisterComponent } from './components/register/register.component';
import { UserService } from './services/user.service';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { CartComponent } from './components/cart/cart.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { ProductDtoDetailsComponent } from './components/product-dto-details/product-dto-details.component';
import { AuthInterCeptor } from './interceptors/auth-interceptor';
import { ThankYouComponent } from './components/thank-you/thank-you.component';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const xhr = request.clone({
      headers: request.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductDtoComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    AllProductsComponent,
    CartComponent,
    PlaceOrderComponent,
    ProductDtoDetailsComponent,
    ThankYouComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductDtoService, 
    AppService, 
    UserService, 
    { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }, 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterCeptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }