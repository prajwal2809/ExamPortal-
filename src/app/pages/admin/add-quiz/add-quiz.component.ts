import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import baseUrl from 'src/app/services/helper';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent {

  constructor(private category:CategoryService,private quiz:QuizService,private snak :MatSnackBar){}

  categories:any;

  quizdata={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:'',
    },
  };

  ngOnInit():void {
    this.category.getCategories().subscribe(
      (data:any)=>{
        this.categories=data;
        console.log(this.categories);
      },
      (error: any)=>{
        console.log(error)
        Swal.fire('Error !!','Serve error','error');
      });
  }

  addQuiz(){
    if(this.quizdata.title.trim() == '' || this.quizdata.title==null){

      console.log("insdie add quiz")
      this.snak.open('Title Required !!', '',{
        duration:3000,
      });
      return;
    }

    this.quiz.addQuiz(this.quizdata).subscribe(
      (data: any) => {
        Swal.fire("Success !!", 'Quiz is added succcessfully', 'success');
          this.quizdata.title='',
          this.quizdata.description='',
          this.quizdata.maxMarks='',
          this.quizdata.numberOfQuestions='',
          this.quizdata.active=false,
          this.quizdata.category={
            cid:'',

          };
      },
      (error: any)=>{
        console.log(error)
        Swal.fire('Error !!','Error while adding quiz','error');
      });

  }


}
