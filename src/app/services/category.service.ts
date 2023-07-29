import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient)  { }

  category:any;


  getCategories(): Observable<any>{
    return this.http.get<any>(`${baseUrl}/category/`)
  }
  // public getCategories(){
  //   this.http.get(`${baseUrl}/category/`)
  // }

  // public addCategory(category: any){
  //   this.http.post(`${baseUrl}/category`,category)
  // }

  
  // addCategoryy(): Observable<any>{
    
  //   return this.http.post<any>(`${baseUrl}/category/`,this.category)
  // }

  addCategory(category: any): Observable<any> {
    // Make the HTTP request to add the category and return the Observable
    return this.http.post<any>(`${baseUrl}/category/`, category);
  }




}
