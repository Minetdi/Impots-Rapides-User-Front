import { Component, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GravityFormsService } from '../../Services/Gravity Forms/gravity-forms.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit{
  progress = 0;
  id : any = '';
  entries: any[] = [];

 constructor(private gravityFormsService: GravityFormsService) { }

  ngOnInit(): void {
    this.gravityFormsService.getFormEntries(1).subscribe((data: any) => {
      this.entries = data.entries;
      this.id = Object.keys(this.entries[1]);
    });
  }
      // Cette fonction est appelée chaque fois qu'une étape est complétée
    onStepCompleted() {
        this.progress += 33.33;
    }
}
