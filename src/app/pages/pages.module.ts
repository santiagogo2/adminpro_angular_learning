import { NgModule } from '@angular/core';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

// Modules
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';

@NgModule({
	declarations: [
		DashboardComponent,
		Graficas1Component,
		PagesComponent,
		ProgressComponent
	],
	exports: [
		DashboardComponent,
		Graficas1Component,
		ProgressComponent
	],
	imports: [
		SharedModule,
		PAGES_ROUTES
	]
})
export class PagesModule {}