import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { ConfigService } from './intializer/config.service';

export interface Comment{
  "postId": number;
  "id": number;
  "name": string;
  "email": string;
  "body":string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  baseUrl:string="";

  constructor(private httpClient:HttpClient,private configService:ConfigService) {
    //get base url

    this.configService.baseUrl$.pipe(take(1)).subscribe((baseUrl:string|undefined)=>{
      if(baseUrl!=undefined)
      {
        this.baseUrl=baseUrl;
      }
    })

   }

   private commentsSubject = new BehaviorSubject<Comment[]|null>(null);
   public readonly comments$ = this.commentsSubject.asObservable();


  getComments()
  {
    this.httpClient.get<Comment[]>(`${this.baseUrl}comments`).subscribe((comments:Comment[])=>{
      this.commentsSubject.next(comments)
    },(error)=>{
      this.commentsSubject.next([]);
    })
  }
}
