import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories:any
  //   {
  //     cid:23,
  //     title:'programming',
  //     description:'this is testing category',
  //   },
  //   {
  //     cid:24,
  //     title:'GK',
  //     description:'this is testing category',
  //   },
  //   {
  //     cid:23,
  //     title:'political',
  //     description:'this is testing category',
  //   },
  //   {
  //     cid:34,
  //     title:'Sports',
  //     description:'this is testing category',
  //   },
  //   {
  //     cid:34,
  //     title:'Sports',
  //     description:'this is testing category',
  //   },
  //   {
  //     cid:34,
  //     title:'Sports',
  //     description:'this is testing category',
  //   },
  //   {
  //     cid:34,
  //     title:'Sports',
  //     description:'this is testing category',
  //   },
  
  
  constructor(private category:CategoryService,private router:Router){
     
  }
  ngOnInit(): void {

    this.category.getCategories().subscribe((data:any)=>{

      this.categories = data,
      console.log(this.category);

    },
    
    (error: any)=>{
      console.log(error)
      Swal.fire('Error !!','Error in loading data','error');
    });
    
    
  
  }


}
