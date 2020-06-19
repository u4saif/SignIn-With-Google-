import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './add-user/add-user.component';
 
import { EditUserComponent } from './edit-user/edit-user.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"home", component:HomeComponent, canActivate:[AngularFireAuthGuard]},
  {path:"home/userinfo", component:UserComponent, canActivate:[AngularFireAuthGuard]},
  {path:"home/adduser", component: AddUserComponent, canActivate:[AngularFireAuthGuard]},
  {path:"home/edituser", component:EditUserComponent, canActivate:[AngularFireAuthGuard]},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
