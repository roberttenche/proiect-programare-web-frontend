import { User } from "./user.model";

export interface Surgeon {
  id: number,
  user: User,

  name: string,
  title: string,

  rating: number, // 0 - 10
  description: string,

  imageUrl: string, // url profile image

}