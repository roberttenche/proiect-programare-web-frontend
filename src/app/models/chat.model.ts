
export interface Chat {
  id: number,
  user1Id: number,
  user2Id: number,
}

export interface ChatMessage {

  text: string,
  chatId: number,
  sentBySurgeon: boolean
  docId : number;

}