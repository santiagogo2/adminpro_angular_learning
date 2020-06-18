import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SettingsService, SharedService, SidebarService, UsuarioService } from './service.index';
import { LoginGuardGuard } from './guards/login-guard.guard';

@NgModule({
	declarations: [
	],
	imports: [
		HttpClientModule,
		CommonModule,
	],
	providers: [
		SettingsService,
		SharedService,
		SidebarService,
		UsuarioService,
		LoginGuardGuard
	]
})
export class ServiceModule { }