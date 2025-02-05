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
      title: 'Postify',
      description: 'MEAN stack application which lets users post content online. The application is hosted on the Render hosting platform',
      technologies: ['Angular', 'MongoDb', 'ExpressJS', 'NodeJS','SCSS','RxJS'],
      images: ['assets/Postify/Create_post.jpg', 'assets/Postify/Postify_Login.png', 'assets/Postify/Posts.png'],
      link: 'https://latest-angular-postify.onrender.com'
    },
    {
      title: 'Portfolio Website',
      description: 'Personal portfolio website built with Angular framework.',
      technologies: ['Angular', 'EmailJs', 'Html','SCSS','Typescript'],
      images: ['assets/Portfolio/contact.jpg', 'assets/Portfolio/Home.jpg'],
      link: 'https://portfolio-jb6b.onrender.com'
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
