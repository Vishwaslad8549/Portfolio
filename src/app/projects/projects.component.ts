import { Component } from '@angular/core';
import { Project } from '../models/projects';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'E-commerce Platform',
      description: 'Full-featured Angular e-commerce solution with NgRx state management',
      technologies: ['Angular', 'NgRx', 'Firebase', 'SCSS'],
      image: 'assets/images/project1.jpg',
      link: '#'
    },
    {
      title: 'Real-time Dashboard',
      description: 'Data visualization dashboard with real-time updates using WebSocket',
      technologies: ['Angular', 'RxJS', 'Chart.js', 'Node.js'],
      image: 'assets/images/project2.jpg',
      link: '#'
    },
    // Add more projects
  ];
}
