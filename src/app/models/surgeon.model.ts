import { User } from "./user.model";

export interface Surgeon {
  id: number,
  userBody: User,

  title: string,
  description: string,
  rating: number, // 0 - 10

}