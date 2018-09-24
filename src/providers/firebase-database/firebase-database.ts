import { Injectable } from '@angular/core';

import firebase from 'firebase/app';
import 'firebase/database';
import { Subject } from 'rxjs/Subject';

/*
  Generated class for the FirebaseDatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseDatabaseProvider {

  username: string = "Anonymous";
  messageSubject: Subject<Array<any>> = null;
  userID: string;

  constructor() {
    var config = {
      // TODO: Replace with your project's customized code snippet
    };
    firebase.initializeApp(config);
  }

  public setUsername(username: string){
    this.username = username;
    firebase.database().ref('users/' + this.getUser()).set({
      username: username
    });
  }

  public getUsername(){
    return this.username;
  }

  public pushMessage(message: String){
    var newPostKey = firebase.database().ref().child('posts').push().key;
    var updates = {};
    updates['/posts/' + newPostKey] = {message: message, date: new Date(), sender: this.getUser(), senderName: this.username};

    firebase.database().ref().update(updates, function(e){ console.error(e) });
  }

  public getMessages(){
    if(this.messageSubject === null){
      this.messageSubject = new Subject();

      var subject = this.messageSubject;
      
      var postsRef = firebase.database().ref('/posts/');
      postsRef.on('value', function(snapshot) {
        const arr = snapshot.val();
        if(arr !== null)
          subject.next(Object.keys(arr).map(n => arr[n]));
      });
      
      this.messageSubject.unsubscribe = function(){
        postsRef.off();
      }
    }
    return this.messageSubject.asObservable();
  }

  private getUser(): string {
    if(!this.userID)
      this.userID = firebase.database().ref().child('users').push().key;
    return this.userID;
  }
}
