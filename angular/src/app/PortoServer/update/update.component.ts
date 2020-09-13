import { Component, OnInit, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { userServes } from '../../PortoComponent/display/userServes'
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertComponent } from '../alert/alert.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PortfolioServices } from 'src/app/PortfolioServices';
import { HttpEventType } from '@angular/common/http';
import { NgbdTableCompleteComponent } from '../ngbd-table-complete/ngbd-table-complete.component';
import { ToastService } from 'src/app/toasts/toast-service';
import { user } from './user'
import { UpdateError } from './updateError';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent extends UpdateError implements OnInit {
  @ViewChild(NgbdTableCompleteComponent, { static: false }) table: NgbdTableCompleteComponent;
  @ViewChild('dangerstuser', { static: true }) successTost
  @Input('userName') userName = ''
  @Input('password') password = ''
  public isMenuCollapsed = true;
  phrases = ["Abdullah", 'Software', 'Developer']
  loadeprog = 5;
  heroUser: user = new user()
  toggleMessageLogin = true
  colorPhrases = true
  navActive = [true, false, false, false, false, false, false]
  forms = [true, false, false, false, false, false, false, false, false]
  anim = [true, false, false, false, false, false, false, false, false]
  projectState = true;
  public radioGroupForm: FormGroup;
  public radioGFLoveSkill: FormGroup;
  hedTableMessage = ['Email', 'Message', 'Phone']
  hedTableLogin = ['Address', 'day', 'hour', 'minutes', 'months', 'seconds', 'year']
  constructor(private userServes: userServes,
    private makeReq: PortfolioServices,
    private formBuilder: FormBuilder,
    private _modalService: NgbModal,
    public toastService: ToastService,) {
    super(toastService)
  }

  ngOnInit() {
    this.setclock(this)
    this.radioGroupForm = this.formBuilder.group({
      'model': 1
    });
    this.radioGFLoveSkill = this.formBuilder.group({
      'model': true
    });
    this.getUserInformation(this.userName, this.password)
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

    //var phrases = ['Abdullah', 'Software developer', 'Web designer', 'Mobile apps creator'];

    var el = document.querySelector('.textScramble');
    var fx = new TextScramble(el);

    var counter = 0;
    var next = function next() {
      that.colorPhrases = !that.colorPhrases
      fx.setText(that.phrases[counter]).then(function () {
        setTimeout(next, 2000);

      });
      counter = (counter + 1) % that.phrases.length;
    };

    next();
  }

  selectForm(index) {

    switch (index) {
      case 0:
        for (let i = 0; i < this.forms.length; i++) {
          this.navActive[i] = false
          this.anim[i] = false
          this.forms[i] = false
        }
        this.navActive[0] = true
        this.anim[0] = true
        this.forms[0] = true
        break;

      case 1:
        for (let i = 0; i < this.forms.length; i++) {
          this.navActive[i] = false
          this.anim[i] = false
          this.forms[i] = false
        }
        this.navActive[1] = true
        this.anim[3] = true
        this.forms[3] = true
        break;

      case 2:
        for (let i = 0; i < this.forms.length; i++) {
          this.navActive[i] = false
          this.anim[i] = false
          this.forms[i] = false
        }
        this.navActive[2] = true
        this.anim[4] = true
        this.forms[4] = true
        break;

      case 3:
        for (let i = 0; i < this.forms.length; i++) {
          this.navActive[i] = false
          this.anim[i] = false
          this.forms[i] = false
        }
        this.navActive[3] = true
        this.anim[5] = true
        this.forms[5] = true
        break;

      case 4:
        for (let i = 0; i < this.forms.length; i++) {
          this.navActive[i] = false
          this.anim[i] = false
          this.forms[i] = false
        }
        this.navActive[4] = true
        this.anim[6] = true
        this.forms[6] = true
        break;

      case 5:
        for (let i = 0; i < this.forms.length; i++) {
          this.navActive[i] = false
          this.anim[i] = false
          this.forms[i] = false
        }
        this.navActive[5] = true
        this.anim[7] = true
        this.forms[7] = true
        break;

      case 6:
        for (let i = 0; i < this.forms.length; i++) {
          this.navActive[i] = false
          this.anim[i] = false
          this.forms[i] = false
        }
        this.navActive[6] = true
        this.anim[8] = true
        this.forms[8] = true
        break;

      default:
        break;
    }
  }

  loveYou() {

  }

  plus(key) {
    switch (key) {
      case 1:
        if (this.heroUser.portfolio.en.phrases.length < 5)
          this.heroUser.portfolio.en.phrases.push({ name: 'plus jop ' + this.heroUser.portfolio.en.phrases.length })


        break;
      case 2:
        if (this.heroUser.portfolio.en.aboutMe.length < 5)
          this.heroUser.portfolio.en.aboutMe.push({ name: 'plus portfolio ' + this.heroUser.portfolio.en.aboutMe.length })


        break;
      case 3:
        if (this.heroUser.love_skills.length < 5) {
          this.heroUser.love_skills.push({ name: "", url: "../../../assets/images/project.jpg", state: false })
        }
        break;
      case 4:
        // if (this.navLinks.length < 4) {
        //   this.navLinks.push({ name:'plus item ' + this.navLinks.length})
        // }
        break;
      case 5:

        this.heroUser.portfolio.en.skills.push({ nameSkill: 'plus name skill ', skill: [{ name: 'your skill', level: 'level3' }] })


        break;
      case 6:

        this.heroUser.portfolio.en.experience.push({ experiences: { date: '03.2018 - graduate', job: 'Software Developer', at: '??' }, experienceDis: [{ name: 'Aandroid, Web, Desktop Application' }] })

        break;
      case 7:
        let button: any = { name: 'name', key: '.key' }
        this.heroUser.projects[0].push(button)
        break;
      case 8:
        this.heroUser.projects[1].push({
          key: 'ang', position: (this.heroUser.projects[1].length + 1), img: '../../../assets/images/project.jpg',
          title: 'awsome Web Site', proj: 'angular Web Site', name: '',
          site: { state: true, action: 'google.com' },
          github: { state: true, action: 'github.com' },
          state: false,
          youtube: { state: true, action: 'youtube.com' }
        })
        break;
    }

  }

  minus(key, index) {
    switch (key) {
      case 1:
        this.removeArray(this.heroUser.portfolio.en.phrases,
          this.heroUser.portfolio.en.phrases[index])
        break;
      case 2:
        this.removeArray(this.heroUser.portfolio.en.aboutMe,
          this.heroUser.portfolio.en.aboutMe[index])
        break;
      case 3:
        this.removeArray(this.heroUser.love_skills,
          this.heroUser.love_skills[index])
        break;
      case 4:
        break;
      case 5:
        this.removeArray(this.heroUser.portfolio.en.skills,
          this.heroUser.portfolio.en.skills[index])
        break;
      case 6:
        this.removeArray(this.heroUser.portfolio.en.experience,
          this.heroUser.portfolio.en.experience[index])
        break;
      case 7:
        this.removeArray(this.heroUser.projects[0],
          this.heroUser.projects[0][index])
        break;
      case 8:
        this.removeArray(this.heroUser.projects[1],
          this.heroUser.projects[1][index])
        break;
    }
  }

  removeArray(arr, value) {

    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
  next(index) {
    this.nextForm(index)
  }
  back(index) {
    this.backForm(index)
  }
  nextForm(index) {

    this.anim[index] = false
    this.forms[index] = false
    this.anim[index + 1] = true
    this.forms[index + 1] = true

  }
  backForm(index) {
    this.anim[index] = false
    this.forms[index] = false
    this.anim[index - 1] = true
    this.forms[index - 1] = true
  }

  minusSkill(i, ii) {
    //this.skills[index].pop()
    this.removeArray(this.heroUser.portfolio.en.skills[i].skill,
      this.heroUser.portfolio.en.skills[i].skill[ii])
  }

  plusSkill(index) {
    this.heroUser.portfolio.en.skills[index].skill.push({ name: 'your skill', level: 'level3' })
  }


  plusExp(i) {
    this.heroUser.portfolio.en.experience[i].experienceDis.push({ name: 'new' })


  }
  minusExp(i, ii) {
    this.removeArray(this.heroUser.portfolio.en.experience[i].experienceDis,
      this.heroUser.portfolio.en.experience[i].experienceDis[ii])
  }
  setLevel(mainIndex, index, level) {
    this.heroUser.portfolio.en.skills[mainIndex].skill[index].level = "level" + level
  }
  goProject() {
    this.projectState = !this.projectState
  }
  sendDataEffect() {
    let dom: HTMLElement = document.getElementById("progloadeid");

    dom.style.width = 0 + "%";
    dom.parentElement.style.display = 'flex';
    let timer = setInterval(() => {
      this.loadeprog += 1;
      dom.style.width = this.loadeprog + "%";

      if (this.loadeprog >= 120) {
        clearInterval(timer);
        dom.parentElement.style.display = 'none';
        dom.style.width = 0 + "%";
        this.loadeprog = 5
      }
    }, 2000);
  }

  setSotialState(index, state, site) {
    this.heroUser.projects[1][index][site].state = state
  }

  setKey(i, ii) {
    this.heroUser.projects[1][i].key = this.heroUser.projects[0][ii].key
  }
  opendailog(id) {
    document.getElementById(id).click()
  }

  getUserInformation(username, password) {
    let subscription = this.userServes.getUsersList().snapshotChanges().pipe(
      map(changes => {
        //  console.log('firebase ',changes)
        return changes.map(c =>
          ({ ...c.payload.val() })
        )

      }
      )
    ).subscribe(users => {


      users.forEach((user: user) => {
        if (user.username == username && user.password == password) {

          this.heroUser.display_cv = user.display_cv
          this.heroUser.username = user.username
          this.heroUser.password = user.password
          this.heroUser.urls = user.urls
          this.heroUser.portfolio = user.portfolio
          this.heroUser.message = user.message
          this.heroUser.login = user.login
          if (this.table != null && this.table != undefined)
            if (this.toggleMessageLogin)
              this.table.setupTableItem(this.heroUser.message)
            else
              this.table.setupTableItem(this.heroUser.login)

          //setTimeout(() => {
            this.heroUser.my_cv = user.my_cv
            this.heroUser.my_cv_pdf = user.my_cv_pdf
            this.heroUser.my_photo = user.my_photo
            this.heroUser.love_skills = user.love_skills
            this.heroUser.projects = user.projects
          //}, 10);
        }
      })
    })
  }
  updateUrlProject(even, i) {
    even.target.src = '../../../assets/images/project.jpg'
    setTimeout(() => {
      even.target.src = this.heroUser.projects[1][i].img
    }, 11000)
  }

  updateUrlLoveSkill(even, i) {
    even.target.src = '../../../assets/images/project.jpg'
    setTimeout(() => {
      even.target.src = this.heroUser.love_skills[i].url
    }, 11000)
  }

  //-----------------Update-----------------

  updateFormJop(title, item) {
    if (!this.validation(this.heroUser, 1))
      return
    const modalRef = this._modalService.open(AlertComponent);
    modalRef.componentInstance.title = title
    modalRef.componentInstance.item = item
    modalRef.componentInstance.callback = (modal) => {
      const config = {
        username: this.heroUser.username,
        password: this.password,
        name: this.heroUser.portfolio.en.name,
        phrases: this.heroUser.portfolio.en.phrases,
      }
      modal.close('Ok click')
      this.sendDataEffect()
      this.makeReq.servPostJson('api/jop', config, (res) => {
        this.loadeprog += 30

        if (res.state) {
          this.loadeprog = 130
          this.toastService.show(this.successTost, { classname: 'bg-success text-light', delay: 7000 });
        }
      })

    }
  }

  updateFormPortfolio(title, item) {
    if (!this.validation(this.heroUser, 2))
      return
    const modalRef = this._modalService.open(AlertComponent);
    modalRef.componentInstance.title = title
    modalRef.componentInstance.item = item
    modalRef.componentInstance.callback = (modal) => {
      const config = {
        username: this.heroUser.username,
        password: '',
        aboutMe: this.heroUser.portfolio.en.aboutMe,
      }
      modal.close('Ok click')
      this.sendDataEffect()
      this.makeReq.servPostJson('api/portfolio', config, (res) => {

        if (res.state) {
          this.loadeprog = 130
          this.toastService.show(this.successTost, { classname: 'bg-success text-light', delay: 7000 });
        }
      })

    }
  }


  updateMyPhoto(title, item, file) {
    this.newFile = file.target.files[0]
    if (!this.validation(this.heroUser, 3))
      return
    let newFile = file.target.files
    if (file) {

      const modalRef = this._modalService.open(AlertComponent);
      modalRef.componentInstance.title = title
      modalRef.componentInstance.item = item

      modalRef.componentInstance.callback = (modal) => {
        let formDate = new FormData()
        formDate.append('username', this.heroUser.username)
        formDate.append('password', '')
        formDate.append(this.heroUser.my_photo.name, newFile[0])
        modal.close('Ok click')
        this.sendDataEffect()
        this.makeReq.servPostImage('api/myphoto', formDate, (events) => {
          if (events.type === HttpEventType.UploadProgress) {
            this.loadeprog = Math.round(events.loaded / events.total * 100)

          }
          else if (events.type === HttpEventType.Response) {
   
            this.loadeprog = 130;
            this.toastService.show(this.successTost, { classname: 'bg-success text-light', delay: 7000 });
            // modal.dismiss('cancel click')
          }

        })
      }

    }
  }


  updateFormLove_Skill(title, item, index, file) {
    this.newFile = file.target.files[0]
    if (!this.validation(this.heroUser, 4))
      return
    let newFile = file.target.files
    if (file) {

      const modalRef = this._modalService.open(AlertComponent);
      modalRef.componentInstance.title = title
      modalRef.componentInstance.item = item + ' ' + index

      modalRef.componentInstance.callback = (modal) => {
        let formDate = new FormData()
        formDate.append('username', this.heroUser.username)
        formDate.append('password', '')
        formDate.append('index', index)
        formDate.append(this.heroUser.love_skills[index].name, newFile[0])
        modal.close('Ok click')
        this.sendDataEffect()
        this.makeReq.servPostImage('api/loveskill', formDate, (events) => {
          if (events.type === HttpEventType.UploadProgress) {
            this.loadeprog = Math.round(events.loaded / events.total * 100)

          }
          else if (events.type === HttpEventType.Response) {
  
            this.loadeprog = 130;
            this.toastService.show(this.successTost, { classname: 'bg-success text-light', delay: 7000 });
            // modal.dismiss('cancel click')
          }
        })
      }

    }
  }





  plusFormLove_Skill(title, item, file) {
    this.newFile = file.target.files[0]
    if (!this.validation(this.heroUser, 4))
      return
    let newFile = file.target.files
    if (file) {

      const modalRef = this._modalService.open(AlertComponent);
      modalRef.componentInstance.title = title
      modalRef.componentInstance.item = item

      modalRef.componentInstance.callback = (modal) => {
        let formDate = new FormData()
        formDate.append('username', this.heroUser.username)
        formDate.append('password', '')
        formDate.append('index', (this.heroUser.love_skills.length) + '')
        formDate.append('love-skils' + (this.heroUser.love_skills.length + 1) + '=' + this.heroUser.username,
          newFile[0])
        modal.close('Ok click')
        this.sendDataEffect()
        this.makeReq.servPostImage('api/plusloveskill', formDate, (events) => {
          if (events.type === HttpEventType.UploadProgress) {
            this.loadeprog = Math.round(events.loaded / events.total * 100)

          }
          else if (events.type === HttpEventType.Response) {

            this.loadeprog = 130;
            this.toastService.show(this.successTost, { classname: 'bg-success text-light', delay: 7000 });
            // modal.dismiss('cancel click')
          }

        })
      }

    }
  }

  hideLoveSkill(index, state, title, item) {
    if (this.heroUser.love_skills[index].state != state) { // hide
      const modalRef = this._modalService.open(AlertComponent);
      modalRef.componentInstance.title = title
      modalRef.componentInstance.item = item
      modalRef.componentInstance.callback = (modal) => {
        const config = {
          username: this.heroUser.username,
          password: '',
          state: state,
          index: index
        }

        modal.close('Ok click')
        this.sendDataEffect()
        this.makeReq.servPostJson('api/hideSkill', config, (res) => {
          if (res.state) {
            this.loadeprog = 130
            this.toastService.show(this.successTost, { classname: 'bg-success text-light', delay: 7000 });
          }
        })

      }

    }

    return false

    // console.log( this.radioGFLoveSkill.value['model'])
  }

  hidePhoto(state, title, item) {
    if (this.heroUser.my_photo.state != state) { // hide
      const modalRef = this._modalService.open(AlertComponent);
      modalRef.componentInstance.title = title
      modalRef.componentInstance.item = item
      modalRef.componentInstance.callback = (modal) => {
        const config = {
          username: this.heroUser.username,
          password: '',
          state: state,
        }

        modal.close('Ok click')
        this.sendDataEffect()
        this.makeReq.servPostJson('api/hidePhoto', config, (res) => {
          if (res.state) {
            this.loadeprog = 130
            this.toastService.show(this.successTost, { classname: 'bg-success text-light', delay: 7000 });
          }
        })

      }

    }

    return false

    // console.log( this.radioGFLoveSkill.value['model'])
  }



  updateSkill(title, item) {
    if (!this.validation(this.heroUser, 5))
      return
    const modalRef = this._modalService.open(AlertComponent);
    modalRef.componentInstance.title = title
    modalRef.componentInstance.item = item
    modalRef.componentInstance.callback = (modal) => {
      const config = {
        username: this.heroUser.username,
        password: '',
        skills: this.heroUser.portfolio.en.skills
      }
      modal.close('Ok click')
      this.sendDataEffect()
      this.makeReq.servPostJson('api/skills', config, (res) => {

        if (res.state) {
          this.loadeprog = 130
          this.toastService.show(this.successTost, { classname: 'bg-success text-light', delay: 7000 });
        }
      })

    }

  }


  updateExperience(title, item) {
    if (!this.validation(this.heroUser, 6))
      return
    const modalRef = this._modalService.open(AlertComponent);
    modalRef.componentInstance.title = title
    modalRef.componentInstance.item = item
    modalRef.componentInstance.callback = (modal) => {
      const config = {
        username: this.heroUser.username,
        password: '',
        experience: this.heroUser.portfolio.en.experience
      }
      modal.close('Ok click')
      this.sendDataEffect()
      this.makeReq.servPostJson('api/experience', config, (res) => {

        if (res.state) {
          this.loadeprog = 130
          this.toastService.show(this.successTost, { classname: 'bg-success text-light', delay: 7000 });
        }
      })

    }
  }


  updateCv(title, item, file) {
    this.newFile = file.target.files[0]
    if (!this.validation(this.heroUser, 10))
      return
    let newFile = file.target.files
    if (file) {

      const modalRef = this._modalService.open(AlertComponent);
      modalRef.componentInstance.title = title
      modalRef.componentInstance.item = item

      modalRef.componentInstance.callback = (modal) => {
        let formDate = new FormData()
        formDate.append('username', this.heroUser.username)
        formDate.append('password', '')
        formDate.append(this.heroUser.my_cv.name, newFile[0])
        modal.close('Ok click')
        this.sendDataEffect()
        this.makeReq.servPostImage('api/cvimage', formDate, (events) => {
          if (events.type === HttpEventType.UploadProgress) {
            this.loadeprog = Math.round(events.loaded / events.total * 100)
          }
          else if (events.type === HttpEventType.Response) {

            this.loadeprog = 130;
            this.toastService.show(this.successTost, { classname: 'bg-success text-light', delay: 7000 });
            // modal.dismiss('cancel click')
          }
        })
      }

    }
  }


  updateCvPdf(title, item, file) {
    this.newFile = file.target.files[0]
    if (!this.validation(this.heroUser, 11))
      return
    let newFile = file.target.files
    if (file) {

      const modalRef = this._modalService.open(AlertComponent);
      modalRef.componentInstance.title = title
      modalRef.componentInstance.item = item

      modalRef.componentInstance.callback = (modal) => {
        let formDate = new FormData()
        formDate.append('username', this.heroUser.username)
        formDate.append('password', '')
        formDate.append(this.heroUser.my_cv_pdf.name, newFile[0])
        modal.close('Ok click')
        this.sendDataEffect()
        this.makeReq.servPostImage('api/cvimagepdf', formDate, (events) => {
          if (events.type === HttpEventType.UploadProgress) {
            this.loadeprog = Math.round(events.loaded / events.total * 100)
          }
          else if (events.type === HttpEventType.Response) {
            this.loadeprog = 130;
            this.toastService.show(this.successTost, { classname: 'bg-success text-light', delay: 7000 });
            // modal.dismiss('cancel click')
          }
        })
      }

    }
  }


  hideUrl(index, state, title, item) {
    if (this.heroUser.urls[index].state != state) { // hide
      const modalRef = this._modalService.open(AlertComponent);
      modalRef.componentInstance.title = title
      modalRef.componentInstance.item = item
      modalRef.componentInstance.callback = (modal) => {
        const config = {
          username: this.heroUser.username,
          password: '',
          state: state,
          index: index
        }
        modal.close('Ok click')
        this.sendDataEffect()
        this.makeReq.servPostJson('api/hideurl', config, (res) => {
          if (res.state) {
            this.loadeprog = 130
            this.toastService.show(this.successTost, { classname: 'bg-success text-light', delay: 7000 });
          }
        })

      }

    }

    return false

    // console.log( this.radioGFLoveSkill.value['model'])
  }


  showCv(state, title, item) {
    if (this.heroUser.display_cv != state) { // hide
      const modalRef = this._modalService.open(AlertComponent);
      modalRef.componentInstance.title = title
      modalRef.componentInstance.item = item
      modalRef.componentInstance.callback = (modal) => {
        const config = {
          username: this.heroUser.username,
          password: '',
          state: state,
        }
        modal.close('Ok click')
        this.sendDataEffect()
        this.makeReq.servPostJson('api/showcv', config, (res) => {
          if (res.state) {
            this.loadeprog = 130
            this.toastService.show(this.successTost, { classname: 'bg-success text-light', delay: 7000 });
          }
        })

      }

    }

    return false

    // console.log( this.radioGFLoveSkill.value['model'])
  }


  UpdateContact(title, item) {
    if (!this.validation(this.heroUser, 9))
      return
    const modalRef = this._modalService.open(AlertComponent);
    modalRef.componentInstance.title = title
    modalRef.componentInstance.item = item
    modalRef.componentInstance.callback = (modal) => {
      const config = {
        username: this.heroUser.username,
        password: '',
        urls: this.heroUser.urls
      }
      modal.close('Ok click')
      this.sendDataEffect()
      this.makeReq.servPostJson('api/urls', config, (res) => {
        if (res.state) {
          this.loadeprog = 130
          this.toastService.show(this.successTost, { classname: 'bg-success text-light', delay: 7000 });
        }
      })

    }

  }


  hideSection(index, state, title, item) {
    if (this.heroUser.portfolio.en.navLi[index].state != state) { // hide
      const modalRef = this._modalService.open(AlertComponent);
      modalRef.componentInstance.title = title
      modalRef.componentInstance.item = item
      modalRef.componentInstance.callback = (modal) => {
        const config = {
          username: this.heroUser.username,
          password: '',
          state: state,
          index: index
        }
        modal.close('Ok click')
        this.sendDataEffect()
        this.makeReq.servPostJson('api/hidesection', config, (res) => {
          if (res.state) {
            this.loadeprog = 130
            this.toastService.show(this.successTost, { classname: 'bg-success text-light', delay: 7000 });
          }
        })

      }

    }

    return false

    // console.log( this.radioGFLoveSkill.value['model'])
  }

  navBar(title, item) {
    if (!this.validation(this.heroUser, 12))
      return
    const modalRef = this._modalService.open(AlertComponent);
    modalRef.componentInstance.title = title
    modalRef.componentInstance.item = item
    modalRef.componentInstance.callback = (modal) => {
      const config = {
        username: this.heroUser.username,
        password: '',
        navLi: this.heroUser.portfolio.en.navLi
      }
      modal.close('Ok click')
      this.sendDataEffect()
      this.makeReq.servPostJson('api/navbar', config, (res) => {
        if (res.state) {
          this.loadeprog = 130
          this.toastService.show(this.successTost, { classname: 'bg-success text-light', delay: 7000 });
        }
      })

    }

  }

  //--------------------------projects-------------------
  updateProj(title, item, index, file) {
    this.newFile = file.target.files[0]
    if (!this.validation(this.heroUser, 8))
      return
    let newFile = file.target.files
    if (file) {

      const modalRef = this._modalService.open(AlertComponent);
      modalRef.componentInstance.title = title
      modalRef.componentInstance.item = item + ' ' + index

      modalRef.componentInstance.callback = (modal) => {
        let formDate = new FormData()
        formDate.append('username', this.heroUser.username)
        formDate.append('password', '')
        formDate.append('index', index)
        formDate.append(this.heroUser.projects[1][index].name, newFile[0])
        modal.close('Ok click')
        this.sendDataEffect()
        this.makeReq.servPostImage('api/updateimageproj', formDate, (events) => {
          if (events.type === HttpEventType.UploadProgress) {
            this.loadeprog = Math.round(events.loaded / events.total * 100)
          }
          else if (events.type === HttpEventType.Response) {
            this.loadeprog = 130;
            this.toastService.show(this.successTost, { classname: 'bg-success text-light', delay: 7000 });
            // modal.dismiss('cancel click')
          }


        })
      }

    }
  }

  updateProg(title, item) {
    if (!this.validation(this.heroUser, 7))
      return
    const modalRef = this._modalService.open(AlertComponent);
    modalRef.componentInstance.title = title
    modalRef.componentInstance.item = item
    modalRef.componentInstance.callback = (modal) => {
      const config = {
        username: this.heroUser.username,
        password: '',
        projects: this.heroUser.projects
      }
      modal.close('Ok click')
      this.sendDataEffect()
      this.makeReq.servPostJson('api/updateprojects', config, (res) => {
        if (res.state) {
          this.loadeprog = 130
          this.toastService.show(this.successTost, { classname: 'bg-success text-light', delay: 7000 });
        }
      })

    }

  }


  hieProject(index, state, title, item) {
    if (this.heroUser.projects[1][index].state != state) { // hide
      const modalRef = this._modalService.open(AlertComponent);
      modalRef.componentInstance.title = title
      modalRef.componentInstance.item = item
      modalRef.componentInstance.callback = (modal) => {
        const config = {
          username: this.heroUser.username,
          password: '',
          state: state,
          index: index
        }
        modal.close('Ok click')
        this.sendDataEffect()
        this.makeReq.servPostJson('api/hideproject', config, (res) => {
          if (res.state) {
            this.loadeprog = 130
            this.toastService.show(this.successTost, { classname: 'bg-success text-light', delay: 7000 });
          }
        })

      }

    }

    return false

    // console.log( this.radioGFLoveSkill.value['model'])
  }


  addProject(title, item, file) {
    this.newFile = file.target.files[0]
    if (!this.validation(this.heroUser, 8))
      return

    let newFile = file.target.files
    if (file) {

      const modalRef = this._modalService.open(NgbdModalProject, { windowClass: 'dark-modal' });
      modalRef.componentInstance.file = newFile[0]
      modalRef.componentInstance.displayIMage()
      modalRef.componentInstance.allkey = this.heroUser.projects[0]

      modalRef.componentInstance.callback = (modal) => {

        modalRef.componentInstance.onUpload = true
        modalRef.componentInstance.proj.position = (this.heroUser.projects[1].length + 1)
        let formDate = new FormData()
        formDate.append('username', this.heroUser.username)
        formDate.append('password', '')
        formDate.append('project', JSON.stringify(modalRef.componentInstance.proj))
        formDate.append('index', (this.heroUser.projects[1].length) + '')
        formDate.append('projects' + (this.heroUser.projects[1].length + 1) + '=' + this.heroUser.username,
          newFile[0])
          this.sendDataEffect()
        this.makeReq.servPostImage('api/addproject', formDate, (events) => {
          if (events.type === HttpEventType.UploadProgress) {
            this.loadeprog = Math.round(events.loaded / events.total * 100)
          }
          else if (events.type === HttpEventType.Response) {
            //  this.showTost('Successfuly!!', 'bg-success text-light', 50000);
            this.loadeprog = 130;
            modal.dismiss('cancel click')
          }
        })


      }

    }
  }

}







@Component({
  selector: 'ngbd-modal-Project',
  template: `

  <div class="upload" [ngClass]="{'onupload' : onUpload}">

  <div class="modal-header">
  <h4 class="modal-title" id="modal-title" *ngIf="!onUpload">Upload Your Images</h4>
  <h4 class="modal-title" id="modal-title" *ngIf="onUpload">Uploading..</h4>
  <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title"
      (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
  </button>

</div>

<div *ngIf="!onUpload">
  <div class="modal-body">





  <div class="img_proj">

        <img src="{{image}}" />
    </div>
    <section class="sotial">
        <div class="input-group mb-1 mt-3">

            <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">name</span>
            </div>
            <input type="text" class="form-control" [(ngModel)]="proj.proj">

            <form [formGroup]="radioGFLoveSkill" class="">
                <div class="btn-group btn-group-toggle" ngbRadioGroup name="radioBasic" formControlName="model">
                    <label ngbButtonLabel (click)="setdisplay(true)"
                        class="btn-primary btn-switch">
                        <input ngbButton type="radio" [value]="proj.state"> ON
                    </label>
                    <label ngbButtonLabel (click)="setdisplay(false)"
                        class="btn-primary btn-switch">
                        <input ngbButton  type="radio" [value]="(!proj.state)"> OFF
                    </label>
                </div>
            </form>

        </div>
    </section>

    <div class="input-group input-group-sm mb-1">
        <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-sm">title</span>
        </div>
        <input type="text" class="form-control" [(ngModel)]="proj.title">
    </div>

    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-sm">Key</span>
        </div>
        <input type="text" class="form-control" [(ngModel)]="proj.key">
        <div class="input-group-append">

            <div class="btn-group" ngbDropdown role="group" aria-label="Button group with nested dropdown">
                <button class="btn btn-outline-info" ngbDropdownToggle>Key</button>
                <div class="dropdown-menu" ngbDropdownMenu>
                    <button *ngFor='let keys of allkey;index as i' ngbDropdownItem
                        (click)='setKey(i)'>{{keys.key}}</button>

                </div>
            </div>

        </div>
    </div>


    <section class="sotial">
        <div class="input-group  mb-1">
            <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">site</span>
            </div>
            <input type="text" class="form-control" [(ngModel)]="proj.site.action">
            <form [formGroup]="radioGFLoveSkill" class="">
                <div class="btn-group btn-group-toggle" ngbRadioGroup name="radioBasic" formControlName="model">
                    <label ngbButtonLabel class="btn-primary btn-switch">
                        <input ngbButton (click)="setSotialState(true,'site')" type="radio" [value]="proj.site.state">
                        ON
                    </label>
                    <label ngbButtonLabel class="btn-primary btn-switch">
                        <input ngbButton (click)="setSotialState(false,'site')" type="radio"
                            [value]="(!proj.site.state)"> OFF
                    </label>
                </div>
            </form>
        </div>
        <div class="input-group mb-1">
            <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">github</span>
            </div>
            <input type="text" class="form-control" [(ngModel)]="proj.github.action">
            <form [formGroup]="radioGFLoveSkill" class="">
                <div class="btn-group btn-group-toggle" ngbRadioGroup name="radioBasic" formControlName="model">
                    <label ngbButtonLabel (click)="setSotialState(true,'github')" class="btn-primary btn-switch">
                        <input ngbButton type="radio" [value]="proj.github.state"> ON
                    </label>
                    <label ngbButtonLabel class="btn-primary btn-switch">
                        <input ngbButton (click)="setSotialState(false,'github')" type="radio"
                            [value]="(!proj.github.state)"> OFF
                    </label>
                </div>
            </form>
        </div>
        <div class="input-group  mb-1">
            <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">youtube</span>
            </div>
            <input type="text" class="form-control" [(ngModel)]="proj.youtube.action">
            <form [formGroup]="radioGFLoveSkill" class="">
                <div class="btn-group btn-group-toggle" ngbRadioGroup name="radioBasic" formControlName="model">
                    <label ngbButtonLabel class="btn-primary btn-switch">
                        <input ngbButton (click)="setSotialState(true,'youtube')" type="radio"
                            [value]="proj.youtube.state"> ON
                    </label>
                    <label ngbButtonLabel class="btn-primary btn-switch">
                        <input ngbButton (click)="setSotialState(false,'youtube')" type="radio"
                            [value]="(!proj.youtube.state)"> OFF
                    </label>
                </div>
            </form>
        </div>
    </section>




  </div>
</div>
<div class="modal-footer" *ngIf="!onUpload">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" ngbAutofocus class="btn btn-danger" (click)="callback(modal)">Ok</button>
</div>
</div>

  `,
  encapsulation: ViewEncapsulation.None,
  styles: [`
  .img_proj{
    margin: auto;
    text-align: center;
  }
 .img_proj img{
    max-width: 200px;
    max-height: 200px;
    border-radius: 25px;
    background-position: center;
    background-size: cover;
    border: 1px solid black;
    cursor: pointer;
  }
  .dark-modal .modal-content {
    width: 400px;
    background-color: rgba(0,0,0,.5)!important;
    padding: 20px;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
    color: white;
  }
  .dark-modal .modal-content{
    padding: 0;
  }
  .dark-modal .modal-header,
  .dark-modal .modal-footer{
    border-bottom: none;
    border-top: none;
  }
  .dark-modal .modal-body{
  border-top: 1px solid #7e3125;
  border-bottom: 1px solid #7e3125;
  border-radius: 7px;
  margin-bottom: 1rem;
  box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
}
.upload{
  padding: 20px;
}

.onupload{
  padding: 0;
  background: url('../../../assets/images/loading.gif') no-repeat center center ;
  background-size: cover;
  width: 100%;
  height: 100%;
}

.dropdown-menu{
  background: rgb(247, 249, 250,.5);
}

.btn-group .btn{
border: 0;
border-radius: 0;
}

.sotial .btn-group-toggle{
  align-items: center;
  height: 100%;
}
.sotial .btn-group-toggle .btn-switch{
  height: 100%;
}
.sotial .btn-group-toggle .active{
  background-color: #009688!important;
}


`],
})
export class NgbdModalProject {
  @Input() file
  @Input() allkey
  @Input() callback
  image = '../../../assets/images/project.jpg'
  @Input() onUpload = false
  @Input() proj = {
    name: "projects1=abdullah", key: 'ang', position: 1,
    img: '',
    title: 'angular Web Site', proj: 'angular Web Site', state: false,
    site: { state: true, action: 'google.com' },
    github: { state: true, action: 'github.com' },
    youtube: { state: true, action: 'youtube.com' }
  }
  public radioGFLoveSkill: FormGroup;
  constructor(public modal: NgbActiveModal,
    private formBuilder: FormBuilder,) {
    this.radioGFLoveSkill = this.formBuilder.group({
      'model': true
    });

  }

  @Input() displayIMage = () => {
    var reader = new FileReader();
    reader.onload = (e: any) => {
      this.image = e.target.result as string;
    }
    reader.readAsDataURL(this.file);
  }

  setSotialState(state, site) {
    this.proj[site].state = state
  }

  setKey(i) {
    this.proj.key = this.allkey[i].key
  }

  setdisplay(state) {
    this.proj.state = state
  }

}




// this.toastService.show('sucssesful Login', { classname: 'bg-success text-light', delay: 10000 });
// else
// this.toastService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 15000 });