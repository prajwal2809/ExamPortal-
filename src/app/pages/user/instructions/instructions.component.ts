import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit{

  qid:any;
  quiz:any;
  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private router:Router){}

  ngOnInit():void{
    this.qid=this._route.snapshot.params['qid'];
    console.log(this.qid);


    this._quiz.getQuiz(this.qid).subscribe((data:any)=>{
      this.quiz = data 
        console.log(data);
    },
    (error)=>{
      console.log(error);
    }
    
    )
  }


  startQuiz()
  {
    Swal.fire({


      title: 'Do you want to start the quiz',
      showCancelButton: true,
      confirmButtonText:`Start`,
      denyButtonText: `Don't save`,
      icon:`info`

      // title: 'Do you want to start the quiz?',
      // text: "You won"t be able to revert this!",
      // icon: 'info',
      // showCancelButton: true,
      // confirmButtonText: `Start`
      }).then((result) =>{
      if (result.isConfirmed) {
            this.router.navigate(['/start/'+this.qid]);
          
      }
      else if (result.isDenied){
        Swal.fire('Changes are not saved','','info');
      }
  });
  }

}
