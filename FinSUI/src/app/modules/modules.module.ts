import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { ModulesRoutes } from './modules.routing';
import { FirmListComponent } from './firm/firm-list/firm-list.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ModulesRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NotifierModule
  ],
  declarations: [
   FirmListComponent
  ]
})
export class ModulesModule {}
