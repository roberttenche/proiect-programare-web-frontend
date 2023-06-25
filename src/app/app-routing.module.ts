import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SignupComponent } from './signup/signup.component';
import { AboutComponent } from './about/about.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AppointmentsAddComponent } from './appointments-add/appointments-add.component';
import { InvoiceComponent } from './invoice/invoice.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'chat', component: ChatComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},  
  { path: 'about', component: AboutComponent},
  { path: 'appointments', component: AppointmentsComponent},
  { path: 'appointments/add', component: AppointmentsAddComponent},
  { path: 'invoice', component: InvoiceComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
