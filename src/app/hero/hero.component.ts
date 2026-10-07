import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  animations: [
    trigger('fadeInUp', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('700ms cubic-bezier(0.16, 1, 0.3, 1)')
      ])
    ])
  ]
})
export class HeroComponent implements OnInit {
  animationState = 'in';

  ngOnInit() {
    // Trigger animation sequence
    setTimeout(() => {
      this.animationState = 'in';
    }, 100);
  }

  contactClick() {
    document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' });
  }
}
