import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{path: "", redirectTo: "pages/home", pathMatch: "full"},
{
  path: 'pages',
  loadChildren: () =>
      import('./modules/pages/pages-routing.module').then(
          m => m.PagesRoutingModule
      ),
},

{
  path: 'student',
  loadChildren: () =>
      import('./modules/student/student-routing.module').then(
          m => m.StudentRoutingModule
      ),
},

{
  path: 'backend/admin',
  loadChildren: () =>
      import('./modules/admin/admin-routing.module').then(
          m => m.AdminRoutingModule
      ),
},

{
  path: 'backend/batchmanager',
  loadChildren: () =>
      import('./modules/batchmanager/batchmanager-routing.module').then(
          m => m.BatchmanagerRoutingModule
      ),
},

{
  path: 'secure/student',
  loadChildren: () =>
      import('./modules/student/student-routing.module').then(
          m => m.StudentRoutingModule
      ),
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
