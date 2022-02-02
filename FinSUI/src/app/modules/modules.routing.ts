import { Routes } from '@angular/router';
import { FirmListComponent } from './firm/firm-list/firm-list.component';

export const ModulesRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'firm/firm-list',
				component: FirmListComponent,
				data: {
					title: 'Firm',
					urls: [
						{ title: 'Firm' },
						{ title: 'Firm-List' }
					]
				}
			}

		]
	}
];
