import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId: any;
  quizzes: any;
  constructor(private _route: ActivatedRoute, private quiz: QuizService) { }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.catId = params['catId'];
      if (this.catId == 0) {
        console.log('load all the quiz');
        this.quiz.getActiveQuizess().subscribe((data) => {
          this.quizzes = data;
          console.log(this.quizzes);
        },
          (error) => {
            console.log(error);
            alert('error in loading quizzess');
          }
        )
  
      } else {
        console.log('load specific quiz');
        console.log(this.catId);
        this.quiz.getActiveQuizzesOfCategory(this.catId).subscribe((data)=>{
          this.quizzes=data;
        },
        (error)=>{
          alert('error in loading quizzess');
        })
      }
    });

  }
  // this.catId=this._route.snapshot.params['catId'];


}


