import {DecimalPipe} from '@angular/common';
import {Component, QueryList, ViewChildren, OnInit, Input} from '@angular/core';
import {Observable, config} from 'rxjs';
import {Country} from './country';
import {CountryService} from './country.service';
import {NgbdSortableHeader, SortEvent} from './sortable.directive';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TableEditComponent } from './edit/table-edit/table-edit.component';
import { AlertComponent } from '../alert/alert.component';
import { PortfolioServices } from 'src/app/PortfolioServices';
@Component({
  selector: 'app-ngbd-table-complete',
  templateUrl: './ngbd-table-complete.component.html',
  styleUrls: ['./ngbd-table-complete.component.css'],
  providers: [CountryService, DecimalPipe]
})
export class NgbdTableCompleteComponent implements OnInit {

  countries$: Observable<Country[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  @Input('hedTable') hedTable: [];
  @Input('info') info: any=[];
  @Input('userName') userName:string;
  @Input('password') password:string;
  @Input('form')form:string

  service: CountryService=null;
 

  constructor(public pipe: DecimalPipe,
    public _modalService: NgbModal,
    public makeReq:PortfolioServices) {
    this.service=new CountryService(pipe)
    this.countries$ = this.service.countries$;
    this.total$ = this.service.total$;

    
  }


  ngOnInit(): void {
    this.service.setup(this.info)//عشان اول مره يحمل

    
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }


  setupTableItem(info){

    this.service.setup(info)
  }

  displayItem(key){
   

    const modalRef = this._modalService.open(TableEditComponent,{ size: 'xl' });
    modalRef.componentInstance.model = this.info[key]
    modalRef.componentInstance.form =this.form
  }
  deletItem(key){
    const modalRef = this._modalService.open(AlertComponent);
    modalRef.componentInstance.title = 'Deleting'
    modalRef.componentInstance.item = 'item'
    modalRef.componentInstance.callback = (modal) => {

      const config = {
        username: this.userName,
        password: this.password,
        postion:(this.form=='mes')?'message':'login',
        index: key
      }

      this.makeReq.servPostJson('api/deletitem', config, (res) => {

        modal.close('Ok click')
      })

    }
  }
}
