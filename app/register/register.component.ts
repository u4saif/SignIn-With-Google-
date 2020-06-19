import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username;
  password;
  fname;
  lname;
  nopic='https://firebasestorage.googleapis.com/v0/b/pro-crud.appspot.com/o/avtar%2Fna.png?alt=media&token=24b784c9-bf82-4baf-814f-30927051ce47';
  constructor(private auth: AngularFireAuth, private route:Router, private afs: AngularFirestore) { }

  ngOnInit(): void {
  }
  login( ){
    console.log(this.username);
    console.log(this.password);
   
    this.auth.createUserWithEmailAndPassword(this.username,this.password)
    .then((userdata)=> {
      if(this.afs.doc(`users/${userdata.user.uid}`)){
        this.afs.doc(`users/${userdata.user.uid}`).set({'fname':this.fname,'lname': this.lname,'email': this.username,'age': userdata.user.uid,'pic':this.nopic });
        alert('User update Sucessfully!');}
        this.route.navigate(['home'])})

    .catch((data)=>{console.log(data);alert(data.message)});

  }
  
  back(){
    this.route.navigate(['']);
  }

  fnamechange(fname){
    this.fname=fname.viewModel;
    console.log(fname.viewModel);
  }
  lnamechange(lname){
    this.lname=lname.viewModel;
  }
  emailchange(username){
    this.username=username.viewModel;
  }
  passwordchange(password){
    this.password=password.viewModel;
    console.log(this.password);
  }
}
