import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  qid: any;
  questions: any;
  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  isSubmit = false;
  timer: any;

  constructor(private locationst: LocationStrategy, private _route: ActivatedRoute, private question: QuestionService) { }
  ngOnInit(): void {

    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];
    console.log(this.qid);
    this.loadQuestions();


  }
  loadQuestions() {
    this.question.getQuestionsOfQuizForTest(this.qid).subscribe((data: any) => {
      this.questions = data;
      this.timer = this.questions.length * 2 * 60;
      console.log(this.timer)
 
      console.log("under the loadQuestions ")
      console.log(this.questions);
      this.startTimer();

    },
      (error) => {
        console.log(error);
        Swal.fire("Error", "Error in loading questions of quiz", 'error')
      }
    )
  }



  preventBackButton() {

    history.pushState(null, "null", location.href);

    this.locationst.onPopState(() => {
      history.pushState(null, "null", location.href);
    });

  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz',
      showCancelButton: true,
      confirmButtonText: `Submit`,
      icon: `info`

    })
    .then((e)=>{

     
      if(e.isConfirmed){
        // this.isSubmit=true;
        this.evalQuiz();
    //     // calcuclation
    //     this.questions  .forEach((q:any)=>{
    //         if(q.givenAnswer==q.answer){
    //           this.correctAnswers+=1;
    //           let marksSingle = this.questions[0].quiz.maxMarks/this.questions.length;
    //           this.marksGot += marksSingle;
    //         }
    //         if(q.givenAnswer.trim()!=''){
    //           this.attempted+=1;
    //         }
    //     })
    //   console.log("correct answers : " + this.correctAnswers);
    //   console.log("Marks got : " + this.marksGot);
    //   console.log("Attempted :" + this.attempted);
    //   }
    }
    })
      
  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.submitQuiz()
        clearInterval(t);
      } else {
        this.timer -= 1;
      }
    }, 1000)
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`

  }


  evalQuiz() {



    this.question.evalQuiz(this.questions).subscribe((data:any)=>{
      console.log(data);
      this.marksGot=parseFloat(Number(data.marksGot).toFixed(2));
      this.correctAnswers=data.correctAnswers;
      this.attempted=data.attempted;
      this.isSubmit=true;
    },
    (error)=>{
      console.log(error);
    })
    // this.isSubmit = true;
    // calcuclation
  //   this.questions  .forEach((q:any)=>{
  //   if (q.givenAnswer == q.answer) {
  //     this.correctAnswers += 1;
  //     let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
  //     this.marksGot += marksSingle;
  //   }
 
   // })
  //   console.log("correct answers : " + this.correctAnswers);
  //   console.log("Marks got : " + this.marksGot);
  //   console.log("Attempted :" + this.attempted);
  }

  printPage(){
    window.print();
  }
}
