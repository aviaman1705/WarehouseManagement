import { Component, OnInit, Inject, Optional } from '@angular/core';
import { ToDo } from 'src/app/models/to-do';
import { ToDoService } from 'src/app/services/to-do.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-todo',
  templateUrl: './delete-todo.component.html',
  styleUrls: ['./delete-todo.component.scss']
})
export class DeleteTodoComponent {
  
  itemToRemove: ToDo;

  constructor(
    public dialogRef: MatDialogRef<DeleteTodoComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ToDo) {
    this.itemToRemove = data;
  }

  delete() {
    this.dialogRef.close({ event: 'Delete' });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
