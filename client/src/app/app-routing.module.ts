import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/client/home/home.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent}, 
  {
    path: 'auth',
    loadChildren: () => import("./pages/auth/auth.module").then((m) => m.AuthModule)
  },
  { path: '', redirectTo: 'auth/login', pathMatch: "full" },
  {
    path: "**",
    loadChildren:() => import("./pages/not-found/not-found.module").then((m) => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
