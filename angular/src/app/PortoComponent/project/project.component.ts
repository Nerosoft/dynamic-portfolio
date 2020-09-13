import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input('buttons')buttons:any[]
  @Input('projects')projects:any[]
  @Input('username')username:any
  @Input('urls')urls:any
  @Input('navLi')navLi:any[]
  
  constructor() { }

  ngOnInit() {
    
  }

  updateUrlProject(even, i) {
    even.target.src = '../../../assets/images/project.jpg'
    setTimeout(() => {
      even.target.src = this.projects[i].img
    }, 11000)
  }


}

