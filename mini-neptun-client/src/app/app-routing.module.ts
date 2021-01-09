import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: 'user', component: UserComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'subjects', component: SubjectsComponent},
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: '404', component: PagenotfoundComponent},
    {path: '**', redirectTo: '404', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
