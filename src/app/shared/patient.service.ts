import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Patient} from "../models/patient.model";
import {Observable} from "rxjs";

const headerOp = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'x-api-key': '5656369689'})
}

@Injectable({
    providedIn: 'root'
})
export class PatientService {
    readonly regUrl = 'http://localhost/api/rest_api_m/index.php/api/patients/registerPatients';
    readonly getPatientUrl = 'http://localhost/api/rest_api_m/index.php/api/patients/getPatients';

    currentPatient: Patient = {
        firstname: '',
        middlename: '',
        surname: '',
        dob: '',
        tribe: '',
        nationality: '',
        referencenumber: '',
        employername: '',
        employerlocation: '',
        employeraddress: '',
        employeremail: '',
        employertelephone: '',
        patientphonenumber: '',
        patientaddress: '',
        patientoccupation: '',
        billType: '',
        InsuranceID: '',
        emailaddress: ''
    }


    constructor(private http: HttpClient) {
    }

    registerPatients(patient: Patient): Observable<Patient> {
        return this.http.post<Patient>(this.regUrl, patient, headerOp).pipe();
    }
    getPatients() : Observable<Patient[]>{
        return this.http.get<Patient[]>(this.getPatientUrl, headerOp);
    }
}
