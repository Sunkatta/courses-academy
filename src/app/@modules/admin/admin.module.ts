import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UserTableComponent } from './pages/user/user-table/user-table.component';
import { CommonModule } from '@angular/common';
import { CourseTableComponent } from './pages/course/course-table/course-table.component';
import { CourseAddComponent } from './pages/course/course-add/course-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AdminComponent,
        UserTableComponent,
        CourseTableComponent,
        CourseAddComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AdminRoutingModule
    ],
    schemas: [ NO_ERRORS_SCHEMA ]
})
export class AdminModule { }
