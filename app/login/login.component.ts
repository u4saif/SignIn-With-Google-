import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { Router } from '@angular/router';
import {auth} from 'firebase';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
interface User{ 
  fname:string,
  lname:string,
  age:string
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private auth: AngularFireAuth, private route: Router, private afs: AngularFirestore) { }
  username;
  password;
  UserCol:AngularFirestoreCollection<User>;
  user:Observable<User[]>
  ngOnInit(): void {
  }
  login( ){
    console.log(this.username);
    console.log(this.password);
    
    this.auth.signInWithEmailAndPassword(this.username,this.password)
    .then(()=> this.route.navigate(['home']))
    .catch((data)=>{console.log(data);alert(data.message)});

  }
  async googleSignin(){
    var provider = new auth.GoogleAuthProvider();

    this.auth.signInWithPopup(provider)
    .then((userdata)=>{ console.log(userdata);
     if(this.afs.doc(`users/${userdata.user.uid}`)){
    this.afs.doc(`users/${userdata.user.uid}`).set({'fname': userdata.user.displayName.split(" ")[0],'lname': userdata.user.displayName.split(" ")[1],'email': userdata.user.email,'age':userdata.user.uid,'pic':  userdata.user.photoURL});
    alert('User update Sucessfully!');
    }
    else {
      this.afs.collection(`users/${userdata.user.uid}`).add({'fname': userdata.user.displayName.split(" ")[0],'lname': userdata.user.displayName.split(" ")[1],'email': userdata.user.email,'age':userdata.user.uid,'pic':  userdata.user.photoURL});
      alert('User Created Sucessfully!');
    };
    this.route.navigate(["home"])})
    .catch((data)=>alert(data.message));

}
email(username){
  this.username=username.viewModel;
}
pass(password){
  this.password=password.viewModel;
}
}
