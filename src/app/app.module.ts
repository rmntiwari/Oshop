import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


//default app routing module
import { AppRoutingModule } from './app-routing.module';


//angular fire modules
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
 
// setting firebase environment
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component'; 
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';
import { UserService } from './services/user.service';
import { AdminAuthGuard } from './admin-auth.guard';

const routes:Routes = [
{path:'', redirectTo:'home',pathMatch:'full'},
{path:'home', component:HomeComponent},
{path:'login', component:LoginComponent},

{path:'product', component:ProductsComponent},
{path:'shopping-cart', component:ShoppingCartComponent},
{path:'checkout', component:CheckOutComponent, canActivate:[AuthGuard]},
{path:'order-success', component:OrderSuccessComponent,canActivate:[AuthGuard]},
{path:'my/orders', component:MyOrdersComponent},
 
{path:'admin/products', component:AdminProductsComponent, canActivate:[AuthGuard,AdminAuthGuard]},
{path:'admin/orders', component:AdminOrderComponent, canActivate:[AuthGuard,AdminAuthGuard]},
 
{ path: '**', component:PagenotfoundComponent }

];


@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    PagenotfoundComponent,     
    AdminProductsComponent,
    AdminOrderComponent,
    LoginComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routes),
    NgbModule
    
  ],
  providers: [ AuthService,AuthGuard,UserService,AdminAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
