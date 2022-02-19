import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetApiEndPoints } from 'src/app/shared/constants/endPoints.constant';
import { HttpClientCoreService } from '../../core/http-client/http-client-core.service';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  constructor(private httpService: HttpClientCoreService) { }

  public getDesignations(): Observable<any> {
    const endPoint = GetApiEndPoints.getDesignation.getUrl();
    return this.httpService.get(endPoint);
  }

  public postDesignation(payload): Observable<any> {
    const endPoint = GetApiEndPoints.getDesignation.getUrl();
    return this.httpService.post(endPoint, payload);
  }

  public editDesignation(payload): Observable<any> {
    const endPoint = `${GetApiEndPoints.getDesignation.getUrl()}/${payload.designationId}`;
    return this.httpService.put(endPoint, payload);
  }

  public deleteDesignation(designationId: number): Observable<any> {
    const endPoint = `${GetApiEndPoints.getDesignation.getUrl()}/${designationId}`;
    return this.httpService.delete(endPoint);
  }
}
