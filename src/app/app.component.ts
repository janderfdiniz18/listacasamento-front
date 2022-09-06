import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'listacasamento-front';
  showFiller = false;
  onkeypress(event: any){
    if(event.charCode == 99){}
  }
  
}
