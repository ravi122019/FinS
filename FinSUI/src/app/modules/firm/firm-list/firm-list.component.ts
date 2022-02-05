import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierOptions, NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { FIRM_COLUMN } from 'src/app/shared/constants/firm/firm.constant';
import { FirmService } from 'src/app/shared/services/common/firm/firm.service';

@Component({
  selector: 'app-firm-list',
  templateUrl: './firm-list.component.html',
  styleUrls: ['./firm-list.component.scss']
})
export class FirmListComponent implements OnInit, OnDestroy {
  firmData = [];
  readonly FIRM_COLUMN = FIRM_COLUMN;
  private subscription: Subscription;
  editAddLabel: string = 'Edit';
  editClient: FormGroup;
  isLoading = true;
  private editedFirm;
  totalLengthOfCollection = 0;
  private firmId: number;
  isServiceError = false;
  constructor(private firmService: FirmService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private notifier: NotifierService) { 
    }

  ngOnInit(): void {
    this.editClient = this.formBuilder.group({
      name: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      state: ['', Validators.required],
      district: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required]
    });

    this.subscription = this.firmService.getFirms().subscribe(firmData => {
      this.firmData = firmData;
      this.isLoading = false;
    }, (error: any) => {
      console.log(error);
      this.isLoading = false;
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
      this.notifier.notify( 'success', 'Firm Deleted Successfully!!' );
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
      // this.clientDetail = client;
      this.editAddLabel = 'Edit'
      this.editClient.patchValue({
        name: firm.name,
        mobileNumber: firm.mobileNumber,
        emailId: firm.emailId,
        state: firm.state,
        district: firm.district,
        city: firm.city,
        address: firm.address
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
        this.isLoading = false;
        this.closeBtnClick();
        this.notifier.notify( 'success', 'Firm Data Updated Successfully!!' );
      }, (error: any) => {
        console.log(error);
        this.isLoading = false;
        this.isServiceError = true;
      })
    } else {
      this.subscription = this.firmService.postFirms(payload).subscribe(response => {
        this.isLoading = false;
        this.closeBtnClick();
        this.notifier.notify( 'success', 'Firm Created Successfully!!' );
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
    this.firmData = this.cfilter(val);
    this.totalLengthOfCollection = this.firmData.length;
  }

  cfilter(v: string) {
    return this.firmData.filter(x => x.Name?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      x.UserName?.toLowerCase().indexOf(v.toLowerCase()) !== -1 || x.Email?.toLowerCase().indexOf(v.toLowerCase()) !== -1);
  }

}
