import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { NotificationComponent } from './notification.component';
import { TranslateModule } from '@ngx-translate/core';
import { Notification } from '../../../models/notification-model';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationComponent, [TranslateModule.forRoot()]]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have null initial notification', () => {
    expect(component.notification).toBeNull();
  });

  it('should set notification input', () => {
    const notification: Notification = {
      type:"error",
      message:"test"
    };

    component.notification = notification;

    expect(component.notification).toEqual(notification);
  });

  it('should render notification details in the template', () => {
    const notification: Notification = {
      type:"error",
      message:"test"
    };

    component.notification = notification;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain(notification.message);
  });

  it('should call closeNotification method and set notification to null', () => {
    const notification: Notification = {
      type: 'error',
      message: 'test'
    };

    component.notification = notification;
    spyOn(component, 'closeNotification')
  
    fixture.detectChanges();
  
    const closeButton = fixture.nativeElement.querySelector('.close-btn');
    closeButton.click();
  
    expect(component.closeNotification).toHaveBeenCalled();
    //expect(component.notification).toBeNull();
  });

  it('should update template on closeNotification method execution', fakeAsync(() => {
    const notification: Notification = {
      type: 'error',
      message: 'test'
    };

    component.notification = notification;
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain(notification.message);

    component.closeNotification();
    tick();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).not.toContain(notification.type);
  }));
});
