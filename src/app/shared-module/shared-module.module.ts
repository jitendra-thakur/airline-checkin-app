import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleRoutingModule } from './shared-routing.module';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModuleRoutingModule, NotificationComponent],
  exports: [NotificationComponent],
})
export class SharedModuleModule {}
