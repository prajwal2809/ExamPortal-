import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private login:LoginService,private snack:MatSnackBar,private router :Router) {}
  loginData={
    username:'',
    password:'' 
  };
  ngOnInit(): void {
    
  }

  formSubmit(){
    console.log(this.loginData);
    console.log("log in button clicked");
    if(this.loginData.username.trim() == '' || this.loginData.username == null ){
        this.snack.open("Username is required !!",'',{
          duration:3000,
        });
        return;
    }
    if(this.loginData.password.trim() == '' || this.loginData.password == null ){
      this.snack.open('Password is required !!','',{
        duration:3000,
      });
      return;
    }
      // request server to generate token

    this.login.generateToken(this.loginData).subscribe(
      (data:any) => { 
        console.log('success');
        console.log(data);
        // login 
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);
            if ( this.login.getUserRole()=="Admin"){
              // window.location.href='/admin';
              this.router.navigate(['admin']);
              this.login.loginStatusSubject.next(true);
                // ADMIN BASHBOARD
            }else if(this.login.getUserRole()=='Normal'){
                // LOGIN DASHBOARD
                // window.location.href='/user-dashboard';
                this.login.loginStatusSubject.next(true);
                this.router.navigate(['user-dashboard/0']);
            }else{
              // 
              this.login.logout();
            }
          }
        )
      }, 
      (error) => {
      console.log('Error !');
      console.log(error);
      this.snack.open("Invalid Details !! Try again ",'',{
        duration:3000
      })
      }
    );
  }
}
