import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private httpClient : HttpClient) { }

  //API to add quiz
  addQuiz(quiz:any) : Observable<any>{
    return this.httpClient.post(environment.adminurl+"/addquiz",quiz)
  }
}