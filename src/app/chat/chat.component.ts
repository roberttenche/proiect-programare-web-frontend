import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { SurgeonService } from '../services/surgeon.service';
import { Chat } from '../models/chat.model';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  selectedChatId : number = 0;
  selectedSurgeonId! : number;
  chatVisible! : boolean;
  chatList! : Observable<Chat[]>;
  userList : User[] = [];
  textMessage : string = "";

  constructor(private route: ActivatedRoute, private http: HttpClient, private userService : UserService, private surgeonService : SurgeonService, private chatService : ChatService, private authService : AuthService){}

  async ngOnInit(): Promise<void>
  {
    this.route.queryParams.subscribe(param =>
    {
      this.selectedSurgeonId = param['surgeonId']
    })

    if (this.selectedSurgeonId == null)
    {
      console.warn('Surgeon ID is recievied as null to ChatComponent');
    }
    else
    {
      this.chatVisible = true
      const result : Chat = await firstValueFrom(this.chatService.addChat(this.authService.getUserId(), this.selectedSurgeonId))

      if (result != null) {
        this.selectedChatId = result.id
      }

    }

    this.chatList = this.chatService.getChats(this.authService.getUserId())

    this.chatList.forEach(chats =>{
      chats.forEach(chat => {
        let myId : number = this.authService.getUserId()
        let otherId: number

        if ( myId !== chat.user1Id)
        {
          otherId = chat.user1Id
        }
        else if (this.authService.getUserId() !== chat.user2Id)
        {
          otherId = chat.user2Id
        }
        else
        {
          throw new Error("ChatComponent::ngOnInit::USER 2 TIMES")
        }

        this.userService.getUserById(otherId).subscribe((other : User) => {
          this.userList.push(other)
        })
      })
    })

    
  }

  getSelectedSurgeonId(): number
  {
    return this.selectedSurgeonId;
  }

  setSelectedSurgeonId(id : number): void
  {
    this.selectedSurgeonId = id
    this.chatVisible=true
  }

  sendMessage()
  {
    // console.log(this.textMessage)
    // console.log(this.selectedSurgeonId)
    console.log(this.authService.getUserId())
    // this.textMessage = ""
  }

}
