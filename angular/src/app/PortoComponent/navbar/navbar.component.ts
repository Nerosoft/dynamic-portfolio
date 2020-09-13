import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';





@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  public isMenuCollapsed = true;
  @Input('navLi') navLi: []
  @Input('username') username: string


  @ViewChild('nv_brand', { static: false }) nv_brand: ElementRef;

  section = ['about-me', 'skills', 'experience', 'projects', 'contact']

  sticky = false
  constructor(private ref: ElementRef) {

  }

  ngOnInit() {

  }


  mainNavLinks: NodeListOf<any>
  ngAfterViewInit() {



    window.addEventListener("scroll", event => {

      this.mainNavLinks = this.ref.nativeElement.querySelectorAll('nav div ul li a')
      let mainNav = document.querySelector("nav");
      let fromTop = window.scrollY;

      this.mainNavLinks.forEach((link: any) => {

        let section = document.getElementById(link.getAttribute('data-sectionvalue'))

        // for testing
        //  if(section!=null){
        //    console.log("1-> "+section.offsetTop+" "+fromTop + " " +mainNav.offsetHeight)
        //    console.log("2-> "+section.offsetTop+" "+section.offsetHeight+" "+fromTop)
        //  }

        if (section != null)
          if (
            section.offsetTop - mainNav.offsetHeight <= fromTop &&
            section.offsetTop + section.offsetHeight >= fromTop
          ) {
            this.mainNavLinks.forEach((link) => link.classList.remove("active"));
            link.classList.add("active");
             if (link.getAttribute('data-sectionvalue') == 'about-me') this.sticky = false
             else this.sticky = true
          }
      });

    });


  }



  goItem(key) {
    switch (key) {
      case 0:
        document.getElementById('about-me').scrollIntoView({ behavior: 'smooth' });
        break;
      case 1:
        document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
        break;
      case 2:
        document.getElementById('experience').scrollIntoView({ behavior: 'smooth' });
        break;
      case 3:
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
        break;
      case 4:
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        break;


    }

    // window.scroll({
    //   top: Number.parseInt(document.getElementById('about-me').scrollTo.toString()),
    //   behavior: 'smooth'
    // });
  }

}


