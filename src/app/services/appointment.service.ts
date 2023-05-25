import { Injectable } from '@angular/core';
import { Chat } from '../models/chat.model';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private readonly documents_url = 'http://localhost:8080/documents'


  constructor(private http: HttpClient) { }
  
  async addAppointment(appointment : Appointment) { //: Promise<Appointment>
    
  }

  async getAppointments(userId : number) { //: : Promise<HttpResponse<Blob>>

  }

}
