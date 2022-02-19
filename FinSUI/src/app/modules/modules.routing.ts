import { Routes } from '@angular/router';
import { FirmListComponent } from './firm/firm-list/firm-list.component';
import { DesignationListComponent } from './designation/designation-list/designation-list.component';
import { ExpenseListComponent } from './expenses/expenses-list/expenses-list.component';

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
			},
			{
				path: 'designation/designation-list',
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
				path: 'expense/expense-list',
				component: ExpenseListComponent,
				data: {
					title: 'Expense type',
					urls: [
						{ title: 'Expense type' },
						{ title: 'Expense type-List' }
					]
				}
			}

		]
	}
];
