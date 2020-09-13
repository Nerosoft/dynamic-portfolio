import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PortfolioServices } from './PortfolioServices';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public isCollapsed = false;
  title = 'TypeScript Type';
    constructor( private service: PortfolioServices,
      private route: ActivatedRoute,
      private router: Router){
        if (!(window.location.pathname.includes("/portfolio/")||
        window.location.pathname.includes("/abdullah/")))
            window.location.replace("https://gallery-150e7.web.app/");
    }
  ngOnInit() {


    // this.route.paramMap.subscribe(params => {
    //   if(params.get('productId')!=null)
    //     this.router.navigate(['/portfolio']);
    // });


    // this.service.servGet('http://localhost:5000/test',(data,that)=>{
    //     console.log(data)
    // },this)
  }
  


}











// let users=[new employ("abdullah",24 ,789,123),new employ("ahmed",24 ,456,123),
// new employ("osama",24 ,159,123),new employ("mohamed",24 ,98756,123)]
// for (let index = 0; index < users.length; index++) 
// users[index].loginCredit(123);