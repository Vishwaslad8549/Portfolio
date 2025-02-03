import { Component } from '@angular/core';
import { Skill} from '../models/skills';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  skills: Skill[] = [
    { name: 'Angular', level: 90, icon: 'fab fa-angular' },
    { name: 'TypeScript', level: 85, icon: 'fas fa-code' },
    { name: 'RxJS', level: 80, icon: 'fas fa-project-diagram' },
    { name: 'NgRx', level: 75, icon: 'fas fa-cube' },
    { name: 'SCSS', level: 85, icon: 'fab fa-sass' },
    { name: 'Node.js', level: 70, icon: 'fab fa-node' }
  ];
}
