import { Component } from '@angular/core';
import { CalendarOptions, CustomButtonInput, DateSelectArg } from '@fullcalendar/core';
import { MessageService } from 'primeng/api';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';

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
      endTime: '18:00',
    },
    headerToolbar: {
      left:'prev',
      center:'myCustomButton',
      right: 'next',
    },
  };

  handleSelection(info : DateSelectArg) {
    console.log(info)
  }

  customButton()
  {
    console.log('test')
  }

  ngOnInit()
  {
    this.calendarOptions.select = this.handleSelection;

    let button1 : CustomButtonInput = {
      text: 'Add Appointment',
      click: this.customButton
    }

    this.calendarOptions.customButtons = {
      myCustomButton: button1
    }
  }
}
