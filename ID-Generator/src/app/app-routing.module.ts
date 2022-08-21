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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
