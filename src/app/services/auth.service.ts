import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../Interfaces/user';

import { UserService } from './user.service';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, observable,  } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isUserLoggedSub: BehaviorSubject<boolean>;
  userData: any;
  // userDetails!: FormGroup;
  userList: User[] = [];
  userObj: User = {
    uid: '',
    fullName: '',
    email: '',
    phoneNumber: '',
  };
  uid: string = '';
  fullName: string = '';
  email: string = '';
  phoneNumber: string = '';

  constructor(
    public _AngularFireAuth: AngularFireAuth,
    public _AngularFirestore: AngularFirestore,
    public router: Router,
    public _ngZone: NgZone,
    public _User: UserService
  ) {

    this.isUserLoggedSub= new BehaviorSubject<boolean>(this.isUserLoggedIn)
    this._AngularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  SignIn(email: string, password: string) {
    localStorage.setItem('token','user')
    this.isUserLoggedSub
    return this._AngularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this._ngZone.run(() => {
          this.router.navigate(['Dashboard']);
        });
        this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this._AngularFirestore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      password: user.password,
      email: user.email,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this._AngularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result: any) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.setUserData(result.user);
        console.log(result);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this._AngularFireAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['VerifyEmail']);
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this._AngularFireAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in and email is verified
  get isUserLoggedIn() {
    return localStorage.getItem('token')?true:false;
  }
  getLoggedStatus():Observable<boolean>{
    return this.isUserLoggedSub.asObservable();
  }
  SignOut() {
    return this._AngularFireAuth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['Login']);
    });
  }
  getAllUser() {
    this._User.getAllUser().subscribe(
      (res) => {
        this.userList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.uid = e.payload.doc.id;
          return data;
        });
      },
      (err) => {
        alert('Error while fetching user data');
      }
    );
  }

  restForm() {
    this.uid = '';
    this.fullName = '';
    this.email = '';
    this.phoneNumber = '';
  }
  addUser() {
    if (this.fullName == '' || this.email == '' || this.phoneNumber == '') {
      alert('Fill all fields');
      return;
    }
    this.userObj.uid = this.uid;
    this.userObj.fullName = this.fullName;
    this.userObj.email = this.email;
    this.userObj.phoneNumber = this.phoneNumber;

    this._User.addUser(this.userObj);

    this.restForm();
  }
  // getUserByID(id: any) {
  //   this;
  // }
  // editUaer(user: User) {
  //   this.userDetails.controls['id'].setValue(user.uid);
  //   this.userDetails.controls['name'].setValue(user.fullName);
  // }

   updateUser() {
    // this.userObj.uid = this.userDetails.value.id;
    // this.userObj.fullName = this.userDetails.value.name;

    // this._User.updateUser(this.userObj).subscribe(
    //   (res:any) => {
    //     console.log(res);
    //     this.getAllUser();
    //   },
    //   (err:any) => {
    //     console.log(err);
    //   }
    // );
  }

  deleteUser(user: User) {
    if (window.confirm('Are you sure you want to delete ' + user.fullName)) {
      console.log(user);

      this._User.deleteUser(user);
    }
  }
}
