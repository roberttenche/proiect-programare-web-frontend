export interface Appointment {
  id: number,

  userId: number,
  surgeonId: number,

  dateStart : Date
  dateEnd : Date
}