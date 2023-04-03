import { Observable } from "rxjs"

export interface Chat {
  userId: number,
  surgeonId: number,

  messages: Observable<ChatMessage[]> // list of messages
}

export interface ChatMessage {
  id: number

}

export interface TextChatMessage extends ChatMessage {
  content: string;
}

export interface ImageChatMessage extends ChatMessage {
  content: HTMLImageElement
}