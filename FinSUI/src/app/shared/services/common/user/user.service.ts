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

  public addUser(payload): Observable<any> {
    const endPoint = GetApiEndPoints.getUser.getUrl();
    return this.httpService.post(endPoint, payload);
  }

  public editUser(payload): Observable<any> {
    const endPoint = `${GetApiEndPoints.getUser.getUrl()}/${payload.userId}`;
    return this.httpService.put(endPoint, payload);
  }

  public deleteUser(userId: number): Observable<any> {
    const endPoint = `${GetApiEndPoints.getUser.getUrl()}/${userId}`;
    return this.httpService.delete(endPoint);
  }
}
