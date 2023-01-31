import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';



const routes: Routes = [
  {
    path: 'main', canLoad: [AuthGuard], loadChildren: () => import('./main/main.module').then(mod => mod.MainModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
