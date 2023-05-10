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

  getMessages(): Observable<ChatMessage[]> {

    return this.http.get<ChatMessage[]>(this.message_url)

  }

}
