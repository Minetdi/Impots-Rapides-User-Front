// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class GravityFormsService {
//   private baseUrl = 'https://ir-dev.impotsrapides.com/wp-json/gf/v2';
//   private labelsUrl = 'https://srv1005-files.hstgr.io/3c9eb8ae6b413208/files/domains/impotsrapides.com/public_html/dev/get_form_labels.php'
//   constructor(private http: HttpClient) {}

//   getFormEntries(formId: number): Observable<any> {
//     const url = `${this.baseUrl}/forms/${formId}/entries`;
//     const consumerKey = 'ck_8fd88178560dbec615345e6837e2c273ffc40790';
//     const consumerSecret = 'cs_6b0a94cee6161d782b983f7b2392d4c95dee8acc';
//     const headers = new HttpHeaders().set('Authorization', 'Basic ' + btoa(consumerKey + ':' + consumerSecret));
//     return this.http.get(url, { headers });
//   }

// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GravityFormsService {
  private baseUrl = 'https://ir-dev.impotsrapides.com/wp-json/gf/v2';
  private labelsUrl = 'https://srv1005-files.hstgr.io/3c9eb8ae6b413208/files/domains/impotsrapides.com/public_html/dev/get_form_labels.php';
  constructor(private http: HttpClient) {}

  getFormEntries(formId: number): Observable<any> {
    const url = `${this.baseUrl}/forms/${formId}/entries`;
    const consumerKey = 'ck_8fd88178560dbec615345e6837e2c273ffc40790';
    const consumerSecret = 'cs_6b0a94cee6161d782b983f7b2392d4c95dee8acc';
    const headers = new HttpHeaders().set('Authorization', 'Basic ' + btoa(consumerKey + ':' + consumerSecret));
    return this.http.get(url, { headers });
  }

  getFormLabels(): Observable<any> {
    return this.http.get(this.labelsUrl);
  }
}
