import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/* External Imports */
/* PrimeNG */
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { SplitterModule } from 'primeng/splitter';
import { AvatarModule } from 'primeng/avatar';
import { CheckboxModule } from 'primeng/checkbox';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DropdownModule } from 'primeng/dropdown';

import { StyleClassModule } from 'primeng/styleclass';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SignupComponent } from './signup/signup.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { _403Interceptor } from './interceptors/403.interceptor';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AppointmentsAddComponent } from './appointments-add/appointments-add.component';
import { InvoiceComponent } from './invoice/invoice.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    HomeComponent,
    NavbarComponent,
    PagenotfoundComponent,
    SignupComponent,
    ContactComponent,
    LoginComponent,
    AboutComponent,
    AppointmentsComponent,
    AppointmentsAddComponent,
    InvoiceComponent
  ],
  imports: [
    /* Angular stuff */
    BrowserModule,
    AppRoutingModule,
    CheckboxModule,
    StyleClassModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,

    /* PrimeNG */
    MenubarModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    DialogModule,
    CardModule,
    RatingModule,
    SplitterModule,
    AvatarModule,
    VirtualScrollerModule,
    FileUploadModule,
    CalendarModule,
    DynamicDialogModule,
    ToastModule,
    FullCalendarModule,
    DropdownModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: _403Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
