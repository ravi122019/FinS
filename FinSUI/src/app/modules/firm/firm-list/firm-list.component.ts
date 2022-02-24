import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { NotifierOptions, NotifierService } from 'angular-notifier';
import { merge, Observable, OperatorFunction, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { LOCATION } from 'src/app/shared/constants/common/location.constant';
import { FIRM_COLUMN } from 'src/app/shared/constants/firm/firm.constant';
import { MESSAGES } from 'src/app/shared/constants/messages.constant';
import { FirmService } from 'src/app/shared/services/common/firm/firm.service';
import { CommonUtils } from 'src/app/shared/utils/common-utils';
@Component({
  selector: 'app-firm-list',
  templateUrl: './firm-list.component.html',
  styleUrls: ['./firm-list.component.scss']
})
export class FirmListComponent implements OnInit, OnDestroy {
  firmData = [];
  readonly FIRM_COLUMN = FIRM_COLUMN;
  readonly MESSAGES = MESSAGES;
  private subscription: Subscription;
  editAddLabel: string = 'Edit';
  editClient: FormGroup;
  isLoading = true;
  private editedFirm;
  totalLengthOfCollection = 0;
  private firmId: number;
  isServiceError = false;
  locationData = LOCATION;
  districtList = [];
  cityList = [];
  errorMsg = '';
  throttle = 300;
  isInline = false;
  offset=0;
  numberOfFirms = 0;
  constructor(private firmService: FirmService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private notifier: NotifierService) { 
    }

  ngOnInit(): void {
    this.editClient = this.formBuilder.group({
      name: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      emailId: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      registrationId: [''],
      pancard:['', Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}")]
    });
    this.getFirms(true);
  }

  getFirms(isInit: boolean): void {
    this.isLoading = isInit;
    if (this.isInline) {
      return;
    }
    this.isInline = !isInit;
    this.subscription = this.firmService.getFirms(this.offset).subscribe(firmData => {
      CommonUtils.formCompleteAddress(firmData.content);
      this.numberOfFirms = firmData.totalElements;
      this.firmData = [...this.firmData, ...firmData.content];
      this.isLoading = this.isInline = false;
    }, (error: any) => {
      console.log(error);
      this.isLoading = this.isInline = false;
    });
  }

  showDeleteFirm(targetModal: NgbModal, firmId: number): void {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    this.firmId = firmId;
    this.isServiceError = false;
  }

  confirDeleteFirm(): void {
    this.isLoading = true;
    this.subscription = this.firmService.deleteFirms(this.firmId).subscribe(response => {
      this.isLoading = false;
      this.closeBtnClick();
      this.getFirms(true);
      this.notifier.notify( 'success', MESSAGES.firm.delete );
    }, (error: any) => {
      console.log(error);
      this.isLoading = false;
      this.isServiceError = true;
    })
  }

  openFirmModal(targetModal: NgbModal, firm: any) {
    this.isServiceError = false;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    if (firm == null) {
      this.editAddLabel = 'Add';
      this.editClient.reset();
    }

    if (firm != null) {
      this.districtList = Object.keys(this.locationData);
      this.cityList = this.locationData[firm.district];
      // this.clientDetail = client;
      this.editAddLabel = 'Edit'
      setTimeout(() => {
        this.editClient.patchValue({
          name: firm.name,
          mobileNumber: firm.mobileNumber,
          emailId: firm.emailId,
          state: firm.state,
          district: firm.district,
          city: firm.city,
          address: firm.address,
          registrationId: firm.registrationId,
          pancard:firm.pancard
        });
      });
      this.editedFirm = firm;
    }
  }

  saveFirms(): void {
    this.isLoading = true;
    const payload = this.editClient.value
    if (this.editAddLabel === 'Edit') {
      for (const key in payload) {
        this.editedFirm[key] = payload[key];
      }
      this.subscription = this.firmService.edirFirms(this.editedFirm).subscribe(response => {
        this.handleFirmSuccess(this.editAddLabel);
      }, (error: any) => {
        this.handleFirmError(error);
      })
    } else {
      this.subscription = this.firmService.postFirms(payload).subscribe(response => {
        this.handleFirmSuccess(this.editAddLabel);
      }, (error: any) => {
        this.handleFirmError(error);
      })
    }
  }

  handleFirmError(error): void {
    this.isLoading = false;
    this.isServiceError = true;
    this.errorMsg = error;
  }

  handleFirmSuccess(editAddLabel): void {
    this.numberOfFirms = 0;
    this.offset = 0;
    this.firmData = [];
    this.isLoading = false;
    this.closeBtnClick();
    this.getFirms(true);
    this.notifier.notify( 'success', (editAddLabel === 'Edit') ? MESSAGES.firm.update : MESSAGES.firm.add );
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
    this.firmData = this.cfilter(val);
    this.totalLengthOfCollection = this.firmData.length;
  }

  cfilter(v: string) {
    return this.firmData.filter(x => x.Name?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      x.UserName?.toLowerCase().indexOf(v.toLowerCase()) !== -1 || x.Email?.toLowerCase().indexOf(v.toLowerCase()) !== -1);
  }

  stateChangeEvent(event): void {
    this.districtList = Object.keys(this.locationData);
    this.cityList = [];
    this.editClient.get('district').setValue('');
    this.editClient.get('city').setValue('');
  }

  districtChangeEvent(event): void {
    this.cityList = this.locationData[event];
    this.editClient.get('city').setValue('');
  }

  onScrollDown() {
    console.log('scrolled down!!');
    if (this.numberOfFirms !== 0 && this.firmData.length < this.numberOfFirms) {
      this.offset = this.offset + 1;
      this.getFirms(false);
    }
  }

  onScrollUp() {
    console.log('scrolled up!!');
  }
}
