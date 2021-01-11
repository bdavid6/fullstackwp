import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserComponent } from './user/user.component';
import { AuthComponent } from './auth/auth.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AnonymGuard } from './core/guards/anonym.guard';
import { SubjectsComponent } from './subjects/subjects.component';
import { SubjectComponent } from './subjects/subject/subject.component';
import { AddSubjectComponent } from './subjects/add-subject/add-subject.component';
import { ModifySubjectComponent } from './subjects/modify-subject/modify-subject.component';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RatingComponent } from './rating/rating.component';
import { UsersubjectsComponent } from './user/usersubjects/usersubjects.component';
import { BuildingsComponent } from './buildings/buildings.component';
import { AddBuildingComponent } from './buildings/add-building/add-building.component';





@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
      UsersubjectsComponent,
    AuthComponent,
      LoginComponent,
      RegisterComponent,
    SubjectsComponent,
      SubjectComponent,
      AddSubjectComponent,
      ModifySubjectComponent,
    PagenotfoundComponent,
    RatingComponent,
    BuildingsComponent,
    AddBuildingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatDialogModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDividerModule,
    MatSlideToggleModule
  ],
  providers: [
    AuthGuard,
    AnonymGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
