import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';

import { CheckinFormComponent } from './checkin-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { GraphQLModule } from '../../../graphql.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CheckinService } from '../../../services/checkin.service';
import { of, throwError } from 'rxjs';

describe('CheckinFormComponent', () => {
  let component: CheckinFormComponent;
  let fixture: ComponentFixture<CheckinFormComponent>;
  let checkinServiceSpy: jasmine.SpyObj<CheckinService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CheckinService', ['checkin']);
    await TestBed.configureTestingModule({
      imports: [
        CheckinFormComponent,
        [TranslateModule.forRoot()],
        GraphQLModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: CheckinService, useValue: spy }, // Provide the spy here
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckinFormComponent);
    component = fixture.componentInstance;
    checkinServiceSpy = TestBed.inject(
      CheckinService
    ) as jasmine.SpyObj<CheckinService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    component.ngOnInit();
    expect(component.checkinForm.get('bookingCode')?.value).toBeNull();
    expect(component.checkinForm.get('familyName')?.value).toBeNull();
  });

  it('should call checkin service on form submission for successful check-in', fakeAsync(() => {
    const mockResponse = {
      status: 200,
      code: 123,
      discription: 'Check-in successful',
    };
    checkinServiceSpy.checkin.and.returnValue(of(mockResponse));

    component.ngOnInit();

    component.checkinForm.patchValue({
      bookingCode: 'ABC123',
      familyName: 'Doe',
    });

    component.submitCheckinForm();
    tick();

    expect(component.checkinSubmitSuccess).toBeTruthy();
    expect(component.checkinSubmitError).toBeFalsy();
    expect(component.checkinErrorNotification?.type).toBe('success');
    expect(component.checkinErrorNotification?.message).toBe(
      'checkIn.success.message'
    );
  }));

  it('should handle error from checkin service on form submission', fakeAsync(() => {
    const errorMessage = 'Check-in failed';
    checkinServiceSpy.checkin.and.returnValue(throwError(errorMessage));

    component.ngOnInit();

    component.checkinForm.patchValue({
      bookingCode: 'XYZ789',
      familyName: 'Smith',
    });

    component.submitCheckinForm();
    tick();

    expect(component.checkinSubmitSuccess).toBeFalsy();
    expect(component.checkinSubmitError).toBeTruthy();
    expect(component.checkinErrorNotification?.type).toBe('error');
    expect(component.checkinErrorNotification?.message).toBe(errorMessage);
  }));

  it('should handle error scenario when form is invalid', () => {
    component.ngOnInit();

    component.submitCheckinForm();

    expect(component.checkinSubmitSuccess).toBeFalsy();
    expect(component.checkinSubmitError).toBeTruthy();
    expect(component.checkinErrorNotification?.type).toBe('error');
    expect(component.checkinErrorNotification?.message).toBe(
      'checkIn.errors.pageLevel'
    );
  });

  it('should show error for a specific control', () => {
    component.ngOnInit();

    component.checkinForm.get('bookingCode')?.setValue('InvalidBookingCode');

    expect(component.shouldShowError('bookingCode')).toBeFalsy();
    expect(component.shouldShowError('familyName')).toBeFalsy();
  });

  it('should clear error for a specific control', () => {
    component.ngOnInit();

    component.checkinForm.get('bookingCode')?.setValue('InvalidBookingCode');
    component.clearError('bookingCode');

    expect(component.checkinSubmitError).toBeFalsy();
    expect(component.checkinErrorNotification).toBeNull();
  });
});
