import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(20)]]
  });

  constructor(private fb: FormBuilder) { }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form data:', this.contactForm.value);
      // Add your submission logic here
      this.contactForm.reset();
    }
  }
}
