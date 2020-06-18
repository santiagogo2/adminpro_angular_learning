import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';

import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';

@Injectable()
export class UsuarioService{
	public url: string;

	public usuario: Usuario;
	public token: string;

	constructor(
		private _http: HttpClient,
		private _router: Router
	){
		this.url = URL_SERVICIOS;
		this.cargarStorage();
	}

	estaLogeado(){
		return ( this.token.length > 5 ) ? true : false;
	}

	cargarStorage(){
		if(localStorage.getItem('token')){
			this.token = localStorage.getItem('token');
			this.usuario = JSON.parse( localStorage.getItem('usuario') );
		} else {
			this.token = '';
			this.usuario = null;
		}
	}

	guardarStorage( id: string, token: string, usuario: Usuario ){
		localStorage.setItem( 'id', id );
		localStorage.setItem( 'token', token );
		localStorage.setItem( 'usuario', JSON.stringify( usuario ));

		this.usuario = usuario;
		this.token = token;
	}

	logout(){
		this.usuario = null;
		this.token = '';
		
		localStorage.removeItem('id');
		localStorage.removeItem('token');
		localStorage.removeItem('usuario');

		this._router.navigate(['/login']);
	}

	loginGoogle( token ){
		let url = URL_SERVICIOS + 'login/google';

		return this._http.post( url, {token} )
						 .pipe(
							 map( (res: any) => {
								this.guardarStorage( res.id, res.token, res.usuario );	
								return true;							
							 })
						 );
	}

	login( usuario: Usuario, recuerdame: boolean = false ): Observable<any>{
		if( recuerdame ){
			localStorage.setItem( 'email', usuario.email );
		} else {
			localStorage.removeItem( 'email' );
		}
		let url = URL_SERVICIOS + 'login';
		return this._http.post( url, usuario )
						 .pipe(
							 map( (res: any) => {
								 this.guardarStorage( res.id, res.token, res.usuario );
								 return true;
							 })
						 );
	}

	crearUsuario( usuario: Usuario ): Observable<any>{
		return this._http.post( this.url + 'usuario', usuario )
						 .pipe(
							 map( ( res:any ) => {
							 	swal( 'Usuario creado', usuario.email, 'success' );
							 	return res.usuario;
							 })					 	
						 );
	}
}