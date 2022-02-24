import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { MESSAGES } from 'src/app/shared/constants/messages.constant';
import { USER_COLUMN } from 'src/app/shared/constants/user/user.constant';
import { UserService } from 'src/app/shared/services/common/user/user.service';
import { CommonUtils } from 'src/app/shared/utils/common-utils';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  isLoading = false;
  private subscription: Subscription;
  userInfo = [];
  readonly USER_COLUMN = USER_COLUMN;
  readonly MESSAGES = MESSAGES;
  isServiceError = false;
  userId;
  constructor(private userService: UserService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  getUsers(): void {
    this.isLoading = true;
    this.subscription = this.userService.getUsers().subscribe(userData => {
      console.log(userData);
      CommonUtils.formCompleteAddress(userData);
      CommonUtils.formFullName(userData);
      this.userInfo = userData;
      this.isLoading = false;
    }, (error: any) => {
      console.log(error);
      this.isLoading = false;
    });
  }

  showDeleteUser(targetModal: NgbModal, userId: number): void {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    this.userId = userId;
    this.isServiceError = false;
  }

  confirmDeleteUser(): void {
    this.isLoading = true;
    this.subscription = this.userService.deleteUser(this.userId).subscribe(response => {
      this.isLoading = false;
      this.closeBtnClick();
      this.getUsers();
      this.notifier.notify( 'success', MESSAGES.user.delete );
    }, (error: any) => {
      console.log(error);
      this.isLoading = false;
      this.isServiceError = true;
    })
  }

  closeBtnClick() {
    this.modalService.dismissAll();
  }

  _csearchTerm: string = '';
  get csearchTerm(): string {
    return this._csearchTerm;
  }
  set csearchTerm(val: string) {
    this._csearchTerm = val;
    this.userInfo = this.cfilter(val);
  }

  cfilter(v: string) {
    return this.userInfo.filter(x => x.Name?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      x.UserName?.toLowerCase().indexOf(v.toLowerCase()) !== -1 || x.Email?.toLowerCase().indexOf(v.toLowerCase()) !== -1);
  }
}
