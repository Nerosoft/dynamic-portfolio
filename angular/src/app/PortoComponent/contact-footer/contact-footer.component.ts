import { Component, OnInit, Input } from '@angular/core';
import { AlertComponent } from 'src/app/PortoServer/alert/alert.component';
import { PortfolioServices } from 'src/app/PortfolioServices';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpEventType } from '@angular/common/http';
import { ToastService } from 'src/app/toasts/toast-service';
import { isNumber } from 'util';

@Component({
  selector: 'app-contact-footer',
  templateUrl: './contact-footer.component.html',
  styleUrls: ['./contact-footer.component.css']
})
export class ContactFooterComponent implements OnInit {
  phone=''
  mes=''
  email=''
  stphone=false
  stmes=false
  stemail=false
  @Input('username')username
  @Input('urls')urls
  @Input('title')title
  constructor( private makeReq: PortfolioServices,
    private _modalService: NgbModal,
    public toastService: ToastService,) { }

  ngOnInit() {
  }

  validSms(){
    let state =false
    this.stphone=false
    this.stmes=false
    this.stemail=false
      if(isNumber(this.phone)||this.phone.length!=11){
        state=true
        this.stphone=true
        this.makeTostError("Please Check From Phone")
      }
      if(this.mes.length<3){
        state=true
        this.stmes=true
        this.makeTostError("Please Check From Message")
      }
      if(this.email.length<7){
        state=true
        this.stemail=true
        this.makeTostError("Please Check From Email")
      }
      return state
  }

  sendMessage(){
    if(this.validSms())
     return
    const modalRef = this._modalService.open(AlertComponent);
    modalRef.componentInstance.title = 'Send Message To '+this.username
    modalRef.componentInstance.item = this.username
    modalRef.componentInstance.callback = (modal) => {
      const config = {
        username:this.username,
        password: '',
        email:this.email,
        phone:this.phone,
        mes:this.mes
      }
      this.makeReq.servPostJson('api/sendmessage', config, (res) => {
        this.phone=''
        this.mes=''
        this. email=''
        this.toastService.show("Successfully", { classname: 'bg-success text-light', delay: 7000 });
        modal.close('Ok click')
      })

    }
  }
  makeTostError(mes) {
    this.toastService.show(mes, { classname: 'bg-danger text-light', delay: 7000 });
}
}
