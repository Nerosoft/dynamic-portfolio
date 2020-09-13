import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { user } from './user';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
@Injectable({
  providedIn: 'root'
})
export  class userServes {
 
    private dbPath = 'users';
   
    usersRef: AngularFireList<user> = null;
 
    constructor(private db: AngularFireDatabase) {

      this.usersRef = db.list(this.dbPath);
    }

    getUsersList(): AngularFireList<user> {
      return this.usersRef;
    }

    getUsersObject(callback) {
      this.db.object(this.dbPath).valueChanges().subscribe((users:user)=>callback(Object.keys(users)))
    }
   
    getUsersLogin() {
      return this.db.object(this.dbPath).valueChanges()
    }
  }