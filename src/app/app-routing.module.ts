import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './@modules/course/pages/course-list/course-list.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './@modules/auth/pages/login/login.component';
import { CourseComponent } from './@modules/course/pages/course/course.component';
import { AdminGuard } from './@core/guards/admin.guard';
import { RegisterComponent } from './@modules/auth/pages/register/register.component';
import { CourseDetailsComponent } from './@modules/course/pages/course-details/course-details.component';

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
                path: ':id',
                component: CourseDetailsComponent
            }
        ]
    },
    {
        path: 'admin',
        canActivateChild: [AdminGuard],
        loadChildren: () => import('./@modules/admin/admin.module').then(m => m.AdminModule)
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
