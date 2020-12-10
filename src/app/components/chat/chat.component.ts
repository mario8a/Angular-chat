import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto= '';
  mensajeSuscription: Subscription;
  elemento: HTMLElement;

  mensajes: any[] = [];

  constructor(public chatService: ChatService) { }

  ngOnInit(): void {

    this.elemento = document.getElementById('chat-mensajes')

    this.mensajeSuscription =  this.chatService.getMessages().subscribe(msg => {
      this.mensajes.push(msg);

      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
    })
  }

  ngOnDestroy() {
    this.mensajeSuscription.unsubscribe();
  }

  enviar(){
    
    if(this.texto.trim().length === 0) {
      return
    }
    console.log(this.texto);

    this.chatService.sendMessage(this.texto);

    this.texto = '';
  }

}
