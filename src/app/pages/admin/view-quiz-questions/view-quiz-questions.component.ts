import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qid=0;
  qTitle:any;
  questions:any;
  constructor(private _route:ActivatedRoute,private question:QuestionService,private snack:MatSnackBar){}
   

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    console.log("the qid is "+this.qid);
    console.log(this.qTitle);
    this.question.getQuestionsOfQuiz(this.qid).subscribe((data:any)=>{
      console.log(data);
      this.questions=data;
      console.log(this.questions)
    },    
    (error)=>{  
      console.log(error);
    }
    ) 

  }

  deleteQuestion(questionId:any){

    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title:'Are you sure , want to delete this question'
    }).then((result=>{
        if(result.isConfirmed){
          this.question.deleteQuestion(questionId).subscribe((data)=>{
            this.snack.open('Question Deleted','',{
              duration: 3000,
            });

            this.questions=this.questions.filter((q:any) => {
              return q.quesId != questionId;
            },
            (error: any)=>{
              this.snack.open('Error in deleting questions','',{
                duration:3000,
              });
              console.log(error);
            }
            
            );
          })

        }
    }))
    // this.question.deleteQuestion(questionId)
  }
}
