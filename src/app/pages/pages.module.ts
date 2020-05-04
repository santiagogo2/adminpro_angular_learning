import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

// Modules
import { SharedModule } from '../shared/shared.module';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';

// Temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';

@NgModule({
	declarations: [
		DashboardComponent,
		Graficas1Component,
		PagesComponent,
		ProgressComponent,
		IncrementadorComponent,
		GraficoDonaComponent
	],
	exports: [
		DashboardComponent,
		Graficas1Component,
		ProgressComponent
	],
	imports: [
		SharedModule,
		PAGES_ROUTES,
		FormsModule,
		ChartsModule
	]
})
export class PagesModule {}