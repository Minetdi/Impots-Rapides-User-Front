import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GravityFormsService } from './Services/Gravity Forms/gravity-forms.service';
import { SharedService } from './Services/shared.service';
import { HeaderComponent } from './Components/header/header.component';
import { MainComponent } from './Components/main/main.component';
import { SideNavComponent } from './Components/side-nav/side-nav.component';
import { FooterComponent } from './Components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfosComponent } from './Components/infos/infos.component'; 
import { CardComponent } from './Components/card/card.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { FamilleComponent } from './pages/famille/famille.component';
import { AccueilComponent } from './pages/accueil/accueil.component';


// const routes: Routes = [
//     { path: 'accueil', component: MainComponent },
//     { path: 'questionnaire', component: QuestionnaireComponent },
//     { path: 'documents', component: DocumentsComponent },
//     { path: 'famille', component: FamilleComponent },
//     // { path: 'taxfile/:year', component: MainComponent },
//     // { path: 'taxfile/:year/questionnaire', component: QuestionnaireComponent },
//     // { path: 'taxfile/:year/documents', component: DocumentsComponent },
//     // { path: 'taxfile/:year/famille', component: FamilleComponent },
// ];


const routes: Routes = [
    { path: 'taxfile/:year/accueil', component: AccueilComponent },
    { path: 'taxfile/:year/questionnaire', component: QuestionnaireComponent },
    { path: 'taxfile/:year/documents', component: DocumentsComponent },
    { path: 'taxfile/:year/famille', component: FamilleComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    SideNavComponent,
    FooterComponent,
    InfosComponent,
    CardComponent,
    QuestionnaireComponent,
    DocumentsComponent,
    FamilleComponent,
    AccueilComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  providers: [GravityFormsService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
