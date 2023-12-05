import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { SharedModuleModule } from '../../../shared-module/shared-module.module';
import { Notification } from '../../../models/notification-model';
import { CheckinService } from '../../../services/checkin.service';

@Component({
  selector: 'app-checkin-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModuleModule,
  ],
  templateUrl: './checkin-form.component.html',
  styleUrl: './checkin-form.component.scss',
})
export class CheckinFormComponent implements OnInit {
  checkinSubmitSuccess = false;
  checkinSubmitError = false;
  formStatus: string = '';
  checkinForm!: FormGroup;
  checkinErrorNotification: Notification | null = null;

  constructor(
    private translate: TranslateService,
    private checkinService: CheckinService
  ) {}

  ngOnInit() {
    this.checkinForm = new FormGroup({
      bookingCode: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]+$/),
      ]),
      familyName: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+$/),
      ]),
    });
  }
  submitCheckinForm() {
    console.log('this.checkinForm.valid', this.checkinForm);
    if (this.checkinForm?.valid) {
      const bookingCode = this.checkinForm?.get('bookingCode')?.value;
      const familyName = this.checkinForm?.get('familyName')?.value;
      this.checkinSubmitSuccess = true;
      this.checkinSubmitError = false;
      // Call the checkin method from CheckinService
      this.checkinService.checkin(bookingCode, familyName).subscribe(
        (response) => {
          switch (response.status) {
            case 200:
              // Handle success scenario
              console.log(
                'Check-in successful. Confirmation message received.'
              );
              this.checkinErrorNotification = new Notification(
                'success',
                'checkIn.success.message'
              );
              break;
            case 400:
            case 401:
            case 500:
              console.log(
                'Check-in successful. Confirmation message received.'
              );
              this.checkinErrorNotification = new Notification(
                'error',
                `Code: ${response.code} - Discription: ${response.discription}`
              );
              break;
            default:
              this.checkinErrorNotification = new Notification(
                'error',
                response.discription
              );
          }
        },
        (error) => {
          // Handle error scenario
          console.error('Check-in failed:', error);
          this.checkinSubmitError = true;
          this.checkinSubmitSuccess = false;
          this.checkinErrorNotification = new Notification('error', error);
        }
      );
    } else {
      this.checkinSubmitError = true;
      this.checkinSubmitSuccess = false;
      this.checkinErrorNotification = new Notification(
        'error',
        'checkIn.errors.pageLevel'
      );
    }
  }

  shouldShowError(controlName: string): boolean {
    const control = this.checkinForm.get(controlName);
    return (
      (control?.invalid && (control?.dirty || control?.touched)) ||
      this.checkinSubmitError
    );
  }

  clearError(controlName: string): void {
    const control = this.checkinForm.get(controlName);
    if (control) {
      //control.setErrors(null);
    }
    this.checkinSubmitError = false;
    this.checkinErrorNotification = null;
  }
}
