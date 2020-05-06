import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
	selector: 'app-rxjs',
	templateUrl: './rxjs.component.html',
	styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

	subscription: Subscription;

	constructor() {
		this.subscription = this.regresaObservable().subscribe( 
			response => {
				console.log('Subs', response);
			},
			error => {
				console.error(<any>error);
			},
			() => {
				console.log('El observador terminó');
			}
		);
	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void{
		this.subscription.unsubscribe(); // Cuando sale de la página elimina la subscripción
	}

	regresaObservable(): Observable<any>{
		return new Observable( (observer) => {
			let contador = 1;
			let intervalo = setInterval(() => {
				const salida = {
					valor: contador   
				}
				observer.next(salida);

				// if(contador == 3){
				// 	clearInterval(intervalo);
				// 	observer.complete(); // Completa el observable
				// } 
				// if(contador == 2){
				// 	// clearInterval(intervalo);
				// 	observer.error('Auxilio');
				// }

				contador++;
			}, 1000);
		}).pipe(
			retry(2), // Si falla reinicia el observable 2 veces
			map((res: any) => { // Mapea la información recibida del observable y es aplicable en todas las subscripciones
				return res.valor;
			}),
			filter( (valor, index) => { // Filtra la información recibida de la manera mas conveniente
				if( (valor % 2) == 1 ){
					// Impar
					return true; // Siempre retorna un booleano
				} else {
					// Par
					return false;
				}
			})
		)
	}
}
