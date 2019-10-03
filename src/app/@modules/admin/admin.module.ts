import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UserTableComponent } from './pages/user/user-table/user-table.component';
import { UserItemComponent } from './pages/user/user-table/user-item/user-item.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AdminComponent,
        UserTableComponent,
        UserItemComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule
    ],
    schemas: [ NO_ERRORS_SCHEMA ]
})
export class AdminModule { }
