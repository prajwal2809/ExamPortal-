import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  categories:any
  constructor(private category:CategoryService,private _snak:MatSnackBar){}

  ngOnInit(){
    this.category.getCategories().subscribe((data)=>{
        this.categories=data;
    },
    (error)=>{

      this._snak.open("Error in loading categories from server",'',{
        duration:3000,
      });
      console.log(error);
    }
    
    )
  }

}
