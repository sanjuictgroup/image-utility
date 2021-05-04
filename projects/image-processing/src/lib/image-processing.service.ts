import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  redirectUrl: string;
  currentUser: string;
  response: string;

  constructor(public http:HttpClient) { }

  header = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*, http://localhost:4200',
    'Authorization': 'Bearer ' + localStorage.getItem('currentUser')
 });

  saveImageCropped(data):Observable<any>{
    this.setHeader();
    return this.http.post(`http://localhost:3000/api/v1/imageSaveCropped`, data, { headers: this.header }).pipe(
      catchError(this.errorMgmt)
    );
  }

  saveImageAfterCanvas(data):Observable<any>{
    this.setHeader();
    return this.http.post(`http://localhost:3000/api/v1/imageSaveCanvased`, data, { headers: this.header }).pipe(
      catchError(this.errorMgmt)
    );
  }

  setHeader(){
      if(localStorage.getItem('currentUser')){
        let token = localStorage.getItem('currentUser');
        this.header = new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*, http://localhost:4200',
          'Authorization': 'Bearer ' + token
        });
      }else{
        return 'empty';
      }
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    console.log('error',error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    throw new Error("my error message"+errorMessage);
    console.log(error.message);
    return throwError(errorMessage);
  }
}
