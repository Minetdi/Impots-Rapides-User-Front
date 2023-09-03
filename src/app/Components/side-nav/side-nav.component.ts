import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../Services/shared.service';
import { 
  faDashboard, 
  faLocation, 
  faShop,
  faBox,
  faMoneyBill,
  faChartBar,
  faContactBook,
  faFolderMinus,
  faHouse,
  faPersonShelter
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  faDashboard = faDashboard;
  faLocation = faLocation;
  faShop = faShop;
  faBox = faBox;
  faMoneyBill = faMoneyBill;
  faChartBar = faChartBar;
  faPersonShelter = faPersonShelter;
  faFolderMinus = faFolderMinus;
  faHouse = faHouse;


  selectedYear: number;

  constructor(private sharedService: SharedService) {
     this.sharedService.currentYear.subscribe(year => this.selectedYear = year);
     this.selectedYear = new Date().getFullYear(); // ajouter cette ligne
  }

  ngOnInit(): void {
  }
}
