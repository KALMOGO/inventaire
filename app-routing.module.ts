import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BilanComponent } from './bilan/bilan.component';
import { EnregistrementComponent } from './enregistrement/enregistrement.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'bilan', component: BilanComponent },
  { path: 'save', component: EnregistrementComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
