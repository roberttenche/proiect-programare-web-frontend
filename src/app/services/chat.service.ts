import { Injectable } from '@angular/core';
import { Chat } from '../models/chat.model';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private readonly chats_url = 'http://localhost:8080/chats'


  constructor(private http: HttpClient) { }
  
  async getChats(userId : number) : Promise<Chat[]>{

    return firstValueFrom<Chat[]>(this.http.get<Chat[]>(this.chats_url + "/" + userId.toString()))

  }

  async addChat(userId: number, surgeonId: number) : Promise<Chat>
  {
    return firstValueFrom(this.http.post<Chat>(this.chats_url,
    {
      "user1Id": userId,
      "user2Id": surgeonId
    }))
  }

}
