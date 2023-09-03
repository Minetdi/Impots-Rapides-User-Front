import { Component, OnInit } from '@angular/core';
import { GravityFormsService } from '../../Services/Gravity Forms/gravity-forms.service';
import { PersonalInfo, Questions, GeneralField } from './formulaire-structure.interface';

// const formData: { [key: number]: string } = {
//   7: "Profil fiscal",
//   1: "Courriel",
//   52: "Statut",
//   90: "Consentement",
//   8: "Information pour étudiant",
//   62: "Avez-vous gagné un revenu d'emploi au cours de l'année?",
//   63: "Nombre de paires de relevés T4/Relevé 1",
//   12: "Avez-vous gagné des revenus de travailleur autonome?",
//   75: "Si oui, combien?",
//   13: "Avez-vous gagné des revenus locatifs au cours de l'année?",
//   74: "Si oui, combien d'immeubles ?",
//   14: "Avez-vous fait du télétravail durant l'année?",
//   61: "Quelle méthode ?",
//   69: "Avez-vous des personnes a charge?",
//   70: "Si oui, combien de 0-17 ans?",
//   73: "Si oui, combien de 18 ans et plus?",
//   68: "Nombre de relevés d'impôt pour Vos personnes à charge",
//   58: "Veuillez indiquer les crédits d'impôts ou les déductions d'impôts que vous souhaitez réclamer cette année",
//   93: "Nom Complet",
//   94 : "Nom de famille",
//   93.3 : "Prenom",
//   // 94: "Nom utilisateur",
//   95: "Mot de passe",
//   96: "Téléphone",
//   97: "Addresse",
// };


// const personFormFields = [
//   { id: 'email', label: 'Courriel', type: 'email', placeholder: 'qwerz@gmail.com' },
//   { id: 'fiscalProfile', label: 'Profil fiscal', type: 'text', placeholder: 'Information pour étudiant' },
//   { id: 'selfEmployedIncome', label: 'Avez-vous gagné des revenus de travailleur autonome?', type: 'select', options: ['Oui', 'Non'] },
//   { id: 'rentalIncome', label: 'Avez-vous gagné des revenus locatifs au cours de l\'année?', type: 'select', options: ['Oui', 'Non'] },
//   { id: 'telework', label: 'Avez-vous fait du télétravail durant l\'année?', type: 'select', options: ['Oui', 'Non'] },
//   { id: 'status', label: 'Statut', type: 'text', placeholder: 'Etudiant' },
//   { id: 'incomeMethod', label: 'Quelle méthode ?', type: 'text', placeholder: '' },
//   { id: 'employmentIncome', label: 'Avez-vous gagné un revenu d\'emploi au cours de l\'année?', type: 'select', options: ['Oui', 'Non'] },
//   { id: 't4Count', label: 'Nombre de paires de relevés T4/Relevé 1', type: 'number', placeholder: '1' },
//   { id: 'dependentTaxReturnCount', label: 'Nombre de relevés d\'impôt pour Vos personnes à charge', type: 'number', placeholder: '' },
//   { id: 'dependents', label: 'Avez-vous des personnes a charge?', type: 'select', options: ['Oui', 'Non'] },
//   { id: 'dependents0to17', label: 'Si oui, combien de 0-17 ans?', type: 'number', placeholder: '' },
//   { id: 'dependents18plus', label: 'Si oui, combien de 18 ans et plus?', type: 'number', placeholder: '' },
//   { id: 'properties', label: 'Si oui, combien d\'immeubles ?', type: 'number', placeholder: '' },
//   { id: 'howMany', label: 'Si oui, combien?', type: 'number', placeholder: '' },
//   { id: 'lastName', label: 'Nom de famille', type: 'text', placeholder: 'qwertz' },
//   { id: 'password', label: 'Mot de passe', type: 'password', placeholder: '' },
//   { id: 'phone', label: 'Téléphone', type: 'tel', placeholder: '(819) 238-4105' },
//   { id: 'firstName', label: 'Prenom', type: 'text', placeholder: 'Qwertz' },
// ];




@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})

export class QuestionnaireComponent implements OnInit {
  entries: any[] = [];
  labels: { [key: string]: string } = {};
  keys: string[] = [];
  // selectedPerson: string = ''; // initialisez selectedPerson
  personName : string = ""
  persons = ['Person 1', 'Person 2', 'Person 3'];
  newFormFields :any[] = [];



  personForm: { personalInfo: PersonalInfo, questions: Questions } = {
    personalInfo: {
      email: '',
      lastName: '',
      firstName: '',
      password: '',
      phone: '',
      fiscalProfile: '',
      status: '',
      address: '',
      consent: '',
    },
    questions: {
      employmentIncome: '',
      t4Count: 0,
      selfEmployedIncome: '',
      howMany: 0,
      rentalIncome: '',
      properties: 0,
      telework: '',
      incomeMethod: '',
      dependents: '',
      dependents0to17: 0,
      dependents18plus: 0,
      dependentTaxReturnCount: 0,
      taxCreditsDeductions: '',
    }
  };

