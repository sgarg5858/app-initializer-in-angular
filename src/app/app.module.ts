import { fn } from '@angular/compiler/src/output/output_ast';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { interval, take } from 'rxjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntializerModule } from './intializer/intializer.module';
import {HttpClientModule} from '@angular/common/http';
import { CommentsComponent } from './comments/comments.component';
import { CommentComponent } from './comment/comment.component'


@NgModule({
  declarations: [
    AppComponent,
    CommentsComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IntializerModule,
    HttpClientModule
  ],
  providers: [
    {
      provide:APP_INITIALIZER,
      multi:true,
      useValue:()=>{
        console.log("Hooking into APP initialization process");
        return interval(1000).pipe(take(1))
      },
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
