import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../class/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public usuario: Usuario = null;

  constructor(private socket: Socket) {
    this.cargarStorage();
    this.checkStatus();
  }

  //Meotod para revisar el estado del servidor
  checkStatus() {

    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('desconectado del servidor');
      this.socketStatus = false;
    });

  }
  
  //Emite los eventos al server
  emit(evento: string, payload?: any, callback?: Function) {
    //emit('Evento', payload, callback)
    console.log('emitiendo', evento)
    this.socket.emit(evento, payload, callback);
  }

  //Escucha cualquier evento del servidor
  listen(evento: string) {
    return this.socket.fromEvent(evento);
  }

  loginWS(nombre: string) {
    // console.log('Configurando', nombre);

    return new Promise((resolve, reject) => {

      this.emit('configurar-usuario', {nombre}, (resp) => {
        
        // console.log(resp)
        //registrar el usuario para no restablecerlo al refrescar la pagina
        this.usuario = new Usuario(nombre);
        this.guardarStorage();

        resolve();
      });

    })

  }

  getUsuario() {
    return this.usuario;
  }

  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage() {
    
    if(localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }

  }

}
