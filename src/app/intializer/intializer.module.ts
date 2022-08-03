import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './config.service';
import { take } from 'rxjs';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    {
      provide:APP_INITIALIZER,
      multi:true,
      // useFactory takes input function and executes it
      // and APP_INITIALIZER also needs a function. so 
      //we return a function from factory function
      useFactory : (configService:ConfigService) =>{
        return () =>{
          configService.fetchEndPoints();
          return configService.baseUrl$.pipe(take(1));
        }
      },deps:[ConfigService]
    },
  ]
})
export class IntializerModule { }
