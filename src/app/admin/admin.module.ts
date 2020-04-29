import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodosComponent } from './todo/todos/todos.component';
import { AddTodoComponent } from './todo/add-todo/add-todo.component';
import { RouterModule } from '@angular/router';
import { MatTableModule, MatFormFieldModule, MatPaginatorModule, MatInputModule, MatSortModule, MatButtonModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { DialogBoxComponent } from '../shared/dialog-box/dialog-box.component';
import { DeleteTodoComponent } from './todo/delete-todo/delete-todo.component';
import { UpdateTodoComponent } from './todo/update-todo/update-todo.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { AboutComponent } from '../components/about/about.component';
import { ProductsComponent } from './components/products/products.component';
import { AdminComponent } from './admin.component';
import { ProductComponent } from './components/product/product.component';
import { DataTablesModule } from 'angular-datatables';
import { DashboardService } from './services/dashboard.service';
import { LocationsComponent } from './components/locations/locations.component';
import { LocationComponent } from './components/location/location.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MyProfileComponent,
    AboutComponent,
    TodosComponent,
    AddTodoComponent,
    DialogBoxComponent,
    DeleteTodoComponent,
    UpdateTodoComponent,
    ProductsComponent,
    AdminComponent,
    ProductComponent,
    LocationsComponent,
    LocationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    DataTablesModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  entryComponents: [DialogBoxComponent, DeleteTodoComponent, AddTodoComponent, UpdateTodoComponent],
  exports: [DashboardComponent, MyProfileComponent, AboutComponent, TodosComponent, DeleteTodoComponent],
  providers: [DashboardService, MatDatepickerModule]
})
export class AdminModule { }
