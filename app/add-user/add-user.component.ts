import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore}  from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

interface User{ 
  fname:string,
  lname:string,
  age:string
}
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  title = 'test-crud';
  showavtar=false;
    objAvtar=[
      {a:'https://firebasestorage.googleapis.com/v0/b/pro-crud.appspot.com/o/avtar%2Fb1.png?alt=media&token=f97b31d6-00ed-4bb6-be72-2c36879f03c8'},
      {a:'https://firebasestorage.googleapis.com/v0/b/pro-crud.appspot.com/o/avtar%2Fb2.png?alt=media&token=d2a0a7f5-a813-4753-ac39-5001fbf50f4d'},
      {a:'https://firebasestorage.googleapis.com/v0/b/pro-crud.appspot.com/o/avtar%2Fg1.png?alt=media&token=780cd27b-cad5-4b60-8170-32171a6c7bda'},
      {a:'https://firebasestorage.googleapis.com/v0/b/pro-crud.appspot.com/o/avtar%2Fg2.png?alt=media&token=3eac3371-4ea1-4ba9-b1d4-e62b00fd223a'},
      {a:'https://firebasestorage.googleapis.com/v0/b/pro-crud.appspot.com/o/avtar%2Fg3.png?alt=media&token=441fd240-49d1-4f48-aae0-e6bd3dedce16'},
      {a:'https://firebasestorage.googleapis.com/v0/b/pro-crud.appspot.com/o/avtar%2Fg4.png?alt=media&token=033f015a-ed88-4e3e-a4d8-31b541a5f808'},
      {a:'https://firebasestorage.googleapis.com/v0/b/pro-crud.appspot.com/o/avtar%2Fna.png?alt=media&token=24b784c9-bf82-4baf-814f-30927051ce47'},
    ];
    constructor(private afs: AngularFirestore, private route: Router) { }
  
  fname='';
  lname='';
  age='';
  pic='https://firebasestorage.googleapis.com/v0/b/pro-crud.appspot.com/o/pic.png?alt=media&token=b0acc4ce-11a8-4bb3-8d24-75b77302dea8';
  UserCol:AngularFirestoreCollection<User>;
  user:Observable<User[]>
 
  ngOnInit() {
    this.UserCol=this.afs.collection('user');
    this.user=this.UserCol.valueChanges();
  }
  addUser(){
    if(this.fname==undefined || this.fname=='' || this.age==undefined || this.age=='') {return alert('All filed are Required');}
    console.log('Hi')
    this.afs.collection('users').add({'fname':this.fname,'lname':this.lname,'email':this.lname+"."+this.fname+"@gmail.com",'age':this.age,'pic':this.pic});
    alert('User Created Sucessfully!');
    this.fname='';
    this.lname='';
    this.age='';

  }
  changePic(url){
  this.pic=url;
  }

  back(){
    this.route.navigate(['home']);
  }
}
