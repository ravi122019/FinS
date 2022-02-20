import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { NotifierOptions, NotifierService } from 'angular-notifier';
import { merge, Observable, OperatorFunction, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { FIRM_COLUMN } from 'src/app/shared/constants/firm/firm.constant';
import { MESSAGES } from 'src/app/shared/constants/messages.constant';
import { FirmService } from 'src/app/shared/services/common/firm/firm.service';
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
  locationData = {
    "Ahmednagar": ["Nagar", "Shevgaon", "Pathardi", "Parner", "Sangamner", "Kopargaon", "Akole", "Shrirampur", "Nevasa", "Rahata", "Rahuri", "Shrigonda", "Karjat", "Jamkhed"],
    "Akola": ["Akola", "Akot", "Telhara", "Balapur", "Patur", "Murtajapur", "Barshitakli"],
    "Amravati": ["Amravati", "Bhatukali", "Nandgaon Khandeshwar", "Dharni", "Chikhaldara", "Achalpur", "Chandurbazar", "Morshi", "Warud", "Daryapur", "Anjangaon-Surji", "Chandur", "Dhamangaon", "Tiosa"],
    "Aurangabad": ["Aurangabad", "Kannad", "Soegaon", "Sillod", "Phulambri", "Khuldabad", "Vaijapur", "Gangapur", "Paithan"],
    "Beed": ["Beed", "Ashti", "Patoda", "ShirurKasar", "Georai", "Majalgaon", "Wadwani", "Kaij", "Dharur", "Parli", "Ambejogai"],
    "Bhandara": ["Bhandara", "Tumsar", "Pauni", "Mohadi", "Sakoli", "Lakhni", "Lakhandur"],
    "Buldhana": ["Buldhana", "Chikhli", "Deulgaon Raja", "Jalgaon Jamod", "Sangrampur", "Malkapur", "Motala", "Nandura", "Khamgaon", "Shegaon", "Mehkar", "Sindkhed Raja", "Lonar"],
    "Chandrapur": ["Chandrapur", "Saoli", "Mul", "Ballarpur", "Pombhurna", "Gondpimpri", "Warora", "Chimur", "Bhadravati", "Bramhapuri", "Nagbhid", "Sindewahi", "Rajura", "Korpana", "Jivati"],
    "Dhule": ["Dhule", "Sakri", "Sindkheda", "Shirpur"],
    "Gadchiroli": ["Gadchiroli", "Dhanora", "Chamorshi", "Mulchera", "Desaiganj", "Armori", "Kurkheda", "Korchi", "Aheri", "Bhamragad", "Sironcha"],
    "Gondia": ["Gondia", "Tirora", "Goregaon", "Arjuni Morgaon", "Amgaon", "Salekasa", "Sadak Arjuni", "Deori"],
    "Hingoli": ["Hingoli", "Sengaon", "Kalamnuri", "Basmath", "Aundha Nagnath"],
    "Jalgaon": ["Jalgaon", "Jamner", "Erandol", "Dharangaon", "Bhusawal", "Raver", "Muktainagar", "Bodwad", "Yawal", "Amalner", "Parola", "Chopda", "Pachora", "Bhadgaon", "Chalisgaon"],
    "Jalna": ["Jalna", "Bhokardan", "Jafrabad", "Badnapur", "Ambad", "Ghansawangi", "Partur", "Mantha"],
    "Kolhapur": ["Karvir", "Panhala", "Shahuwadi", "Kagal", "Hatkanangale", "Shirol", "Radhanagari", "Gaganbawada", "Bhudargad", "Gadhinglaj", "Chandgad", "Ajra"],
    "Latur": ["Latur", "Renapur", "Ahmedpur", "Jalkot", "Chakur", "Shirur Anantpal", "Ausa", "Nilanga", "Deoni", "Udgir"],
    "Mumbai": ["Kurla", "Andheri", "Borivali"],
    "Nagpur": ["Nagpur Urban", "Nagpur Rural", "Kamptee", "Hingna", "Katol", "Narkhed", "Savner", "Kalameshwar", "Ramtek", "Mouda", "Parseoni", "Umred", "Kuhi", "Bhiwapur"],
    "Nanded": ["Nanded", "Ardhapur", "Mudkhed", "Bhokar", "Umri", "Loha", "Kandhar", "Kinwat", "Himayatnagar", "Hadgaon", "Mahur", "Deglur", "Mukhed", "Dharmabad", "Biloli", "Naigaon"],
    "Nandurbar": ["Nandurbar", "Navapur", "Shahada", "Talode", "Akkalkuwa", "Akrani"],
    "Nashik": ["Nashik", "Igatpuri", "Dindori", "Peth", "Trimbakeshwar", "Kalwan", "Deola", "Surgana", "Baglan", "Malegaon", "Nandgaon", "Chandwad", "Niphad", "Sinnar", "Yeola"],
    "Osmanabad": ["Osmanabad", "Tuljapur", "Bhum", "Paranda", "Washi", "Kalamb", "Lohara", "Umarga"],
    "Palghar": ["Palghar", "Vasai", "Dahanu", "Talasari", "Jawhar", "Mokhada", "Vada", "Vikramgad"],
    "Parbhani": ["Parbhani", "Sonpeth", "Gangakhed", "Palam", "Purna", "Sailu", "Jintur", "Manwath", "Pathri"],
    "Pune": ["Pune City", "Haveli", "Khed Rajgurunagar", "Junnar", "Ambegaon Ghodegaon", "Maval Vadgaon", "Mulshi Paud", "Shirur", "Purandhar Saswad", "Velhe", "Bhor", "Baramati", "Indapur", "Daund"],
    "Raigad": ["Pen", "Alibaug", "Murud", "Panvel", "Uran", "Karjat", "Khalapur", "Mangaon", "Tala", "Roha", "Sudhagad", "Mahad", "Poladpur", "Shrivardhan", "Mhasla"],
    "Ratnagiri": ["Ratnagiri", "Sangameshwar", "Lanja", "Rajapur", "Chiplun", "Guhagar", "Dapoli", "Mandangad", "Khed"],
    "Sangli": ["Miraj", "Kavathe Mahankal", "Tasgaon", "Jat", "Walwa Islampur", "Shirala", "Khanapur Vita", "Atpadi", "Palus", "Kadegaon"],
    "Satara": ["Satara", "Jaoli", "Koregaon", "Wai", "Mahabaleshwar", "Khandala", "Phaltan", "Maan Dahiwadi", "Khatav Vaduj", "Patan", "Karad"],
    "Sindhudurg": ["Kankavli", "Vaibhavwadi", "Devgad", "Malwan", "Sawantwadi", "Kudal", "Vengurla", "Dodamarg"],
    "Solapur": ["Solapur North", "Barshi", "Solapur South", "Akkalkot", "Madha", "Karmala", "Pandharpur", "Mohol", "Malshiras", "Sangole", "Mangalvedhe"],
    "Thane": ["Thane", "Kalyan", "Murbad", "Bhiwandi", "Shahapur", "Ulhasnagar", "Ambarnath"],
    "Wardha": ["Wardha", "Deoli", "Seloo", "Arvi", "Ashti", "Karanja", "Hinganghat", "Samudrapur"],
    "Washim": ["Washim", "Malegaon", "Risod", "Mangrulpir", "Karanja", "Manora"],
    "Yavatmal": ["Yavatmal", "Arni", "Babhulgaon", "Kalamb", "Darwha", "Digras", "Ner", "Pusad", "Umarkhed", "Mahagaon", "Kelapur", "Ralegaon", "Ghatanji", "Wani", "Maregaon", "Zari Jamani"]
  };
  statesArr = ['Maharashtra'];
  districtList = [];
  cityList = [];
  errorMsg = '';
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
    this.getFirms();
  }

  getFirms(): void {
    this.isLoading = true;
    this.subscription = this.firmService.getFirms().subscribe(firmData => {
      this.setAddressFormat(firmData);
      this.firmData = firmData;
      this.isLoading = false;
    }, (error: any) => {
      console.log(error);
      this.isLoading = false;
    });
  }

  setAddressFormat(firmData): void {
    firmData.forEach(element => {
      element['fullAddress'] = `${element.address}, ${element.city}, ${element.district}, ${element.state}`;
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
      this.getFirms();
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
    this.isLoading = false;
    this.closeBtnClick();
    this.getFirms();
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
}
