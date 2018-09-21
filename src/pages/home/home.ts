import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseDatabaseProvider } from '../../providers/firebase-database/firebase-database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  messageText: string;
  messages: Observable<Array<any>>;

  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseDatabaseProvider) {
    this.messages = firebaseProvider.getMessages();
  }

  pushMessage(message: string){
    this.firebaseProvider.pushMessage(message);
  }

}
