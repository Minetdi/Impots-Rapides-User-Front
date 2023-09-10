import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GravityFormsService } from '../../Services/Gravity Forms/gravity-forms.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const formData: { [key: number]: string } = {
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

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent {

  formLabels: string[] = [];
  labels: { [key: string]: string } = {};
  filesMap: { [key: string]: File[] } = {}; // Nouvelle structure pour stocker les fichiers par champ

  faTrash = faTrash;
  constructor(private gravityFormsService: GravityFormsService, private http: HttpClient) {}

  ngOnInit() {
    this.gravityFormsService.getFormEntries(1).subscribe((data: any) => {
        const entries = data.entries;

        for (const key in formData) {
            if (Object.prototype.hasOwnProperty.call(entries[1], key)) {
                this.labels[formData[key]] = entries[1][key];
                this.filesMap[formData[key]] = [];  // Initialisez chaque clé ici
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