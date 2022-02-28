import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetApiEndPoints } from 'src/app/shared/constants/endPoints.constant';
import { HttpClientCoreService } from '../../core/http-client/http-client-core.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpService: HttpClientCoreService) { }

  public getLocations(offset): Observable<any> {
    const endPoint = `${GetApiEndPoints.getLocation.getUrl()}/getPageList?offset=${offset}`;
    return this.httpService.get(endPoint);
  }

  public postLocations(payload): Observable<any> {
    const endPoint = GetApiEndPoints.getLocation.getUrl();
    return this.httpService.post(endPoint, payload);
  }

  public editLocations(payload): Observable<any> {
    const endPoint = `${GetApiEndPoints.getLocation.getUrl()}/${payload.id}`;
    return this.httpService.put(endPoint, payload);
  }

  public deleteLocations(id: number): Observable<any> {
    const endPoint = `${GetApiEndPoints.getLocation.getUrl()}/${id}`;
    return this.httpService.delete(endPoint);
  }
}
