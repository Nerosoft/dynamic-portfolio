import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-table-edit',
  templateUrl: './table-edit.component.html',
  styleUrls: ['./table-edit.component.css']
})
export class TableEditComponent implements OnInit {
  @Input() model;
  @Input() form;


  constructor(public modalN: NgbActiveModal,
     public _modalService: NgbModal,) { }

  ngOnInit() {
  }



}
