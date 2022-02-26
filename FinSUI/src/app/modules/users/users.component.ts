import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { LOCATION } from 'src/app/shared/constants/common/location.constant';
import { MESSAGES } from 'src/app/shared/constants/messages.constant';
import { BLOOD_GROUPS, USER_COLUMN } from 'src/app/shared/constants/user/user.constant';
import { DesignationService } from 'src/app/shared/services/common/designation/designation.service';
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
  readonly BLOOD_GROUPS = BLOOD_GROUPS;
  readonly MESSAGES = MESSAGES;
  isServiceError = false;
  userId;
  errorMsg = '';
  editUser: FormGroup;
  editAddLabel = 'Edit';
  locationData = LOCATION;
  statesArr = ['Maharashtra'];
  districtList = [];
  cityList = [];
  designationData = [];
  maxDate;

  constructor(private userService: UserService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private designationService: DesignationService) { }

  ngOnInit(): void {
    this.editUser = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      emailId: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      aadhar:['',  Validators.required],
      bloodGroup: ['', Validators.required],
      designation:['',  Validators.required],
      address: ['', Validators.required]
    });
    this.getUsers();
    this.maxDate = {year: new Date().getFullYear(), month: new Date().getMonth()+1, day: new Date().getDay()};
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  openUserModal(targetModal: NgbModal, firm: any) {
    this.isServiceError = false;

    this.isLoading = true;
    this.subscription = this.designationService.getDesignations().subscribe(designationData => {
      this.designationData = designationData.map(element => element.name);
      this.isLoading = false;
      this.modalService.open(targetModal, {
        centered: true,
        size: 'lg',
        backdrop: 'static'
      });
  
      if (firm == null) {
        this.editAddLabel = 'Add';
        this.editUser.reset();
      }
    }, (error: any) => {
      console.log(error);
      this.notifier.notify('error', MESSAGES.serviceError );
      this.isLoading = false;
    });
    // if (firm != null) {
    //   this.districtList = Object.keys(this.locationData);
    //   this.cityList = this.locationData[firm.district];
    //   // this.clientDetail = client;
    //   this.editAddLabel = 'Edit'
    //   setTimeout(() => {
    //     this.editClient.patchValue({
    //       name: firm.name,
    //       mobileNumber: firm.mobileNumber,
    //       emailId: firm.emailId,
    //       state: firm.state,
    //       district: firm.district,
    //       city: firm.city,
    //       address: firm.address,
    //       registrationId: firm.registrationId,
    //       pancard:firm.pancard
    //     });
    //   });
    //   this.editedFirm = firm;
    // }
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
      this.notifier.notify('error', MESSAGES.serviceError );
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
      this.notifier.notify('success', MESSAGES.user.delete );
    }, (error: any) => {
      console.log(error);
      this.isLoading = false;
      this.isServiceError = true;
    })
  }

  closeBtnClick() {
    this.modalService.dismissAll();
  }

  stateChangeEvent(event): void {
    this.districtList = Object.keys(this.locationData);
    this.cityList = [];
    this.editUser.get('district').setValue('');
    this.editUser.get('city').setValue('');
  }

  districtChangeEvent(event): void {
    this.cityList = this.locationData[event];
    this.editUser.get('city').setValue('');
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
