import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './@core/header/header.component';
import { CourseListComponent } from './@modules/course/pages/course-list/course-list.component';
import { CourseItemComponent } from './@modules/course/pages/course-list/course-item/course-item.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './@modules/auth/pages/login/login.component';
import { RatingComponent } from './@shared/components/rating/rating.component';
import { CourseComponent } from './@modules/course/pages/course/course.component';
import { CourseAddComponent } from './@modules/course/pages/course-add/course-add.component';
import { UserComponent } from './@modules/user/pages/user/user.component';
import { RegisterComponent } from './@modules/auth/pages/register/register.component';
import { CourseDetailsComponent } from './@modules/course/pages/course-details/course-details.component';
import { AdminModule } from './@modules/admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CourseListComponent,
    CourseItemComponent,
    LoginComponent,
    RatingComponent,
    CourseComponent,
    CourseAddComponent,
    CourseDetailsComponent,
    UserComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
