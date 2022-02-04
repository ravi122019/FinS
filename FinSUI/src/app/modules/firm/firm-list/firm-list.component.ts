import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  constructor(private firmService: FirmService, private modalService: NgbModal, private formBuilder: FormBuilder) { }

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
      console.log('firmData..', firmData);
      this.firmData = firmData;
      this.isLoading = false;
    }, (error: any) => {
      console.log(error);
      this.isLoading = false;
    });
  }

  openFirmModal(targetModal: NgbModal, firm: any) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    if (firm == null) {
      this.editAddLabel = 'Add'
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
    const payload = this.editClient.value
    if (this.editAddLabel === 'Edit') {
      for (const key in payload) {
        this.editedFirm[key] = payload[key];
      }
      this.subscription = this.firmService.edirFirms(this.editedFirm).subscribe(response => {
        this.isLoading = false;
        this.closeBtnClick();
      }, (error: any) => {
        console.log(error);
        this.isLoading = false;
      })
    } else {
      this.subscription = this.firmService.postFirms(payload).subscribe(response => {
        this.isLoading = false;
        this.closeBtnClick();
      }, (error: any) => {
        console.log(error);
        this.isLoading = false;
      })
    }
  }

  closeBtnClick() {
    this.modalService.dismissAll();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
