import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "../shared/patient.service";
import {Patient} from "../models/patient.model";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-forms',
    templateUrl: './forms.component.html',
    styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
    currentRate: any;
    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirdFormGroup: FormGroup;
    message: string;
    constructor(private _formBuilder: FormBuilder, private patientService : PatientService, private toastr: ToastrService) {
    }

    @ViewChild('instance') instance: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    ngOnInit() {
        this.currentRate = 8;
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
        });
    }

  registerPatients(patient: Patient){
        console.log(patient);
      this.patientService.registerPatients(patient).subscribe(
          (response)=>{
              // @ts-ignore
              this.message = response;
              // @ts-ignore
              if (this.message.message == 'Success' && this.message.code == 200) {
                  console.log(this.message)
                  this.toastr.success('Patient registered successfully', 'user registered');
              }else {
                  console.log(this.message);
              }
          }
      );

  }
}
