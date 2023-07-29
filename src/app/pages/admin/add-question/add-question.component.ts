import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';  
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import  ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit{
  public Editor = ClassicEditor;

  qid:any;
  qTitle:any
  question={
    quiz:{
      qid:'',
      // title:''
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  };
  constructor(private route:ActivatedRoute,private _question:QuestionService){}


  ngOnInit(): void {
    this.qid=this.route.snapshot.params['qid'];
    this.qTitle=this.route.snapshot.params['title'];
    console.log(this.qid);
    this.question.quiz['qid']=this.qid;

  }

  formSubmit(){

    console.log("under form submit ")
    if(this.question.content.trim()=='' || this.question.content==null){
      return
    }
    if(this.question.option1.trim()=='' || this.question.option1==null){
      return
    }
    if(this.question.option2.trim()=='' || this.question.option2==null){
      return
    }
    // if(this.question.option3.trim()=='' || this.question.option3!=null){
    //   return
    // }
    // if(this.question.option4.trim()=='' || this.question.option4!=null){
    //   return
    // }

    
    this._question.addQuestionsofQuiz(this.question).subscribe((data:any)=>{
      console.log("under function")
      Swal.fire('Success','Question Added. Add another one ','success');
      this.question.content='';
      this.question.option1='';
      this.question.option2='';
      this.question.option3='';
      this.question.option4='';
      this.question.answer='';
    },
    (error)=>{
      Swal.fire('Error','Error in adding question','error');
    }
    )
    
  }
}
