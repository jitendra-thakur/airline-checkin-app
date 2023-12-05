import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateModule } from '@ngx-translate/core';
import { GraphQLModule } from './graphql.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { I18nLabelService } from './services/i18n-label.service';
import { of, throwError } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let i18nLabelServiceSpy: jasmine.SpyObj<I18nLabelService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('I18nLabelService', ['getLabels']);
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        [TranslateModule.forRoot()],
        GraphQLModule,
        HttpClientTestingModule,
      ],
      providers: [{ provide: I18nLabelService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    i18nLabelServiceSpy = TestBed.inject(
      I18nLabelService
    ) as jasmine.SpyObj<I18nLabelService>;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should fetch labels on initialization', () => {
    const mockLabels = [
      { key: 'label1', value: 'Value 1' },
      { key: 'label2', value: 'Value 2' },
    ];
    i18nLabelServiceSpy.getLabels.and.returnValue(of(mockLabels));

    fixture.detectChanges(); // Trigger ngOnInit

    expect(component.labels).toEqual(mockLabels);
  });

  it('should handle error when fetching labels', fakeAsync(() => {
    const errorMessage = 'Failed to fetch labels';
    i18nLabelServiceSpy.getLabels.and.returnValue(throwError(errorMessage));

    fixture.detectChanges(); // Trigger ngOnInit
    tick(); // Ensure async operations complete

    expect(component.labels).toEqual([]); // Ensure labels are not updated
  }));

  it('should change language and fetch labels', () => {
    const mockLabels = [
      { key: 'label3', value: 'Value 3' },
      { key: 'label4', value: 'Value 4' },
    ];
    i18nLabelServiceSpy.getLabels.and.returnValue(of(mockLabels));

    component.changeLanguage('fr');

    expect(component.currentLanguage).toBe('fr');
    expect(i18nLabelServiceSpy.getLabels).toHaveBeenCalledWith('fr');
    expect(component.labels).toEqual(mockLabels);
  });
});
