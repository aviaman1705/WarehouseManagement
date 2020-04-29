import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToDo } from '../models/to-do';
import { Observable } from 'rxjs';
import { TodoGridView } from '../models/todo-grid-view';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  private todoUrl: string = `${environment.apiUrl}todos`;
  constructor(private httpClient: HttpClient) { }

  getTodos(): Observable<ToDo[]> {
    var requestHeaders = new HttpHeaders();
    requestHeaders.set("X-XSRF-TOKEN", sessionStorage.XSRFRequestToken);

    return this.httpClient.get<ToDo[]>(`${this.todoUrl}/GetTodos`, { headers: requestHeaders, responseType: "json" });
  }

  insertTodo(newTodo: ToDo): Observable<ToDo> {
    var requestHeaders = new HttpHeaders();
    requestHeaders.set("X-XSRF-TOKEN", sessionStorage.XSRFRequestToken);

    return this.httpClient.post<ToDo>(this.todoUrl, newTodo, { headers: requestHeaders, responseType: "json" });
  }

  updateTodo(exsitingTodo: ToDo): Observable<ToDo> {
    return this.httpClient.put<ToDo>(this.todoUrl, exsitingTodo, { responseType: "json" });
  }

  deleteTodo(Id: number): Observable<string> {
    return this.httpClient.delete<string>(this.todoUrl + "?Id=" + Id);
  }

  searchTodos(searchBy: string, searchText: string): Observable<TodoGridView> {
    return this.httpClient.get<TodoGridView>(this.todoUrl + "/search/" + searchBy + "/" + searchText, { responseType: "json" });
  }
}
