import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OpenStreepMapService {

  constructor(private http: HttpClient) { }

  getMyLocal(lat: number, lon: number): Observable<Object> {
    return this.http.get("http://nominatim.openstreetmap.org/reverse?lat="+lat+"&lon="+lon+"&format=json")
  }
}