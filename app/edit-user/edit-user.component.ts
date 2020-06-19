import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  udata:any;
  constructor(private route: ActivatedRoute , private afs: AngularFirestore, 
    private router: Router){ }
  fname='';
  lname='';
  age='';
  pic='';
  listAvtar=false;
  objAvtar=[
    {a:'https://firebasestorage.googleapis.com/v0/b/pro-crud.appspot.com/o/avtar%2Fb1.png?alt=media&token=f97b31d6-00ed-4bb6-be72-2c36879f03c8'},
    {a:'https://firebasestorage.googleapis.com/v0/b/pro-crud.appspot.com/o/avtar%2Fb2.png?alt=media&token=d2a0a7f5-a813-4753-ac39-5001fbf50f4d'},
    {a:'https://firebasestorage.googleapis.com/v0/b/pro-crud.appspot.com/o/avtar%2Fg1.png?alt=media&token=780cd27b-cad5-4b60-8170-32171a6c7bda'},
    {a:'https://firebasestorage.googleapis.com/v0/b/pro-crud.appspot.com/o/avtar%2Fg2.png?alt=media&token=3eac3371-4ea1-4ba9-b1d4-e62b00fd223a'},
    {a:'https://firebasestorage.googleapis.com/v0/b/pro-crud.appspot.com/o/avtar%2Fg3.png?alt=media&token=441fd240-49d1-4f48-aae0-e6bd3dedce16'},
    {a:'https://firebasestorage.googleapis.com/v0/b/pro-crud.appspot.com/o/avtar%2Fg4.png?alt=media&token=033f015a-ed88-4e3e-a4d8-31b541a5f808'},
    {a:'https://firebasestorage.googleapis.com/v0/b/pro-crud.appspot.com/o/avtar%2Fna.png?alt=media&token=24b784c9-bf82-4baf-814f-30927051ce47'},
  ];
  id='';
  ngOnInit(): void {
    this.route.queryParams.subscribe((param)=>{
      this.udata=JSON.parse(atob(param.data));
      this.lname=this.udata.data.fname;
      this.fname=this.udata.data.lname;
      this.age=this.udata.data.age;
      this.pic=this.udata.data.pic;
      this.id=this.udata.id;
      console.log(this.udata);
      console.log(typeof(this.udata));
    });
    console.log(this.udata);
  }
  changePic(url){
    this.pic=url;
    }
  updateUser(){
    this.afs.doc('users/'+this.id).update({
      pic:this.pic,
      fname:this.fname,
      lname:this.lname,
      email:this.fname+'4'+this.lname+'@gmail.com',
      age:this.age});

    alert('Update Successfull !!');
    this.fname='';
    this.lname='';
    this.age='';
  }
  back(){
    this.router.navigate(['home']);
  }

}
