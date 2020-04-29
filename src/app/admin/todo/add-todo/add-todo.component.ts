import { Component, OnInit, Inject } from '@angular/core';
import { ToDo } from 'src/app/models/to-do';
import { ToDoService } from 'src/app/services/to-do.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EqualValidator } from 'src/app/shared/directives/validators/equal-validator';
import { MatDialogRef } from '@angular/material';
import { environment } from 'src/environments/environment';
import { AppConfig, APP_CONFIG } from 'src/app/app-config.module';

@Component({
    selector: 'app-add-todo',
    templateUrl: './add-todo.component.html',
    styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

    newTodoItem = new ToDo();
    newToDoForm: FormGroup;
    submitted = false;
    minDate = new Date();

    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<AddTodoComponent>,
        private todoService: ToDoService,
        @Inject(APP_CONFIG) private config: AppConfig) {
    }

    ngOnInit() {
        this.newToDoForm = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            fromDate: ['', [Validators.required]],
            toDate: ['', Validators.required]
        }, {
            validator: EqualValidator('fromDate', 'toDate')
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.newToDoForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.newToDoForm.invalid) {
            return;
        }

        this.todoService.insertTodo(this.newTodoItem).subscribe(
            (response: ToDo) => {
                this.dialogRef.close({ result: response });
            },
            (error) => {
                console.log(error);
            }
        )
    }
}