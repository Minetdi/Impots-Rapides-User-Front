import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GravityFormsService } from '../../Services/Gravity Forms/gravity-forms.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const baseFormData: { [key: number]: string } = {
  1: "Courriel",
  52: "Statut",
};

const studentFormData: { [key: number]: string } = {
  ...baseFormData,
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
  58: "Veuillez indiquer les crédits d'impots ou les déductions d'impots que vous souhaitez réclamer cette année"
};

const employeeFormData: { [key: number]: string } = {
  ...baseFormData,
  9: "Information pour salariés",
  78: "Nombre de relevés d'impôt",
  77: "Avez-vous des personnes a charge qui vivaient avec vous ?",
  16: "Si oui, combien?",
  42: "Si oui, combien de ces personnes a charge devons-nous faire des déclarations de revenus?",
  43: "Avez-vous gagné des revenus de travailleur autonome?",
  44: "Avez-vous gagné des revenus locatifs au cours de l'année?",
  45: "Avez-vous vendu votre résidence principale au cours de l'année?",
  46: "Avez-vous fait du télétravail durant l'année?",
  47: "Avez-vous engagé des dépenses liées a votre emploi pour lesquelles vous avez reçu un formulaire de votre employeur?",
  48: "Si oui",
  80: "Veuillez indiquer les crédits d'impots ou les déductions d'impots que vous souhaitez réclamer cette année"
};

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent {

  formLabels: string[] = [];
  labels: { [key: string]: string } = {};
  filesMap: { [key: string]: File[] } = {};

  faTrash = faTrash;
  constructor(private gravityFormsService: GravityFormsService, private http: HttpClient) {}

  ngOnInit() {
    this.gravityFormsService.getFormEntries(1).subscribe((data: any) => {
        const entries = data.entries;
        const status = this.filterData(entries[1][52]);  // Supposons que c'est l'ID pour "Veuillez indiquer les crédits d'impôts..."

        let formDataToUse;

        if (status === 'Étudiant') {
            formDataToUse = studentFormData;
        } else if (status === 'Salarié') {
            formDataToUse = employeeFormData;
        } else {
            formDataToUse = baseFormData;  // ou peut-être ne rien faire?
        }

        for (const key in formDataToUse) {
            if (Object.prototype.hasOwnProperty.call(entries[1], key)) {
                this.labels[formDataToUse[key]] = entries[1][key];
                this.filesMap[formDataToUse[key]] = [];
            }
        }
    });
 }

  onFilesAdded(event: any, label: string) {
    if (!this.filesMap[label]) {
      this.filesMap[label] = [];
    }

    const files: File[] = event.addedFiles;
    for (let file of files) {
      this.filesMap[label].push(file);
    }
  }

  removeFile(file: File, label: string) {
    const index = this.filesMap[label].indexOf(file);
    if (index > -1) {
      this.filesMap[label].splice(index, 1);
    }
  }

  onSubmit() {
    const formData = new FormData();

    for (let label in this.filesMap) {
      this.filesMap[label].forEach((file, index) => {
        formData.append(`${label}-file${index}`, file, file.name);
      });
    }
    
    // Remplacez l'URL par votre webhook
    this.http.post('https://hook.us1.make.com/vnsq2try16efe6qhir1xvhoxal1lxd6r', formData).subscribe(
      response => {
        console.log('Upload réussi', response);
      },
      error => {
        console.error('Erreur pendant l’upload', error);
      }
    );
  }

  filterData(data: string): string {
    return data.split('|')[0];
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}