import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserItemComponent } from './pages/user-list/user-item/user-item.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AdminComponent,
        UserListComponent,
        UserItemComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule
    ],
    schemas: [ NO_ERRORS_SCHEMA ]
})
export class AdminModule { }
