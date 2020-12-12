import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nombre = '';

  constructor(
    public wsService: WebsocketService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ingresar() {

    this.wsService.loginWS(this.nombre)
      .then(() => {

        this.router.navigateByUrl('/mensajes');

      })

  }

}
