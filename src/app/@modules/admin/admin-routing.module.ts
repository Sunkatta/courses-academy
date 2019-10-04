import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UserTableComponent } from './pages/user/user-table/user-table.component';
import { CourseTableComponent } from './pages/course/course-table/course-table.component';
import { CourseAddComponent } from './pages/course/course-add/course-add.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: 'users', component: UserTableComponent },
            {
                path: 'courses',
                children: [
                    { path: '', component: CourseTableComponent },
                    { path: 'add', component: CourseAddComponent },
                    { path: 'edit/:id', component: CourseAddComponent }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
