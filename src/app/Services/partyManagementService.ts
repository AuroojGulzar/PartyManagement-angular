
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Party } from '../models/party-management';



@Injectable({
  providedIn: 'root'
})
export class PartyService {
  private apiUrl = 'https://ap.greatfuturetechno.com/party/';

 
  constructor(private http: HttpClient) { 
  
  }
  // getPartyList(): Observable<any[]> {
  //   return this.http.get<any[]>(this.url);
  // }
  token=localStorage.getItem("token");
  getPartyData(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Token ${this.token}`);
    return this.http.get(this.apiUrl, { headers });
  }

  getPartyDataById(id:any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Token ${this.token}`);
    return this.http.get(`https://ap.greatfuturetechno.com/party/?id=${id}`, { headers });
  }
// Inside your service
// PostPartyData(updatedData: Party): Observable<any> {
//   // Convert the address array to a string before sending the request
//   const updatedDataCopy = { ...updatedData }; // Create a copy of the object to avoid modifying the original
  
//   // updatedDataCopy.address = JSON.stringify(updatedDataCopy.address);
  
//   const headers = new HttpHeaders().set('Authorization', `Token ${this.token}`);
//   return this.http.post(this.apiUrl, updatedDataCopy, { headers }).pipe(
//     map(response => {
//       // If you need to parse the response from the server
//       // You can do it here before passing it back to the component
//       return response;
//     })
//   );



updatePartyDataById( id:number,updatedData: Party): Observable<any> {
 
    const headers = new HttpHeaders().set('Authorization', `Token ${this.token}`);
    return this.http.post(`https://ap.greatfuturetechno.com/party/?id=${id}`, updatedData, { headers });
  }
   PostPartyData( updatedData: Party): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Token ${this.token}`);
    return this.http.post(this.apiUrl, updatedData, { headers });
  }
 
  
  deletePartyDataById(id:any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Token ${this.token}`);
    return this.http.delete(`https://ap.greatfuturetechno.com/party/?id=${id}`, { headers });
  }
 
}

