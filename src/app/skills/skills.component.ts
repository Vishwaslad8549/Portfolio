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
    // { name: 'SCSS', level: 85, icon: 'fab fa-sass' },
    { name: 'NodeJS', level: 70, icon: 'fab fa-node' },
    // {name:'DexExpress',level:90,icon:'fas fa-database'},
    {name:'MongoDb',level:90,icon:'fas fa-leaf'},
    {name:'ExpressJS',level:90,icon:'fas fa-server'}
  ];
}
