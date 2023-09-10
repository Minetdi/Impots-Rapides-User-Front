// import { Component, OnInit } from '@angular/core';
// import { GravityFormsService } from '../../Services/Gravity Forms/gravity-forms.service';


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


// @Component({
//   selector: 'app-accueil',
//   templateUrl: './accueil.component.html',
//   styleUrls: ['./accueil.component.scss']
// })


// export class AccueilComponent implements OnInit{

//   entries: any[] = [];
//   labels: { [key: string]: string } = {};
//   keys: string[] = [];

//   name = 'Progress Bar';

//   //Demo purpose only, Data might come from Api calls/service
//   public counts = ["Recieved","In Progress","Ready for Billing",
//   "Billed","Order Closed"];
//   public orderStatus = "In Progress"

//    constructor(private gravityFormsService: GravityFormsService) {}
//     ngOnInit() {
//         this.gravityFormsService.getFormEntries(1).subscribe((data: any) => {
//             this.entries = data.entries;
//             this.labels = {};

//             this.keys = Object.keys(this.entries[0]);

//             for (const key in formData) {
//                 if (Object.prototype.hasOwnProperty.call(this.entries[1], key)) {
//                     this.labels[formData[key]] = this.entries[1][key];
//                 }
//             }

//             console.log('Entries:', this.entries);
//             console.log('Labels:', this.labels);
//         });
//     }

//     getKeys(obj: any): string[] {
//       return Object.keys(obj);
//     }

    
//     filterData(data: string): string {
//       return data.split('|')[0];
//     }
// }


import { Component, OnInit } from '@angular/core';
import { GravityFormsService } from '../../Services/Gravity Forms/gravity-forms.service';

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
    selector: 'app-accueil',
    templateUrl: './accueil.component.html',
    styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

    entries: any[] = [];
    labels: { [key: string]: string } = {};
    keys: string[] = [];

    name = 'Progress Bar';

    public counts = ["Recieved", "In Progress", "Ready for Billing", "Billed", "Order Closed"];
    public orderStatus = "In Progress";

    constructor(private gravityFormsService: GravityFormsService) { }

    ngOnInit() {
        this.gravityFormsService.getFormEntries(1).subscribe((data: any) => {
            this.entries = data.entries;

            // Assuming that the 'Statut' field contains either 'Étudiant' or 'Salarié'
            const status = this.filterData(this.entries[1][52]);

            if (status === 'Étudiant') {
                this.mapFormData(studentFormData);
            } else if (status === 'Salarié') {
                this.mapFormData(employeeFormData);
            } 

            console.log('Entries:', this.entries);
            console.log('Labels:', this.labels);
            console.log('Status:', status);
        });
    }

    mapFormData(formData: { [key: number]: string }) {
        for (const key in formData) {
            if (Object.prototype.hasOwnProperty.call(this.entries[1], key)) {
                this.labels[formData[key]] = this.entries[1][key];
            }
        }
    }

    getKeys(obj: any): string[] {
        return Object.keys(obj);
    }

    filterData(data: string): string {
        return data.split('|')[0];
    }
}
