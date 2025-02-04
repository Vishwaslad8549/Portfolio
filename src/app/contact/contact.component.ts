import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import emailjs from 'emailjs-com';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  ismessagesent:boolean=false;
  isError:boolean=false;
  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(20)]]
  });

  constructor(private fb: FormBuilder) { }

  onSubmit() {
    if (this.contactForm.valid) {
      emailjs
        .send(
          environment.emailjs.serviceId, // Use Service ID from environment
          environment.emailjs.templateId, // Use Template ID from environment
          this.contactForm.value, // Form data
          environment.emailjs.userId // U
        )
        .then(
          (response) => {
            //console.log('Email sent successfully', response);
            //alert('Message sent successfully!');
            this.ismessagesent=true;
            this.contactForm.reset();
          },
          (error) => {
            console.error('Error sending email', error);
            this.isError=true
            //alert('Failed to send message. Please try again.');
          }
        );
    }
  }
}
