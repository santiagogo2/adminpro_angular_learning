export class Usuario{
	constructor(
		public nombre: string,
		public email: string,
		public password: string,
		public img?: string, // El interrogante se usa para definir como opcional el parametro
		public role?: string, 
		public google?: boolean,
		public _id?: string,
	){}
}