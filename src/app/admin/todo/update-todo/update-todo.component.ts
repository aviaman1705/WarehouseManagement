import { Component, OnInit, Inject } from '@angular/core';
import { ToDo } from 'src/app/models/to-do';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToDoService } from 'src/app/services/to-do.service';
import { EqualValidator } from 'src/app/shared/directives/validators/equal-validator';
import { AppConfig, APP_CONFIG } from 'src/app/app-config.module';

@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.scss']
})
export class UpdateTodoComponent implements OnInit {

  editTodoItem = new ToDo();
  editToDoForm: FormGroup;
  submitted = false;
  minDate = new Date();
  
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateTodoComponent>,
    private todoService: ToDoService,
    @Inject(APP_CONFIG) private config: AppConfig,
    @Inject(MAT_DIALOG_DATA) public data: ToDo) {
    this.editTodoItem = data;
  }

  ngOnInit() {
    this.editToDoForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      fromDate: ['', [Validators.required]],
      toDate: ['', Validators.required]
    }, {
      validator: EqualValidator('fromDate', 'toDate')
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.editToDoForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.editToDoForm.invalid) {
      return;
    }

    this.todoService.updateTodo(this.editTodoItem).subscribe(
      (response: ToDo) => {
        this.dialogRef.close({ result: response });
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
