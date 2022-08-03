import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then((data)=>{
  console.log(data);
  const initialContainerElement:HTMLElement = document.getElementById('intialContainer')!;
  console.log(initialContainerElement)
  if(initialContainerElement)
  {
    initialContainerElement.remove();
  }
})
  .catch(err => {

    console.log(err);
    const initialElement:HTMLElement = document.getElementById('intialView')!;
    initialElement.textContent="Looks like our servers are down :(. We wont be able to serve you for now"
    initialElement.classList.remove("loading")
    initialElement.classList.add("error")
  });
