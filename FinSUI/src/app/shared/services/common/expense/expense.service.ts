import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetApiEndPoints } from 'src/app/shared/constants/endPoints.constant';
import { HttpClientCoreService } from '../../core/http-client/http-client-core.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private httpService: HttpClientCoreService) { }

  public getExpenses(): Observable<any> {
    const endPoint = GetApiEndPoints.getExpense.getUrl()+'/getGlobal';
    return this.httpService.get(endPoint);
  }
  public postExpense(payload): Observable<any> {
    const endPoint = GetApiEndPoints.getExpense.getUrl();
    return this.httpService.post(endPoint, payload);
  }

  public editExpense(payload): Observable<any> {
    const endPoint = `${GetApiEndPoints.getExpense.getUrl()}/${payload.expenseTypeId}`;
    return this.httpService.put(endPoint, payload);
  }

  public deleteExpense(expenseTypeId: number): Observable<any> {
    const endPoint = `${GetApiEndPoints.getExpense.getUrl()}/${expenseTypeId}`;
    return this.httpService.delete(endPoint);
  }
}
