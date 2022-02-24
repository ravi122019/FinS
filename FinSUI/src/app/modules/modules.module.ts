import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { ModulesRoutes } from './modules.routing';
import { FirmListComponent } from './firm/firm-list/firm-list.component';
import { LoaderComponent } from '../shared/custom-components/loader/loader.component';
import { TypeheadComponent } from '../shared/custom-components/typehead/typehead.component';
import { DesignationListComponent } from './designation/designation-list/designation-list.component';
import { ExpenseListComponent } from './expenses/expenses-list/expenses-list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UsersComponent } from './users/users.component';

/**
 * Custom angular notifier options
 */
 const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: false,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ModulesRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NotifierModule.withConfig(customNotifierOptions),
    InfiniteScrollModule
  ],
  declarations: [
    FirmListComponent,
    LoaderComponent,
    TypeheadComponent,
    DesignationListComponent,
    ExpenseListComponent,
    UsersComponent
  ]
})
export class ModulesModule { }

