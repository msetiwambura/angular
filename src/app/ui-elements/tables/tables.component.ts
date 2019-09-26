import {ChangeDetectionStrategy, Component, OnInit, Pipe, ViewChild} from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import {DatePipe} from "@angular/common";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {PatientService} from "../../shared/patient.service";
import {Patient} from "../../models/patient.model";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PaginationInstance} from "ngx-pagination";

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default
})
export class TablesComponent implements OnInit {
    // @ts-ignore
    myDate: string = new Date();
    allPatients: Patient[];
    p: number = 1;
    closeResult: string;

    constructor(private datePipe: DatePipe, private patientService: PatientService, private modalService: NgbModal) {
    }

    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

    getPatients() {
        this.patientService.getPatients().subscribe(
            (data: Patient[]) => {
                // @ts-ignore
                this.allPatients = data.results;
            }
        );
    }

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngOnInit() {
        this.paginator = this.paginator;
        this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
        this.getPatients();
    }

    open(content) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    /** pagination */
    public filter: string = '';
    public maxSize: number = 1000;
    public directionLinks: boolean = true;
    public autoHide: boolean = false;
    public responsive: boolean = false;
    public config: PaginationInstance = {
        id: 'advanced',
        itemsPerPage: 10,
        currentPage: 1
    };
    public labels: any = {
        previousLabel: 'Previous',
        nextLabel: 'Next',
        screenReaderPaginationLabel: 'Pagination',
        screenReaderPageLabel: 'page',
        screenReaderCurrentLabel: `You're on page`
    };

    onPageChange(number: number) {
        console.log('change to page', number);
        this.config.currentPage = number;
    }
}
