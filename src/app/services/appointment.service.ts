import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private readonly appointments_url = 'http://localhost:8080/appointments'


  constructor(private http: HttpClient) { }
  
  async addAppointment(appointment : Appointment) : Promise<Appointment> {
    return firstValueFrom(this.http.post<Appointment>(this.appointments_url, appointment))
  }

  async getAppointmentsBySurgeonId(surgeonId : number) : Promise<Appointment[]> {
    return firstValueFrom(this.http.get<Appointment[]>(this.appointments_url + "/surgeon/" + surgeonId.toString()))
  }

  async getAppointmentsByUserId(userId : number) : Promise<Appointment[]> {
    return firstValueFrom(this.http.get<Appointment[]>(this.appointments_url + "/user/" + userId.toString()))
  }

}
