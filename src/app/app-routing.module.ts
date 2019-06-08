import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './@modules/course/pages/course-list/course-list.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './@modules/auth/pages/login/login.component';
import { CourseComponent } from './@modules/course/pages/course/course.component';
import { CourseAddComponent } from './@modules/course/pages/course-add/course-add.component';
import { UserComponent } from './@modules/user/pages/user/user.component';
import { UserListComponent } from './@modules/user/pages/user-list/user-list.component';
import { AdminGuard } from './@core/guards/admin.guard';
import { RegisterComponent } from './@modules/auth/pages/register/register.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'courses'
    },
    {
        path: 'courses',
        component: CourseComponent,
        children: [
            {
                path: '',
                component: CourseListComponent,
            },
            {
                path: 'add',
                component: CourseAddComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'edit/:id',
                component: CourseAddComponent,
                canActivate: [AdminGuard]
            }
        ]
    },
    {
        path: 'users',
        component: UserComponent,
        canActivateChild: [AdminGuard],
        children: [
            {
                path: '',
                component: UserListComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '**',
        redirectTo: 'courses'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
