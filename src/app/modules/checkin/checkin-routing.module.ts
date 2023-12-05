import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckinFormComponent } from './checkin-form/checkin-form.component';
import { CheckinComponent } from './checkin.component';

export const routes: Routes = [
  {
    path: '',
    component: CheckinComponent,
    children: [
      {
        path: 'checkin',
        component: CheckinFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckinRoutingModule {}
