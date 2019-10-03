import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UserTableComponent } from './pages/user/user-table/user-table.component';
import { CourseTableComponent } from './pages/course/course-table/course-table.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: 'users', component: UserTableComponent },
            { path: 'courses', component: CourseTableComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
