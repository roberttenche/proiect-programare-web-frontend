import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  getMessages(chatId : number): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(this.message_url + "/" + chatId.toString())
  }

  sendMessage(text : string, chatId : number, sentBySurgeon: boolean) {
    return this.http.post<ChatMessage>(this.message_url,
      {
        "text": text,
        "chatId": chatId,
        "sentBySurgeon": sentBySurgeon
      }).subscribe()
  }

}
