import { Component, OnInit  } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})


export class AppComponent implements OnInit {

  title = 'Impots Rapides';
  entries: any[] = [];
    keys: string[] = [];

  // constructor(private gravityFormsService: GravityFormsService) {}

  ngOnInit() {
    // this.gravityFormsService.getFormEntries(1).subscribe((data: any) => {
    //   this.entries = data.entries;
    //   this.keys = Object.keys(this.entries[0]);
    //   console.log(this.entries)
    // });
  }
}
