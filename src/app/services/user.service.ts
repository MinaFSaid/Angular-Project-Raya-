import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public _AngularFirestore: AngularFirestore) { }

  addUser(user: User){
    user.uid = this._AngularFirestore.createId()
    return this._AngularFirestore.collection('/User').add(user)
  }

  getAllUser(){
    return this._AngularFirestore.collection('/User').snapshotChanges()
  }

  deleteUser(user:User){
    return this._AngularFirestore.doc('/User/'+ user.uid).delete()
  }

  updateUser(user:User){
    this.deleteUser(user)
    this.addUser(user)
  }

  // updateUser(){
  //   this._AngularFirestore.collection('/User').doc(this._AngularFirestore)
  // }
}
