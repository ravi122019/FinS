import { Routes } from '@angular/router';
import { FirmListComponent } from './firm/firm-list/firm-list.component';
import { DesignationListComponent } from './designation/designation-list/designation-list.component';
import { ExpenseListComponent } from './expenses/expenses-list/expenses-list.component';

export const ModulesRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'firms',
				component: FirmListComponent,
				data: {
					title: 'Firm',
					urls: [
						{ title: 'Firm' },
						{ title: 'Firm-List' }
					]
				}
			},
			{
				path: 'designations',
				component: DesignationListComponent,
				data: {
					title: 'Designations',
					urls: [
						{ title: 'Designation' },
						{ title: 'Designation-List' }
					]
				}
			}
			,
			{
				path: 'expenses',
				component: ExpenseListComponent,
				data: {
					title: 'Expense type',
					urls: [
						{ title: 'Expense type' },
						{ title: 'Expense type-List' }
					]
				}
			},
			{
				path: 'users',
				loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
			}

		]
	}
];
