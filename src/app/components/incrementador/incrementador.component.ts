import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
	selector: 'app-incrementador',
	templateUrl: './incrementador.component.html',
	styles: []
})
export class IncrementadorComponent implements OnInit {
	@ViewChild('txtProgress') txtProgress: ElementRef;

	@Input() public progressName: string;
	@Input() public progreso: number;

	@Output() cambioValor: EventEmitter<number> = new EventEmitter();

	constructor() {
	}

	ngOnInit(): void {
	}

	onChanges( newValue: number ){
		if( newValue >= 100 ){
			this.progreso = 100
		} else if( newValue <= 0 ) {
			this.progreso = 0
		} else {
			this.progreso = newValue;
		}

		
		this.txtProgress.nativeElement.value = this.progreso;

		this.cambioValor.emit( this.progreso );
	}

	cambiarValor( valor ){
		if(this.progreso >= 100 && valor > 0){
			this.progreso = 100;
			return;
		}
		if( this.progreso <= 0 && valor < 0){
			this.progreso = 0;
			return;
		}

		this.progreso = this.progreso + valor;
		this.cambioValor.emit( this.progreso );
		this.txtProgress.nativeElement.focus();
	}
}
