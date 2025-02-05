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
      images: ['assets/Postify_Login.png', 'assets/project1-2.jpg', 'assets/project1-3.jpg'],
      link: '#'
    },
    {
      title: 'Real-time Dashboard',
      description: 'Data visualization dashboard with real-time updates using WebSocket',
      technologies: ['Angular', 'RxJS', 'Chart.js', 'Node.js'],
      images: ['assets/Postify_Login.png', 'assets/project1-2.jpg', 'assets/project1-3.jpg'],
      link: '#'
    },
    // Add more projects
  ];
  isSliderOpen = false;
  selectedProjectIndex = 0;
  selectedImageIndex = 0;

  openSlider(projectIndex: number) {
    this.selectedProjectIndex = projectIndex;
    this.selectedImageIndex = 0;
    this.isSliderOpen = true;
  }

  closeSlider() {
    this.isSliderOpen = false;
  }

  prevImage() {
    if (this.selectedImageIndex > 0) {
      this.selectedImageIndex--;
    } else {
      this.selectedImageIndex = this.projects[this.selectedProjectIndex].images.length - 1;
    }
  }

  nextImage() {
    if (this.selectedImageIndex < this.projects[this.selectedProjectIndex].images.length - 1) {
      this.selectedImageIndex++;
    } else {
      this.selectedImageIndex = 0;
    }
  }
}
