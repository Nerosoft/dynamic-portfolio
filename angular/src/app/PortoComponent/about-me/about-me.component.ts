import { Component, OnInit, Input } from '@angular/core';
import { ParallaxModule, ParallaxConfig } from 'ngx-parallax';
import Parallax from '../../../assets/js/parallax.js';
@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {

  @Input('portfolio')portfolio:[];
  @Input('my_photo')my_photo:any;
  @Input('love_skills')love_skills:any[];

  constructor() {  }

  ngOnInit() {  
    this.initParallax();
  }
  initParallax() {
    let parallax = new Parallax(document.getElementById('scene'));
  }

  goSkills(){
    document.getElementById('skills').scrollIntoView({behavior: 'smooth'});
  }


  updateUrlLoveSkill(even, i) {
    even.target.src = '../../../assets/images/project.jpg'
    setTimeout(() => {
      even.target.src = this.love_skills[i].url
    }, 11000)
  }

}
