import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetApiEndPoints } from 'src/app/shared/constants/endPoints.constant';
import { HttpClientCoreService } from '../../core/http-client/http-client-core.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpClientCoreService) { }

  public getUsers(): Observable<any> {
    const endPoint = `${GetApiEndPoints.getUser.getUrl()}`;
    return this.httpService.get(endPoint);
  }
}
