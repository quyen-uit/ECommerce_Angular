import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.scss']
})
export class TestErrorsComponent {
  private apiUrl: string = environment.apiUrl;
  validationErrors: string[] = [];

  constructor(private http: HttpClient) { }
  get404Error() {
    this.http.get(this.apiUrl + 'products/111').subscribe({
      next: response => console.log(response),
      error: err => console.log(err)
    })
  }
  get400Error() {
    this.http.get(this.apiUrl + 'buggy/badrequest').subscribe({
      next: response => console.log(response),
      error: err => console.log(err)
    })
  }
  get500Error() {
    this.http.get(this.apiUrl + 'buggy/servererror').subscribe({
      next: response => console.log(response),
      error: err => console.log(err)
    })
  }
  get400ValidationError() {
    this.http.get(this.apiUrl + 'products/aaa').subscribe({
      next: response => console.log(response),
      error: err => {
        this.validationErrors = err.errors;
      }
    })
  }
}
