import { Component, OnInit, Input } from '@angular/core';





@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
@Input('realSkills')realSkills:[]
@Input('title')title

  constructor() { }

  ngOnInit() {
   // this.initJarallax();
  }
  initJarallax() {
 
    // this.jarallax.jarallax(document.querySelectorAll('.jarallax'), {
    //   speed: 0.5
    // });
  }
}
