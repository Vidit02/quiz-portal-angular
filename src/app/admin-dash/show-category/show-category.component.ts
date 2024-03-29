import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { QuestionFuncService } from 'src/app/services/question-func.service';
import { QuizFuncService } from 'src/app/services/quiz-func.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.css']
})
export class ShowCategoryComponent implements OnInit {

  constructor(private toastr: ToastrService, private quizService: QuizFuncService, private spin: NgxSpinnerService, private router: Router,private questionService : QuestionFuncService) { }

  category : any = {}
  questions : any = {}
  numquestion : any = Number

  ngOnInit(): void {
    let title = sessionStorage.getItem("title")
    let categoryId = sessionStorage.getItem("categoryid")
    if(title == null || categoryId == null) {
      Swal.fire("Error","Something is wrong","error")
      this.router.navigateByUrl("/admin/listcategory")
    } else{
      this.spin.show().then(()=>{
        this.quizService.getCategory(title).subscribe((resp)=>{
          if(resp.status == 200){
            this.spin.hide()
            console.log(resp);
            this.category = resp.data
          } else {
            this.spin.hide()
            this.toastr.error("Something is wrong")
            this.router.navigateByUrl("/admin/listcategory")
          }
        })   
      })
      this.spin.show().then(()=>{
        this.questionService.showQuestions(categoryId).subscribe((resp)=>{
          if(resp.status == 200){
            this.spin.hide()
            this.questions = resp.data
          } else {
            this.spin.hide()
            console.log("error log" , resp);
            this.toastr.error("Something is wrong")
            this.router.navigateByUrl("/admin/listcategory")
          }
        })
      })
      this.spin.show().then(()=>{
        this.quizService.getNumberOfQuestions(categoryId).subscribe((resp)=>{
          if(resp.status == 200){
            this.spin.hide()
            this.numquestion = resp.data
          } else {
            this.spin.hide()
            this.toastr.error("Something is wrong")
            this.router.navigateByUrl("/admin/listcategory")
          }
        })
      })
    }

  }

  addQuestion(){
    sessionStorage.setItem("categoryid",this.category._id)
    this.router.navigateByUrl("/admin/addquestion")
  }

  updateQuestion(id: any){
    sessionStorage.setItem("questionid",id)
    this.router.navigateByUrl("/admin/editquestion")
  }
  

}
