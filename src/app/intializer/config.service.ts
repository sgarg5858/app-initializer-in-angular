import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, tap, throwError } from 'rxjs';

export interface Config{
  baseUrl:string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private httpClient:HttpClient) { }

  private baseUrlBehaviorSubject= new BehaviorSubject<Config|null>(null);
  public readonly baseUrl$ = this.baseUrlBehaviorSubject.asObservable().pipe(
    filter((config:Config|null)=> config!==null),
    map((config:Config|null)=>config?.baseUrl)
  );

  fetchEndPoints()
  {
    return this.httpClient.get<Config>('../../assets/config.json')
    .subscribe({
      next: (config:Config)=>{
        console.log(config);
        this.baseUrlBehaviorSubject.next(config)
      },
      error:(error)=>{
        //fallback url or add some error property
        // this.baseUrlBehaviorSubject.next({baseUrl:""})
        this.baseUrlBehaviorSubject.error("Can't reach the servers")
      }
    })
  }
}
