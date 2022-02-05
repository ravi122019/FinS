import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetApiEndPoints } from 'src/app/shared/constants/endPoints.constant';
import { HttpClientCoreService } from '../../core/http-client/http-client-core.service';

@Injectable({
  providedIn: 'root'
})
export class FirmService {

  constructor(private httpService: HttpClientCoreService) { }

  public getFirms(): Observable<any> {
    const endPoint = GetApiEndPoints.getFirm.getUrl();
    return this.httpService.get(endPoint);
  }

  public postFirms(payload): Observable<any> {
    const endPoint = GetApiEndPoints.getFirm.getUrl();
    return this.httpService.post(endPoint, payload);
  }

  public edirFirms(payload): Observable<any> {
    const endPoint = `${GetApiEndPoints.getFirm.getUrl()}/${payload.firmId}`;
    return this.httpService.put(endPoint, payload);
  }

  public deleteFirms(firmId: number): Observable<any> {
    const endPoint = `${GetApiEndPoints.getFirm.getUrl()}/${firmId}`;
    return this.httpService.delete(endPoint);
  }
}
