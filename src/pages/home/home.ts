import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { FirebaseDatabaseProvider } from '../../providers/firebase-database/firebase-database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  messageText: string;
  name: string;
  messages: Observable<Array<any>>;

  constructor(public navCtrl: NavController, public firebase: FirebaseDatabaseProvider, public toasts: ToastController) {
    this.name = firebase.getUsername();
    this.messages = firebase.getMessages();
  }

  pushMessage(){
    if(this.messageText)
      this.firebase.pushMessage(this.messageText);
    else
      this.toasts.create({
        message: "Message cannot be empty",
        duration: 3000,
        position: "bottom"
      }).present();
  }

  nameChange(){
    this.firebase.setUsername(this.name);
  }

  public niceDate(dateString: string){
    let date = new Date(dateString);
    if(date.toDateString() == new Date().toDateString())
      return date.toLocaleTimeString();
    return date.toLocaleDateString();
  }

}
