import { Component, OnInit } from '@angular/core';
import { GravityFormsService } from '../../Services/Gravity Forms/gravity-forms.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    entries: any[] = [];


    constructor(private gravityFormsService: GravityFormsService) { }

    ngOnInit(): void {
      this.gravityFormsService.getFormEntries(1).subscribe((data: any) => {
        this.entries = data.entries;
      });
    }
}
