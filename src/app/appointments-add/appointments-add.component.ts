import { Component } from '@angular/core';
import { CalendarOptions, CustomButtonInput, DateSelectArg } from '@fullcalendar/core';
import { MessageService } from 'primeng/api';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
import { SurgeonService } from '../services/surgeon.service';
import { Surgeon } from '../models/surgeon.model';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../models/appointment.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-appointments-add',
  templateUrl: './appointments-add.component.html',
  styleUrls: ['./appointments-add.component.scss'],
  providers: [MessageService]
})
export class AppointmentsAddComponent {
  date!: Date[];

  calendarOptions: CalendarOptions = {
    dayHeaderFormat: { month: 'long', day: 'numeric' },

    initialView: 'timeGridWeek',
    weekends: false,
    selectable: true,
    plugins: [timeGridPlugin, interactionPlugin],

    businessHours: {
      startTime: '10:00',
      endTime: '18:00'
    },
    selectAllow: this.checkSelectable.bind(this),

    headerToolbar: {
      left:'prev',
      center:'addAppointment',
      right: 'next',
    },

    events: []
  };

  surgeonList : Surgeon[] = [];
  selectedSurgeon : Surgeon | null = null;
  dateInfo : DateSelectArg | null = null;


  constructor(
    private surgeonService: SurgeonService, private appointmentService : AppointmentService, 
    private authService: AuthService
    ){}

  async ngOnInit()
  {

    this.surgeonList = await this.surgeonService.getSurgeons()

    let button1 : CustomButtonInput = {
      text: 'Add Appointment',
      click: this.addAppointment.bind(this)
    }

    this.calendarOptions.customButtons = {
      addAppointment: button1
    }

    this.calendarOptions.select = this.handleSelection.bind(this);

  }


  handleSelection(info : DateSelectArg)
  {
    this.dateInfo = info
  }

  async onChangeTest()
  {

    if (this.selectedSurgeon === null) {
      this.calendarOptions.events = []
      return;
    }

    let appointments : Appointment[] = await this.appointmentService.getAppointmentsBySurgeonId(this.selectedSurgeon.id)

    let events : any[] = []

    appointments.forEach(appointment =>{
      events.push({
        id: appointment.id,
        title: 'Blocked',
        start: appointment.dateStart,
        end: appointment.dateEnd
      })
    })

    this.calendarOptions.events = events;
  }

  async addAppointment()
  {

    if (this.selectedSurgeon === null) {
      alert('Select surgeon!')
      return;
    }

    if (this.dateInfo === null) {
      alert('Select date!')
      return;
    }

    let app : Appointment = {
      id: 0,
      userId: this.authService.getUserId(),
      surgeonId: this.selectedSurgeon.id,
      dateStart: this.dateInfo.start,
      dateEnd: this.dateInfo.end
    }

    this.dateInfo = null;

    app = await this.appointmentService.addAppointment(app)

    console.log(app)

  }

  checkSelectable(selectInfo: any) {
    const start = selectInfo.startStr;
    const end = selectInfo.endStr;

    if (this.calendarOptions.businessHours === undefined) {
      throw Error('Something went wrong')
    }

    // console.log(start)
    // console.log(end)

    let startDate : Date = new Date(start);
    let endDate : Date = new Date(end);

    if ((startDate.getHours() < 10 || startDate.getHours() >= 18) || 
        (endDate.getHours() < 10 || endDate.getHours() > 18))
    {
      return false;
    }

    return true;
  }

}
