import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  NotifierService } from 'angular-notifier';
import {  Subscription } from 'rxjs';
import { LOCATION } from 'src/app/shared/constants/common/location.constant';
import { LOCATION_COLUMN } from 'src/app/shared/constants/location/location.constant';
import { MESSAGES } from 'src/app/shared/constants/messages.constant';
import { LocationService } from 'src/app/shared/services/common/location/location.service';
import { CommonUtils } from 'src/app/shared/utils/common-utils';
@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit, OnDestroy {
  locationData = [];
  statesArr= ['Maharashtra'];
  readonly LOCATION_COLUMN = LOCATION_COLUMN;
  readonly MESSAGES = MESSAGES;
  private subscription: Subscription;
  editAddLabel: string = 'Edit';
  editClient: FormGroup;
  isLoading = true;
  private editedLocation;
  totalLengthOfCollection = 0;
  private locationId: number;
  isServiceError = false;
  locationPreData = LOCATION;
  districtList = [];
  cityList = [];
  errorMsg = '';
  throttle = 300;
  isInline = false;
  offset=0;
  numberOfLocations = 0;
  constructor(private locationService: LocationService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private notifier: NotifierService) { 
    }

  ngOnInit(): void {
    this.editClient = this.formBuilder.group({
      name: ['', Validators.required],
      state: ['', Validators.required],
      district: ['', Validators.required],
      city: ['', Validators.required],
    });
    this.getLocations(true);
  }

  getLocations(isInit: boolean): void {
    this.isLoading = isInit;
    if (this.isInline) {
      return;
    }
    this.isInline = !isInit;
    this.subscription = this.locationService.getLocations(this.offset).subscribe(locationData => {
      CommonUtils.formCompleteAddress(locationData.content);
      this.numberOfLocations = locationData.totalElements;
      this.locationData = [...this.locationData, ...locationData.content];
      this.isLoading = this.isInline = false;
    }, (error: any) => {
      console.log(error);
      this.isLoading = this.isInline = false;
    });
  }

  showDeleteLocation(targetModal: NgbModal, locationId: number): void {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    this.locationId = locationId;
    this.isServiceError = false;
  }

  confirDeleteLocation(): void {
    this.isLoading = true;
    this.subscription = this.locationService.deleteLocations(this.locationId).subscribe(response => {
      this.isLoading = false;
      this.closeBtnClick();
      this.getLocations(true);
      this.notifier.notify( 'success', MESSAGES.location.delete );
    }, (error: any) => {
      console.log(error);
      this.isLoading = false;
      this.isServiceError = true;
    })
  }

  openLocationModal(targetModal: NgbModal, location: any) {
    this.isServiceError = false;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    if (location == null) {
      this.editAddLabel = 'Add';
      this.editClient.reset();
    }

    if (location != null) {
      this.districtList = Object.keys(this.locationPreData);
      this.cityList = this.locationPreData[location.district];
      // this.clientDetail = client;
      this.editAddLabel = 'Edit'
      setTimeout(() => {
        this.editClient.patchValue({
          name: location.name,
          state: location.state,
          district: location.district,
          city: location.city
        });
      });
      this.editedLocation = location;
    }
  }

  saveLocations(): void {
    this.isLoading = true;
    const payload = this.editClient.value
    if (this.editAddLabel === 'Edit') {
      for (const key in payload) {
        this.editedLocation[key] = payload[key];
      }
      this.subscription = this.locationService.editLocations(this.editedLocation).subscribe(response => {
        this.handleLocationSuccess(this.editAddLabel);
      }, (error: any) => {
        this.handleLocationError(error);
      })
    } else {
      this.subscription = this.locationService.postLocations(payload).subscribe(response => {
        this.handleLocationSuccess(this.editAddLabel);
      }, (error: any) => {
        this.handleLocationError(error);
      })
    }
  }

  handleLocationError(error): void {
    this.isLoading = false;
    this.isServiceError = true;
    this.errorMsg = error;
  }

  handleLocationSuccess(editAddLabel): void {
    this.numberOfLocations = 0;
    this.offset = 0;
    this.locationData = [];
    this.isLoading = false;
    this.closeBtnClick();
    this.getLocations(true);
    this.notifier.notify( 'success', (editAddLabel === 'Edit') ? MESSAGES.location.update : MESSAGES.location.add );
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
    this.locationData = this.cfilter(val);
    this.totalLengthOfCollection = this.locationData.length;
  }

  cfilter(v: string) {
    return this.locationData.filter(x => x.Name?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      x.UserName?.toLowerCase().indexOf(v.toLowerCase()) !== -1 || x.Email?.toLowerCase().indexOf(v.toLowerCase()) !== -1);
  }

  stateChangeEvent(event): void {
    this.districtList = Object.keys(this.locationPreData);
    this.cityList = [];
    this.editClient.get('district').setValue('');
    this.editClient.get('city').setValue('');
  }

  districtChangeEvent(event): void {
    this.cityList = this.locationPreData[event];
    this.editClient.get('city').setValue('');
  }

  onScrollDown() {
    console.log('scrolled down!!');
    if (this.numberOfLocations !== 0 && this.locationData.length < this.numberOfLocations) {
      this.offset = this.offset + 1;
      this.getLocations(false);
    }
  }

  onScrollUp() {
    console.log('scrolled up!!');
  }
}
