import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { DESIGNATION_COLUMN } from 'src/app/shared/constants/designation/designation.constant';
import { MESSAGES } from 'src/app/shared/constants/messages.constant';
import { DesignationService } from 'src/app/shared/services/common/designation/designation.service';
import { Subscription } from 'rxjs';
import { DESIGNATIONS } from 'src/app/shared/constants/user/user.constant';
@Component({
  selector: 'app-designation-list',
  templateUrl: './designation-list.component.html',
  styleUrls: ['./designation-list.component.scss']
})
export class DesignationListComponent implements OnInit, OnDestroy {
  designationData = [];
  readonly DESIGNATION_COLUMN = DESIGNATION_COLUMN;
  readonly MESSAGES = MESSAGES;
  private subscription: Subscription;
  editAddLabel: string = 'Edit';
  editClient: FormGroup;
  isLoading = true;
  private editedDesignation;
  totalLengthOfCollection = 0;
  private designationId: number;
  isServiceError = false;
  firmID;

  constructor(private designationService: DesignationService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private notifier: NotifierService) { 
    }

  ngOnInit(): void {
    this.editClient = this.formBuilder.group({
      name: ['', Validators.required],
    });
    this.getDesignations();
    this.firmID= sessionStorage.getItem('firmId');
  }

  getDesignations(): void {
    this.isLoading = true;
    this.subscription = this.designationService.getDesignations().subscribe(designationData => {
      this.designationData = designationData;
      DESIGNATIONS.designationList = designationData.map(element => element.name);
      this.isLoading = false;
    }, (error: any) => {
      console.log(error);
      this.isLoading = false;
    });
  }

  showDeleteDesignation(targetModal: NgbModal, designationId: number): void {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    this.designationId = designationId;
    this.isServiceError = false;
  }

  confirDeleteDesignation(): void {
    this.isLoading = true;
    this.subscription = this.designationService.deleteDesignation(this.designationId).subscribe(response => {
      this.isLoading = false;
      this.closeBtnClick();
      this.getDesignations();
      this.notifier.notify( 'success', MESSAGES.designation.delete );
    }, (error: any) => {
      console.log(error);
      this.isLoading = false;
      this.isServiceError = true;
    })
  }

  openDesignationModal(targetModal: NgbModal, designation: any) {
    this.isServiceError = false;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    if (designation == null) {
      this.editAddLabel = 'Add';
      this.editClient.reset();
    }

    if (designation != null) {
      // this.clientDetail = client;
      this.editAddLabel = 'Edit'
      setTimeout(() => {
        this.editClient.patchValue({
          name: designation.name,
        });
      });
      this.editedDesignation = designation;
    }
  }

  saveDesignation(): void {
    this.isLoading = true;
    const payload = this.editClient.value
    if (this.editAddLabel === 'Edit') {
      for (const key in payload) {
        this.editedDesignation[key] = payload[key];
      }
      this.subscription = this.designationService.editDesignation(this.editedDesignation).subscribe(response => {
        this.isLoading = false;
        this.closeBtnClick();
        this.getDesignations();
        this.notifier.notify( 'success', MESSAGES.designation.update );
      }, (error: any) => {
        console.log(error);
        this.isLoading = false;
        this.isServiceError = true;
      })
    } else {
      this.subscription = this.designationService.postDesignation(payload).subscribe(response => {
        this.isLoading = false;
        this.closeBtnClick();
        this.getDesignations();
        this.notifier.notify( 'success', MESSAGES.designation.add );
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
    this.designationData = this.cfilter(val);
    this.totalLengthOfCollection = this.designationData.length;
  }

  cfilter(v: string) {
    return this.designationData.filter(x => x.Name?.toLowerCase().indexOf(v.toLowerCase()) !== -1);
  }
}
