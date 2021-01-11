import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { BuildingsComponent } from './buildings/buildings.component';
import { AnonymGuard } from './core/guards/anonym.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SubjectComponent } from './subjects/subject/subject.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { UserComponent } from './user/user.component';
import { UsersubjectsComponent } from './user/usersubjects/usersubjects.component';

const routes: Routes = [
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'user/subjects', component: UsersubjectsComponent, canActivate: [AuthGuard]}, //TODO: GUARD BEÁLLÍTÁSA, HOGY ADMIN NE TUDJA MEGNYITNI
  {path: 'buildings', component: BuildingsComponent, canActivate: [AuthGuard]}, // NEM FOG MUKODNI A .post /buildings
  {path: 'auth', component: AuthComponent, canActivate: [AnonymGuard]},
  {path: 'subjects', component: SubjectsComponent, canActivate: [AuthGuard]},
  {path: 'subjects/:id', component: SubjectComponent},
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: '404', component: PagenotfoundComponent},
  {path: '**', redirectTo: '404', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
