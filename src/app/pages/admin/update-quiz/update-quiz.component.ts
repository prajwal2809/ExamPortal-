import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import baseUrl from 'src/app/services/helper';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit{


  qid = 0;
  quiz: any;
  categories:any;
  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _cat :CategoryService,private _router:Router){}

  ngOnInit(): void {
  this.qid = this._route.snapshot.params['qid'];
  // alert(this.qid);
  this._quiz.getQuiz(this.qid).subscribe((data:any)=>{
    this.quiz=data;
    console.log("this is under quiz");
    console.log(this.quiz);
  },
  (error)=>{
    console.log(error);
  });

  this._cat.getCategories().subscribe((data:any)=>{
    this.categories=data;
    console.log(this.categories);

  },
  (error)=>{
    console.log(error);
  });
      
  }


  public updateData(){
    this._quiz.updateQuiz(this.quiz).subscribe((data:any)=>{
      Swal.fire("Success !!",'quiz updated ','success').then((e)=>{
        this._router.navigate(['/admin/quizzes']);
      });

    },
    (error)=>{
      Swal.fire("Error",'error in updating quiz','error');
      console.log(error);
    }
    );
  }

}
