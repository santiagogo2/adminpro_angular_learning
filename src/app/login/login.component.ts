import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
	public email: string;
	public recuerdame: boolean;
	public auth2: any;

	constructor(
		private _router: Router,
		private _userService: UsuarioService
	) {
		this.recuerdame = false;
	}

	ngOnInit(): void {
		init_plugins();
		this.googleInit();

		this.email = localStorage.getItem( 'email' ) || '';
		if( this.email.length > 0 ) this.recuerdame = true; 
	}

	googleInit(){
		gapi.load('auth2', () => {
			this.auth2 = gapi.auth2.init({
				client_id: '438578810125-8fu2daidbhvrbmh109dk14um3k00hllu.apps.googleusercontent.com',
				cookiepolicy: 'single_host_origin',
				scope: 'profile email'
			});
			
			this.attachSignin( document.getElementById('btnGoogle') );
		});
	}

	attachSignin( element ){
		this.auth2.attachClickHandler( element, {}, (googleUser) => {
			// let profile = googleUser.getBasicProfile();
			let token = googleUser.getAuthResponse().id_token;
			this._userService.loginGoogle( token ).subscribe( () => window.location.href = "#/dashboard" );
		});
	}

	ingresar( loginForm: NgForm){
		if( loginForm.invalid ) return;

		let usuario = new Usuario(null, loginForm.value.email, loginForm.value.password);

		this._userService.login( usuario, loginForm.value.recuerdame ).subscribe(
			correcto => {
				this._router.navigate(['/dashboard']);
			}
		);
	}
}
