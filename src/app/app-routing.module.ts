import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { CanActivateGuardService } from './authentication/can-activate-guard.service';
import { AdminComponent } from './admin/admin.component';
import { ProductsComponent } from './admin/components/products/products.component';
import { MyProfileComponent } from './admin/components/my-profile/my-profile.component';
import { ProductComponent } from './admin/components/product/product.component';
import { LocationsComponent } from './admin/components/locations/locations.component';
import { LocationComponent } from './admin/components/location/location.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [CanActivateGuardService],
    data:{ expectedRole: "admin" } ,
    children: [
      {
        path: '',
        children: [
          { 
            path: 'dashboard', 
            component: DashboardComponent,
            canActivate: [CanActivateGuardService],

            data: { expectedRole: "admin" }},      
          { path: 'products', component: ProductsComponent,data: { expectedRole: "admin" } },
          { path: 'product/:id', component: ProductComponent,data: { expectedRole: "admin" } },
          { path: 'product', component: ProductComponent,data: { expectedRole: "admin" } },
          { path: 'locations', component: LocationsComponent,data: { expectedRole: "admin" } },
          { path: 'location/:id', component: LocationComponent,data: { expectedRole: "admin" } },
          { path: 'location', component: LocationComponent,data: { expectedRole: "admin" } },
          { path: "my-profile", component: MyProfileComponent, data: { expectedRole: "admin" } },
          { path: '', component: DashboardComponent }
        ]
      }
    ]
  },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
