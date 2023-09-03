import { Component, OnInit } from '@angular/core';
import { GravityFormsService } from '../../Services/Gravity Forms/gravity-forms.service';
import { SharedService } from '../../Services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  entries: any[] = [];
  availableYears = [2023, 2022, 2021, 2020, 2019];
  selectedYear = this.availableYears[0];

  constructor(private gravityFormsService: GravityFormsService, private router: Router, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.gravityFormsService.getFormEntries(1).subscribe((data: any) => {
      this.entries = data.entries;
    });
  }

  // selectYear(year: number) {
  //   this.selectedYear = year;
  //   this.router.navigate([`/taxfile/${this.selectedYear}`]);
  // }

  selectYear(year: number) {
    this.selectedYear = year;
    this.sharedService.changeYear(year);
    this.router.navigate([`/taxfile/${this.selectedYear}/accueil`]);
}


}


