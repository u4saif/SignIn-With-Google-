import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from 'firebase';
import {ActivatedRoute, Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
 
interface Users{
  fname:string,
  lname:string,
  email:string,
  age:string
}

interface UserId extends Users{
  id:string;
}
 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  UserCol:AngularFirestoreCollection<Users>;
   

  users:any;
  pro:any;
  profilename;
  profilePic;
 
  UserDoc:AngularFirestoreDocument<User>;
  
  user:Observable<User>;
  
 
   constructor(private afs: AngularFirestore ,private db: AngularFirestore,
    private router:Router,
    private route:ActivatedRoute,
    private auth:AngularFireAuth){ }

  ngOnInit(){
    this.profilename = firebase.auth().currentUser.displayName; //To get the current Looged in user detail
    this.profilePic = firebase.auth().currentUser.photoURL; //To get the current Looged in user detail
    
    this.UserCol=this.afs.collection('users');
     //this.users=this.UserCol.valueChanges();
    this.users=this.UserCol.snapshotChanges()
    .map(actions=> {
      return actions.map(a => {
        const data = a.payload.doc.data() as Users;
        const id = a.payload.doc.id;

        //console.log(id,data);
        return { id, data };
      })
    });
     
  }

  getId(UserId){
   
    this.router.navigate(['home/userinfo'],{queryParams:{id:btoa(JSON.stringify(UserId))}
     });
    
  }

  editId(u){
    this.router.navigate(['home/edituser'],{queryParams:{data:btoa(JSON.stringify(u))}
  });
  }
  delete(u){
    console.log('Delte start');
    this.afs.doc('users/'+u.id).delete();
    console.log('Delte end');
  }

  logout(){
    this.auth.signOut().then(()=>this.router.navigate(['']));
  }

}
