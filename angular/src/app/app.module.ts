import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { AppComponent } from './app.component';
import { HttpClientModule ,HttpHeaders , HttpClient}    from '@angular/common/http';

import { AppBootstrapModule } from './app-bootstrab.module';
import { AboutMeComponent } from './PortoComponent/about-me/about-me.component';
import { ParallaxModule } from 'ngx-parallax';
import { NavbarComponent } from './PortoComponent/navbar/navbar.component';
import { SkillsComponent } from './PortoComponent/skills/skills.component';
import { DisplayComponent, NgbdModalContent } from './PortoComponent/display/display.component';
import { PortfolioServices } from './PortfolioServices';
import { ExperienceComponent } from './PortoComponent/experience/experience.component';
import { ProjectComponent } from './PortoComponent/project/project.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { ContactFooterComponent } from './PortoComponent/contact-footer/contact-footer.component';
import { SignInComponent } from './PortoServer/sign-in/sign-in.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateComponent, NgbdModalProject } from './PortoServer/update/update.component';
import { AlertComponent } from './PortoServer/alert/alert.component';
import { NgbdTableCompleteComponent } from './PortoServer/ngbd-table-complete/ngbd-table-complete.component';
import { TableEditComponent } from './PortoServer/ngbd-table-complete/edit/table-edit/table-edit.component';
import { LoginComponent } from './PortoServer/login/login.component';
import { ToastsComponent } from './toasts/toasts.component';
import { NgbdSortableHeader } from './PortoServer/ngbd-table-complete/sortable.directive';

const routes: Routes = [
  { path: 'portfolio/:productId', component: DisplayComponent },
  { path: 'abdullah/signin', component: SignInComponent },
  { path: 'abdullah/login', component: LoginComponent },
  // { path: 'abdullah/update', component: UpdateComponent },
];
 
@NgModule({
  declarations: [
    AppComponent,
    AboutMeComponent,
    NavbarComponent,
    SkillsComponent,
    DisplayComponent,
    NgbdModalContent,
    ExperienceComponent,
    ProjectComponent,
    ContactFooterComponent,
    SignInComponent,
    UpdateComponent,
    AlertComponent,
    NgbdModalProject,
    NgbdTableCompleteComponent,
    TableEditComponent,
    LoginComponent,
    ToastsComponent,
    NgbdSortableHeader
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppBootstrapModule,
    ParallaxModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),

  ],

  providers: [PortfolioServices,],
  entryComponents: [NgbdModalContent,AlertComponent,NgbdModalProject,TableEditComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
