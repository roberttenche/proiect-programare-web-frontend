import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ChatMessage } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private readonly message_url = 'http://localhost:8080/messages'

  constructor(private http: HttpClient)
  {
  }

  ngOnInit(): void
  {
  }

  getMessages(chatId : number): Promise<ChatMessage[]> {
    return firstValueFrom(
      this.http.get<ChatMessage[]>(this.message_url + "/" + chatId.toString())
    )
  }

  async sendMessage(text : string | null, chatId : number, sentBySurgeon: boolean, docId : number | null) : Promise<ChatMessage>{
    return firstValueFrom(
      this.http.post<ChatMessage>(this.message_url,
      {
        "text": text,
        "chatId": chatId,
        "docId": docId,
        "sentBySurgeon": sentBySurgeon
      })
    )
  }

}
