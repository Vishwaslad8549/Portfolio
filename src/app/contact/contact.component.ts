import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import emailjs from 'emailjs-com';
import { environment } from 'src/environments/environment';
import { AnalyticsService } from '../services/analytics.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  ismessagesent: boolean = false;
  isError: boolean = false;
  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(20)]]
  });

  constructor(private fb: FormBuilder, private analytics: AnalyticsService) {}

  ngOnInit(): void {
    this.analytics.trackEvent('section_view', { section_name: 'contact' });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      emailjs
        .send(
          environment.emailjs.serviceId,
          environment.emailjs.templateId,
          this.contactForm.value,
          environment.emailjs.userId
        )
        .then(
          (response) => {
            this.ismessagesent = true;
            this.isError = false;
            this.analytics.trackEvent('contact_form_submitted', {
              status: 'success'
            });
            this.contactForm.reset();
          },
          (error) => {
            console.error('Error sending email', error);
            this.isError = true;
            this.ismessagesent = false;
            this.analytics.trackEvent('contact_form_submitted', {
              status: 'error'
            });
          }
        );
    }
  }
}
