import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { MESSAGES } from 'src/app/shared/constants/messages.constant';
import { Subscription } from 'rxjs';
import { ExpenseService } from 'src/app/shared/services/common/expense/expense.service';
import { EXPENSES_COLUMN } from 'src/app/shared/constants/expense/expense.constant';
@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpenseListComponent implements OnInit, OnDestroy {
  expenseData = [];
  readonly EXPENSES_COLUMN = EXPENSES_COLUMN;
  readonly MESSAGES = MESSAGES;
  private subscription: Subscription;
  editAddLabel: string = 'Edit';
  editClient: FormGroup;
  isLoading = true;
  private editedExpense;
  totalLengthOfCollection = 0;
  private expenseTypeId: number;
  isServiceError = false;
  firmID;

  constructor(private expenseService: ExpenseService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private notifier: NotifierService) { 
    }

  ngOnInit(): void {
    this.editClient = this.formBuilder.group({
      name: ['', Validators.required],
    });
    this.getExpenses();
    this.firmID= sessionStorage.getItem('firmId');
  }

  getExpenses(): void {
    this.isLoading = true;
    this.subscription = this.expenseService.getExpenses().subscribe(expenseData => {
      this.expenseData = expenseData;
      this.isLoading = false;
    }, (error: any) => {
      console.log(error);
      this.isLoading = false;
    });
  }

  showDeleteExpense(targetModal: NgbModal, expenseTypeId: number): void {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    this.expenseTypeId = expenseTypeId;
    this.isServiceError = false;
  }

  confirDeleteExpense(): void {
    this.isLoading = true;
    this.subscription = this.expenseService.deleteExpense(this.expenseTypeId).subscribe(response => {
      this.isLoading = false;
      this.closeBtnClick();
      this.getExpenses();
      this.notifier.notify( 'success', MESSAGES.expense.delete );
    }, (error: any) => {
      console.log(error);
      this.isLoading = false;
      this.isServiceError = true;
    })
  }

  openExpenseModal(targetModal: NgbModal, expense: any) {
    this.isServiceError = false;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    if (expense == null) {
      this.editAddLabel = 'Add';
      this.editClient.reset();
    }

    if (expense != null) {
      // this.clientDetail = client;
      this.editAddLabel = 'Edit'
      setTimeout(() => {
        this.editClient.patchValue({
          name: expense.name,
        });
      });
      this.editedExpense = expense;
    }
  }

  saveExpense(): void {
    this.isLoading = true;
    const payload = this.editClient.value
    if (this.editAddLabel === 'Edit') {
      for (const key in payload) {
        this.editedExpense[key] = payload[key];
      }
      this.subscription = this.expenseService.editExpense(this.editedExpense).subscribe(response => {
        this.isLoading = false;
        this.closeBtnClick();
        this.getExpenses();
        this.notifier.notify( 'success', MESSAGES.expense.update );
      }, (error: any) => {
        console.log(error);
        this.isLoading = false;
        this.isServiceError = true;
      })
    } else {
      this.subscription = this.expenseService.postExpense(payload).subscribe(response => {
        this.isLoading = false;
        this.closeBtnClick();
        this.getExpenses();
        this.notifier.notify( 'success', MESSAGES.expense.add );
      }, (error: any) => {
        console.log(error);
        this.isLoading = false;
        this.isServiceError = true;
      })
    }
     
  }

  closeBtnClick() {
    this.modalService.dismissAll();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  _csearchTerm: string = '';
  get csearchTerm(): string {
    return this._csearchTerm;
  }
  set csearchTerm(val: string) {
    this._csearchTerm = val;
    this.expenseData = this.cfilter(val);
    this.totalLengthOfCollection = this.expenseData.length;
  }

  cfilter(v: string) {
    return this.expenseData.filter(x => x.Name?.toLowerCase().indexOf(v.toLowerCase()) !== -1);
  }
}
