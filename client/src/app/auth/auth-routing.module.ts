import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAuthComponent } from './home-auth/home-auth.component';
import { LoginComponent } from './login/login.component';




const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeAuthComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
