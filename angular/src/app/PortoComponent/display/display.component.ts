import { Component, OnInit, ViewChild, Input, Renderer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PortfolioServices } from 'src/app/PortfolioServices';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { userServes } from './userServes'
import ProjectsCards from '../../../assets/js/projects-cards.js';
import AOS from '../../../assets/js/aos.js';
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  @ViewChild(NavbarComponent, { static: false }) nv: NavbarComponent;
  mainPortfolio = {}

  phrases = [{ name: 'Abdullah' },{ name: 'Software developer' },
  { name: 'Web designer' },{name:" Mobile apps creator"}]
  portfolio = [{name:"Hello,i have 25 year,you will find here a short summary of my skills, tools used by me, selected projects and the course of my education and career."},
  {name:"some project has a link to GitHub where you will find a detailed description and source code."},
  {name:"In technical high school and college I had contact with C, C ++, JavaScript, HTML, CSS, programming of microcontrollers and PLC controllers. Later working for three years as a Electrical Design Engineer. I entered the world of Java, OOP and I got infected with it so much that I decided to change my profession."},
  {name:"Currently I professionally use mainly technologies related to the programming language, and in my free time I dig in Web development - technologies related to Typescript and node js."},
  {name:"I'm trying to touch many programming languages and technologies and keep up with the latest updates from the IT world."}]
  my_photo = { name: "", url: "../../../assets/images/parallax-me.png", state: false }
  love_skills: any = [
    { name: "", url: "../../../assets/images/rust.svg", state: false },
    { name: "", url: "../../../assets/images/android.svg", state: false },
    { name: "", url: "../../../assets/images/java.svg", state: false },
    { name: "", url: "../../../assets/images/js.svg", state: false },
    { name: "", url: "../../../assets/images/ps.svg", state: false }]

  display_cv = false;
  my_cv = { name: "", url: '../../../assets/images/my-cv.jpg' }
  urls: any = [{ name: 'facebook', action: '', state: false },
  { name: 'github', action: 'https://github.com/Nerosoft', state: false },
  { name: 'youtube', action: 'youtube.com/coursesonline', state: false }]

  my_cv_pdf = { name: "", url: "../../../assets/images/my-cv.pdf" }

  username = ''
  firstLoadPage = true
  navLi: any = [{ name: 'about me', state: false }, { name: 'Skills', state: true },
  { name: 'Experience', state: true }, { name: 'Projects', state: true }, { name: 'Contact', state: true }]

  skills = []
  realSkills = []

  experience = []

  buttons = []
  projects = []

  ProjectMonstry

  constructor(
    private service: PortfolioServices,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private renderer: Renderer,
    private userServes: userServes,
  ) {

    this.ProjectMonstry = new ProjectsCards()
    this.route.paramMap.subscribe(params => {
      if (params.get('productId') != null) {
        let productId = params.get('productId')
        this.getUserInformation(productId);
      }
    });





  }




  ngOnInit() {
    AOS.init();
    this.setclock(this)
    this.setclock2(this)


  }

  ngAfterViewInit() {
    const navElement = this.nv.nv_brand.nativeElement;
    this.renderer.listen(navElement, 'click', (event) => {
      this.openCv()
    })
  }


  openCv() {
    const modalRef = this.modalService.open(NgbdModalContent, { size: 'xl' });
    modalRef.componentInstance.my_cv = this.my_cv;
    modalRef.componentInstance.my_cv_pdf = this.my_cv_pdf;
    modalRef.componentInstance.urls = this.urls;
    if (JSON.stringify(modalRef.componentInstance.urls).length < 5)
      modalRef.componentInstance.stateUrls = false;


  }



  setclock(that) {

    var _createClass: any = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var TextScramble = function () {
      function TextScramble(el) {
        _classCallCheck(this, TextScramble);

        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
      }

      _createClass(TextScramble, [{
        key: 'setText',
        value: function setText(newText) {
          var _this = this;

          var oldText = this.el.innerText;
          var length = Math.max(oldText.length, newText.length);
          var promise = new Promise(function (resolve) {
            return _this.resolve = resolve;
          });
          this.queue = [];
          for (var i = 0; i < length; i++) {
            var from = oldText[i] || '';
            var to = newText[i] || '';
            var start = Math.floor(Math.random() * 40);
            var end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from: from, to: to, start: start, end: end });
          }
          cancelAnimationFrame(this.frameRequest);
          this.frame = 0;
          this.update();
          return promise;
        }
      }, {
        key: 'update',
        value: function update() {
          var output = '';
          var complete = 0;
          for (var i = 0, n = this.queue.length; i < n; i++) {
            var _queue$i = this.queue[i],
              from = _queue$i.from,
              to = _queue$i.to,
              start = _queue$i.start,
              end = _queue$i.end,
              char = _queue$i.char;

            if (this.frame >= end) {
              complete++;
              output += to;
            } else if (this.frame >= start) {
              if (!char || Math.random() < 0.28) {
                char = this.randomChar();
                this.queue[i].char = char;
              }
              output += '<span class="dud">' + char + '</span>';
            } else {
              output += from;
            }
          }
          this.el.innerHTML = output;
          if (complete === this.queue.length) {
            this.resolve();
          } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
          }
        }
      }, {
        key: 'randomChar',
        value: function randomChar() {
          return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
      }]);

      return TextScramble;
    }();

    //var phrases = [{name:'Software developer'},{name:'Web designer'},{name:'Mobile apps creator'}]

    var el: any = document.querySelector('.textScramble');
    var fx = new TextScramble(el);

    var counter = 0;
    var next = function next() {
      if (el.style.color == 'rgb(198, 75, 35)')
        el.style.color = "#2196f3"
      else el.style.color = "#c64b23"
      fx.setText(that.phrases[counter].name).then(function () {
        setTimeout(next, 2000);
      });
      counter = (counter + 1) % that.phrases.length;
    };

    next();
  }

  setclock2(that) {

    var _createClass: any = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var TextScramble = function () {
      function TextScramble(el) {
        _classCallCheck(this, TextScramble);

        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
      }

      _createClass(TextScramble, [{
        key: 'setText',
        value: function setText(newText) {
          var _this = this;

          var oldText = this.el.innerText;
          var length = Math.max(oldText.length, newText.length);
          var promise = new Promise(function (resolve) {
            return _this.resolve = resolve;
          });
          this.queue = [];
          for (var i = 0; i < length; i++) {
            var from = oldText[i] || '';
            var to = newText[i] || '';
            var start = Math.floor(Math.random() * 40);
            var end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from: from, to: to, start: start, end: end });
          }
          cancelAnimationFrame(this.frameRequest);
          this.frame = 0;
          this.update();
          return promise;
        }
      }, {
        key: 'update',
        value: function update() {
          var output = '';
          var complete = 0;
          for (var i = 0, n = this.queue.length; i < n; i++) {
            var _queue$i = this.queue[i],
              from = _queue$i.from,
              to = _queue$i.to,
              start = _queue$i.start,
              end = _queue$i.end,
              char = _queue$i.char;

            if (this.frame >= end) {
              complete++;
              output += to;
            } else if (this.frame >= start) {
              if (!char || Math.random() < 0.28) {
                char = this.randomChar();
                this.queue[i].char = char;
              }
              output += '<span class="dud">' + char + '</span>';
            } else {
              output += from;
            }
          }
          this.el.innerHTML = output;
          if (complete === this.queue.length) {
            this.resolve();
          } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
          }
        }
      }, {
        key: 'randomChar',
        value: function randomChar() {
          return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
      }]);

      return TextScramble;
    }();

    //var phrases = [{name:'Software developer'},{name:'Web designer'},{name:'Mobile apps creator'}]

    var el: any = document.querySelector('.textScrambleNV');
    var fx = new TextScramble(el);

    var counter = 0;
    var next = function next() {
      if (el.style.color == 'rgb(198, 75, 35)')
        el.style.color = "#2196f3"
      else el.style.color = "#c64b23"
      fx.setText(that.phrases[counter].name + " C.V").then(function () {
        setTimeout(next, 2000);
      });
      counter = (counter + 1) % that.phrases.length;
    };

    next();
  }


  getUserInformation(username) {
     this.userServes.getUsersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(users => {
      //console.log('firebase ',users)
      users.forEach(user => {
        if (user.username == username) {
          if (this.firstLoadPage) {
            this.setLoginUser(user.username)
            this.firstLoadPage = false
          }
          this.setupUserInfo(user);
          //console.log(user.username)
        }
      })
    })
  }
  setLoginUser(user) {

    this.service.servGet('https://api.ipify.org/?format=json', (data) => {
      let today = new Date();
      const config = {
        username: user,
        address: data.ip,
        year: today.getFullYear(),
        months: (today.getMonth() + 1),
        day: today.getDate(),
        hour: today.getHours(),
        minutes: today.getMinutes(),
        seconds: today.getSeconds()
      }
      this.service.servPostJson('api/setlogin', config, (res) => {
      })
    })



  }


  setupUserInfo(user) {

    if (user.portfolio.defLang == 'en') {
      this.phrases = user.portfolio.en.phrases
      this.phrases.push({ name: user.portfolio.en.name })
      this.phrases.reverse()
      this.portfolio = user.portfolio.en.aboutMe

      this.navLi = user.portfolio.en.navLi
      // 
      this.username = user.username

      this.skills = []

      this.realSkills = []
      this.skills = user.portfolio.en.skills;

      for (let i = 0; i < this.skills.length; i += 2) {
        let xx = []
        for (let index = 0; index < 2; index++)
          if (index == 0)
            xx.push([this.skills[i].nameSkill, Object.values(this.skills[i].skill)])
          else if (this.skills[i + 1] == null)
            break
          else if (index == 1)
            xx.push([this.skills[i + 1].nameSkill, Object.values(this.skills[i + 1].skill)])
        this.realSkills.push(xx)


      }

      this.experience = user.portfolio.en.experience

    }
    else {
      this.portfolio = Object.values(user.portfolio.another.aboutMe)
    }


    //setTimeout(() => {
    this.love_skills = user.love_skills//-------
    this.my_photo = user.my_photo//---------
    this.my_cv = user.my_cv//---------
    this.my_cv_pdf = user.my_cv_pdf//-----------
    this.projects = user.projects[1]//-------
    this.ProjectMonstry.init()//---------
    // }, 3000);

    this.ProjectMonstry.init()
    this.buttons = user.projects[0]
    this.urls = user.urls


    if ((!this.display_cv) && user.display_cv) {
      this.display_cv = user.display_cv
      this.openCv();
    }
    else if ((!user.display_cv) && this.display_cv) {
    }



  }


  sortProject() {

  }



}














@Component({
  selector: 'ngbd-modal-content',
  template: `
  <div class="modal-header">
  <h5 class="modal-title" id="exampleModalLabel" (click)='goCv()'>My Cv Pdf</h5>

  <div class="col-6 col-sm-6 mx-auto text-center" *ngIf="stateUrls">

    <a class="icon-cv" *ngFor="let url of urls " [ngClass]="{'invisible': url.name=='facebook'}"
    href="{{url.action}}" target="_blank" rel="noopener">
      {{url.name}}
      <i class="icon icon-youtube-play" *ngIf="url.name=='youtube'"></i>
      <i class="icon-github-circled"     *ngIf="url.name=='github'"></i>
    </a>
    
   
  </div>
  <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
  <span aria-hidden="true">&times;</span>
</button>
</div>
<div class="modal-body">
<img class="mycv-img" src="{{my_cv.url}}"/>
</div>
  `,
  styleUrls: ['./display.component.css']
})
export class NgbdModalContent {
  @Input() my_cv;
  @Input() my_cv_pdf;
  @Input() urls;
  stateUrls = true;
  constructor(public activeModal: NgbActiveModal) { }
  goCv() {
    window.open(this.my_cv_pdf.url);
  }
}






