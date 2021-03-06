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
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './services/category.service';
import { FormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';
import { CustomFormsModule } from 'ng2-validation'; // for validation
import { DataTableModule } from 'angular5-data-table';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ShopingCartService } from './services/shoping-cart.service';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { OrderService } from './services/order.service';
  
import { ShoppingCartSummeryComponent } from './shopping-cart-summery/shopping-cart-summery.component';
import { OrderdetailsComponent } from './admin/orderdetails/orderdetails.component';
  
  

const routes:Routes = [
{path:'', redirectTo:'home',pathMatch:'full'},
//{path:'home', component:HomeComponent},
{path:'home', component:ProductsComponent},
{path:'login', component:LoginComponent},

{path:'product', component:ProductsComponent},
{path:'shopping-cart', component:ShoppingCartComponent},
{path:'checkout', component:CheckOutComponent, canActivate:[AuthGuard]},
{path:'order-success/:id', component:OrderSuccessComponent,canActivate:[AuthGuard]},
{path:'my/orders', component:MyOrdersComponent},
 
//routing from more specific to more generalized
{path:'admin/products/new', component:ProductFormComponent, canActivate:[AuthGuard, AdminAuthGuard] },
{path:'admin/products/:id', component:ProductFormComponent, canActivate:[AuthGuard, AdminAuthGuard] },
{path:'admin/products', component:AdminProductsComponent, canActivate:[AuthGuard, AdminAuthGuard] },
{path:'admin/orders/:id', component:OrderdetailsComponent, canActivate:[AuthGuard,AdminAuthGuard]},
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
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummeryComponent,
    OrderdetailsComponent 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routes),
    NgbModule,
    CustomFormsModule, //for validation
    DataTableModule
   
   
    
  ],
  providers: [ AuthService,AuthGuard,UserService,AdminAuthGuard,
    CategoryService, ProductService,ShopingCartService,OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
