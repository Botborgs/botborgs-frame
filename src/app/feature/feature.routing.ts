import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

//components
import { HomeComponent } from "./components/home/home.component";

const routes: Routes = [
  { path: '', component: HomeComponent, redirectTo: '', pathMatch: 'full' },
  { path: '**', component: HomeComponent, redirectTo: '' },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class FeatureRoutingModule {
}
