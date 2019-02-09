import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartamentListComponent } from './departament-list/departament-list.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DepartmentDetailComponent } from './department-detail/department-detail.component';

const routes: Routes = [
    {path:'', redirectTo:'/departments', pathMatch:'full' },
    {path:'departments', component: DepartamentListComponent},
    {path:'departments/:id', component: DepartmentDetailComponent},
    {path: 'employees', component: EmployeeListComponent},
    {path: '**', component: PageNotFoundComponent}
    //wildcard routes, always in the bottom of the array
    //render the component whether the path don't exists
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [
        DepartamentListComponent,
        EmployeeListComponent,
        PageNotFoundComponent,
        DepartmentDetailComponent];