  formData: { [key: number]: string } = {
    7: "Profil fiscal",
    1: "Courriel",
    52: "Statut",
    90: "Consentement",
    8: "Information pour étudiant",
    62: "Avez-vous gagné un revenu d'emploi au cours de l'année?",
    63: "Nombre de paires de relevés T4/Relevé 1",
    12: "Avez-vous gagné des revenus de travailleur autonome?",
    75: "Si oui, combien?",
    13: "Avez-vous gagné des revenus locatifs au cours de l'année?",
    74: "Si oui, combien d'immeubles ?",
    14: "Avez-vous fait du télétravail durant l'année?",
    61: "Quelle méthode ?",
    69: "Avez-vous des personnes a charge?",
    70: "Si oui, combien de 0-17 ans?",
    73: "Si oui, combien de 18 ans et plus?",
    68: "Nombre de relevés d'impôt pour Vos personnes à charge",
    58: "Veuillez indiquer les crédits d'impôts ou les déductions d'impôts que vous souhaitez réclamer cette année",
    93: "Nom Complet",
    94 : "Nom de famille",
    93.3 : "Prenom",
    // 94: "Nom utilisateur",
    95: "Mot de passe",
    96: "Téléphone",
    97: "Addresse",
  };

  personFormFields = [
    { id: 'email', label: 'Courriel', type: 'email', placeholder: '' },
    { id: 'fiscalProfile', label: 'Profil fiscal', type: 'text', placeholder: '' },
    { id: 'selfEmployedIncome', label: 'Avez-vous gagné des revenus de travailleur autonome?', type: 'select', options: ['Oui', 'Non'], placeholder: '' },
    { id: 'rentalIncome', label: 'Avez-vous gagné des revenus locatifs au cours de l\'année?', type: 'select', options: ['Oui', 'Non'] },
    { id: 'telework', label: 'Avez-vous fait du télétravail durant l\'année?', type: 'select', options: ['Oui', 'Non'] },
    { id: 'status', label: 'Statut', type: 'text', placeholder: 'Etudiant' },
    { id: 'incomeMethod', label: 'Quelle méthode ?', type: 'text', placeholder: '' },
    { id: 'employmentIncome', label: 'Avez-vous gagné un revenu d\'emploi au cours de l\'année?', type: 'select', options: ['Oui', 'Non'] },
    { id: 't4Count', label: 'Nombre de paires de relevés T4/Relevé 1', type: 'number', placeholder: '1' },
    { id: 'dependentTaxReturnCount', label: 'Nombre de relevés d\'impôt pour Vos personnes à charge', type: 'number', placeholder: '' },
    { id: 'dependents', label: 'Avez-vous des personnes a charge?', type: 'select', options: ['Oui', 'Non'] },
    { id: 'dependents0to17', label: 'Si oui, combien de 0-17 ans?', type: 'number', placeholder: '' },
    { id: 'dependents18plus', label: 'Si oui, combien de 18 ans et plus?', type: 'number', placeholder: '' },
    { id: 'properties', label: 'Si oui, combien d\'immeubles ?', type: 'number', placeholder: '' },
    { id: 'howMany', label: 'Si oui, combien?', type: 'number', placeholder: '' },
    { id: 'lastName', label: 'Nom de famille', type: 'text', placeholder: 'qwertz' },
    { id: 'password', label: 'Mot de passe', type: 'password', placeholder: '' },
    { id: 'phone', label: 'Téléphone', type: 'tel', placeholder: '(819) 238-4105' },
    { id: 'firstName', label: 'Prenom', type: 'text', placeholder: 'Qwertz' },
  ];
 
  

   constructor(private gravityFormsService: GravityFormsService) {}
    ngOnInit() {
      this.gravityFormsService.getFormEntries(1).subscribe((data: any) => {
        this.entries = data.entries;
        this.keys = Object.keys(this.entries[0]);
        this.labels = {};
        
        this.entries.forEach(entry => {
          this.personName = entry['93.3'] + ' ' + entry['94'];
          this.persons.push(this.personName);
        });



       

        this.keys = Object.keys(this.entries[0]);

        for (const key in this.formData) {
            if (Object.prototype.hasOwnProperty.call(this.entries[1], key)) {
                this.labels[this.formData[key]] = this.entries[1][key];
                
            }
            
        }

        console.log('Courriel:', this.labels['Courriel']);
        console.log('Entries:', this.entries);
  
        this.newFormFields = this.personFormFields.map(field => {
          const newField: GeneralField = { ...field };
          for (const key in this.formData) {
            if (this.formData[key] === field.label) {
              newField['number'] = key;
              newField['label'] = field.label;
              newField['placeholder'] = this.entries[1][key];
              console.log('Label:', newField['label']);
              console.log('placeholder:', newField['placeholder']);
              break;
            }
          }
          return newField;
        });
        
        console.log('newFormFields:', this.newFormFields);
        console.log('field:', this.newFormFields[0]['id']);
        console.log('personForm:', this.personForm);
      });
    }
  


  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  filterData(data: string): string {
    return data.split('|')[0];
  }

  onSubmit() {
    console.log(this.personForm);
  }
}
