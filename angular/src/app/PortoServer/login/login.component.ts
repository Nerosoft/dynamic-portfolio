import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/toasts/toast-service';
import { userServes } from '../../PortoComponent/display/userServes'
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName = ''
  password = ''
  LOGINSTATE = false
  constructor(public toastService: ToastService,
    private userServes: userServes,) { }

  ngOnInit() {

  }


  login(dangerTpl) {
    this.getUserInformation(this.userName, this.password, dangerTpl)
  }

  getUserInformation(username, password, dangerTpl) {
    let login =this.userServes.getUsersLogin().subscribe(users => {


      Object.values(users).forEach((user: any) => {
        if (user.username == username && user.password == password) {
          this.userName = user.username
          this.password = user.password
          this.LOGINSTATE = true
        }
      })
 
      if (this.LOGINSTATE){
        this.toastService.show('sucssesful Login', { classname: 'bg-success text-light', delay: 10000 });
        login.unsubscribe()
      }
      else
        this.toastService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 15000 });
    })
  }

}
