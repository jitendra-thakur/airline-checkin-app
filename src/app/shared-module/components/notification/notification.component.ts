import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Notification } from '../../../models/notification-model';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {
  @Input() notification: Notification | null = null;
  constructor(private translate: TranslateService) {}

  closeNotification(): void {
    this.notification = null;
  }
}
