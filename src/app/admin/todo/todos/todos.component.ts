import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { ToDoService } from 'src/app/services/to-do.service';
import { ToDo } from 'src/app/models/to-do';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material';
import { DialogBoxComponent } from 'src/app/shared/dialog-box/dialog-box.component';
import { DeleteTodoComponent } from '../delete-todo/delete-todo.component';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { UpdateTodoComponent } from '../update-todo/update-todo.component';



@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  tableColumns: string[] = ['action', 'isDone', 'toDate', 'fromDate', 'description', 'title', 'id'];
  dataSource = new MatTableDataSource<ToDo>();
  pageSizeOptions: number[] = [10, 25, 100];

  constructor(private todoService: ToDoService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.todoService.getTodos().subscribe(
      (response: ToDo[]) => {
        this.dataSource.data = response;
        this.dataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = "פריטים לעמוד";
        this.dataSource.sort = this.sort;
      }
    );
  }

  addTodo() {
    const dialogRef = this.dialog.open(AddTodoComponent, {
      width: '564px',
      height: '751px'
    });

    dialogRef.afterClosed().subscribe(newItem => {
      const data = this.dataSource.data;
      data.push(newItem.result);
      this.dataSource.data = data;
    });
  }

  updateTodo(todo: ToDo) {
    const dialogRef = this.dialog.open(UpdateTodoComponent, {
      width: '564px',
      height: '751px',
      data: todo
    });

    dialogRef.afterClosed().subscribe(editTodo => {
      console.log(editTodo);
    });
  }

  confirmDelete(element: ToDo) {
    const dialogRef = this.dialog.open(DeleteTodoComponent, { data: element });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event == "Delete")
        this.deleteRowData(element);
    })
  }

  deleteRowData(row_obj: ToDo) {
    this.dataSource.data = this.dataSource.data.filter((value, key) => {
      return value.id != row_obj.id;
    });

    this.todoService.deleteTodo(row_obj.id).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    )
  }




  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

