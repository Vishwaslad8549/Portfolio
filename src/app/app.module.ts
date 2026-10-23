import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { HeroComponent } from './hero/hero.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrackLinkDirective } from './directives/track-link.directive';
import { TrackSectionDirective } from './directives/track-section.directive';
import { AnalyticsService } from './services/analytics.service';
import { EngagementService } from './services/engagement.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent,
    HeroComponent,
    TrackLinkDirective,
    TrackSectionDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [AnalyticsService, EngagementService],
  bootstrap: [AppComponent]
})
export class AppModule { }
