import { Component } from '@angular/core';
import { Project } from '../models/projects';
import { buildAppUrl, APP_CONFIG } from '../config/app-config';
import { AnalyticsService } from '../services/analytics.service';

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
      link: buildAppUrl(APP_CONFIG.apps.postify.baseUrl, 'project_card_demo'),
      githubLink: 'https://github.com/Vishwaslad8549/angular-postify'
    },
    {
      title: 'Portfolio Website',
      description: 'Personal portfolio website built with Angular framework.',
      technologies: ['Angular', 'EmailJs', 'Html','SCSS','Typescript'],
      images: ['assets/Portfolio/Contact.png', 'assets/Portfolio/Landing Page.png','assets/Portfolio/Skills.png'],
      link: 'https://vishwasladweb.site',
      githubLink: 'https://github.com/Vishwaslad8549/Portfolio'
    },
    {
      title: 'Transcriber',
      description: 'AI-powered transcription tool using Groq API for fast and accurate audio transcription',
      technologies: ['Angular', 'Groq API', 'Html','SCSS','Typescript'],
      images: ['assets/Transcribe/Home.png', 'assets/Transcribe/transcribe.png'],
      link: buildAppUrl(APP_CONFIG.apps.transcriber.baseUrl, 'project_card_demo'),
      githubLink: 'https://github.com/Vishwaslad8549/transcriber'
    }
  ];
  isSliderOpen = false;
  selectedProjectIndex = 0;
  selectedImageIndex = 0;

  constructor(private analytics: AnalyticsService) {}

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

  trackProjectClick(project: string, eventName: string) {
    this.analytics.trackEvent(eventName, { 
      project_name: project,
      link_name: eventName === 'project_demo_click' ? `${project} Demo` : `${project} GitHub`
    });
  }
}
