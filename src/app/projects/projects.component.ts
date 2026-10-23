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
      images: ['assets/Postify/Home.png', 'assets/Postify/Create.png', 'assets/Postify/Posts.png'],
      link: 'https://postify.vishwasladweb.site/'
    },
    {
      title: 'Portfolio Website',
      description: 'Personal portfolio website built with Angular framework.',
      technologies: ['Angular', 'EmailJs', 'Html','SCSS','Typescript'],
      images: ['assets/Portfolio/Contact.png', 'assets/Portfolio/Landing Page.png','assets/Portfolio/Skills.png'],
      link: 'https://vishwasladweb.site/'
    },
    {
      title: 'Transcribe',
      description: 'Personal transcription project',
      technologies: ['Angular', 'Groq API', 'Html','SCSS','Typescript'],
      images: ['assets/Transcribe/Home.png', 'assets/Transcribe/transcribe.png'],
      link: 'https://transcribe.vishwasladweb.site/'
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
