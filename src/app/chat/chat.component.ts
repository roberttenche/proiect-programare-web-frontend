import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { SurgeonService } from '../services/surgeon.service';
import { Chat, ChatMessage } from '../models/chat.model';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  selectedChatId : number = 0;
  selectedSurgeonId : number = -1;
  chatVisible : boolean = false;
  textMessage : string = "";
  userRole : string = "";

  userList : User[] = [];
  messageList : ChatMessage[] = [];
  chatList! : Observable<Chat[]>;

  constructor(private route: ActivatedRoute, private http: HttpClient, 
    private userService : UserService, private surgeonService : SurgeonService, 
    private chatService : ChatService, private authService : AuthService,
    private messageService: MessageService, private cdr: ChangeDetectorRef)
    {}

  async ngOnInit(): Promise<void>
  {
    this.route.queryParams.subscribe(param =>
    {
      if (parseInt(param['surgeonId'])) {
        this.selectedSurgeonId = parseInt(param['surgeonId'])
      }
    })

    if (this.selectedSurgeonId === -1)
    {
      console.warn('Surgeon ID is recievied as null to ChatComponent');
      this.chatVisible = false
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

        this.userService.getUserById(myId).subscribe((currUser : User) => {
          this.userRole = currUser.role
        })

        this.userService.getUserById(otherId).subscribe((other : User) => {
          this.userList.push(other)
        })
      })
    })

    this.setSelectedSurgeonId(this.selectedSurgeonId)

  }

  getSelectedSurgeonId(): number
  {
    return this.selectedSurgeonId;
  }

  setSelectedSurgeonId(id : number): void
  {
    if (id === -1) {
      return;
    }

    this.selectedSurgeonId = id

    this.chatList.forEach(chat => {
      chat.forEach(c => {
        if (
          (c.user1Id == this.authService.getUserId() || c.user2Id == this.authService.getUserId()) &&
          (c.user1Id == this.selectedSurgeonId || c.user2Id == this.selectedSurgeonId)
          )
        {
          this.selectedChatId = c.id
        }
      })
    })

    this.chatVisible = true;
    this.cdr.detectChanges();

  }

  sendMessage()
  {
    if (this.userRole === "USER")
    {
      this.messageService.sendMessage(this.textMessage, this.selectedChatId, false)
    }
    else if (this.userRole === "SURGEON")
    {
      this.messageService.sendMessage(this.textMessage, this.selectedChatId, true)
    }

    this.loadMessages()
  
    this.textMessage = ""
  }

  loadMessages()
  {
    this.messageList = []
    this.messageService.getMessages(this.selectedChatId)
    .subscribe((messages : ChatMessage[]) => {
      messages.forEach((message) => {
        this.messageList.push(message)
      })
    })
  }

}
