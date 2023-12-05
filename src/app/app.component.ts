import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { I18nLabelService } from './services/i18n-label.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'airline-checkin-app';
  labels: any[] = []; // Adjust the type based on your label structure
  currentLanguage = 'en'; // Set default language, you may want to dynamically update this based on user preferences
  
  constructor(private translate: TranslateService, private i18nLabelService: I18nLabelService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
  
  ngOnInit(): void {
    this.fetchLabels();
  }

  changeLanguage(language: string): void {
    this.currentLanguage = language;
    this.fetchLabels();
  }

  private fetchLabels(): void {
    this.i18nLabelService.getLabels(this.currentLanguage).subscribe(
      (labels) => {
        this.labels = labels;
        console.log('Labels:', this.labels);
      },
      (error) => {
        console.error('Error fetching labels:', error);
      }
    );
  }
}
