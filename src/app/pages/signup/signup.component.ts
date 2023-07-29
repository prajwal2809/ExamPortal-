import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private userService:UserService,private snack:MatSnackBar) {}

  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:''
  }

  formSubmit(){
    console.log(this.user)
    if ( this.user.username==''||this.user.username==null){
      // alert("this is required");
      this.snack.open("Username is required !!",'',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'right'
      });
      return;
    }
    
    // validate 


    // this.user=new FormGroup({
    //   name: new FormControl(this.user.username,[
    //     Validators.required,
    //     // Validators.pattern()
    //     Validators.minLength(4),

    //   ])

    // })


    //  we will call addUser function to store data in database 
    //  addUser : userservice
    this.userService.addUser(this.user).subscribe(
      (data:any) => {
        console.log(data);
        // alert('success');
        Swal.fire('Successfully  done !!','User Id is '+data.id,'success');
      },
      (error) => {
        console.log(error);
        // alert('something went wrong');
        this.snack.open('something went wrong!!','',{
          duration:300

        })
      }
    );
  }
}

