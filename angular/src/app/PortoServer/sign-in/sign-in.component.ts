import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Parallax from '../../../assets/js/parallax.js';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PortfolioServices } from 'src/app/PortfolioServices.js';
import { HttpEventType } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { userServes } from 'src/app/PortoComponent/display/userServes.js';
import { data } from 'jquery';
import { user } from 'src/app/PortoComponent/display/user.js';
import { SignError } from './signError.js';
import { SignOperations } from './SignOperations.js';
import { SignUser } from './SignUser.js';
import { ToastService } from 'src/app/toasts/toast-service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent extends SignError implements OnInit {
  @ViewChild('dangerTpl',{static:false})dangerTpl
  SignUser=new SignUser()
  //--------------------------------------
  onUpload=false;
  projectState = false;
  loadeprog = 5;
  projImag = ['../../../assets/images/project.jpg']

  //------------------------------------------
  stpes = [true, false, false]
  forms = [true, false, false, false, false, false, false, false]
  anim = [true, false, false, false, false, false, false, false]
  
  public radioGroupForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder,
    public toastService: ToastService,
    private service: PortfolioServices,
    private router: Router,
    private route: ActivatedRoute,
    private users:userServes,) {
    super(toastService);
    // this.users.getUsersObject(data=>{
    //   this.allNameId=data
    //   console.log(data,"is redy")
    // })
  }

get signInUser(){
  return this.SignUser
}

  // setValue() {

  //   this.name = 'prince ahmed'
  //   this.Jops = [{ name: 'Software developer' }, { name: 'Web designer' }, { name: 'Mobile apps creator' }]
  //   this.portfolios = [
  //     { name: "Hello,i have 25 year,you will find here a short summary of my skills, tools used by me, selected projects and the course of my education and career." },
  //     { name: "some project has a link to GitHub where you will find a detailed description and source code." },
  //     { name: "In technical high school and college I had contact with C, C ++, JavaScript, HTML, CSS, programming of microcontrollers and PLC controllers. Later working for three years as " },
  //     { name: "Currently I professionally use mainly technologies related to the programming language, and in my free time I dig in Web development - technologies related to Typescript and node js." },
  //     { name: "Im trying to touch many programming languages and technologies and keep up with the latest updates from the IT world." }]


  //   this.skills = [[{ name: 'Node.js', level: 'level3' }, { name: 'php', level: 'level2' }], [{ name: 'Laravel', level: 'level1' }],
  //   [{ name: 'JavaScript, HTML, CSS,', level: 'level3' }, { name: 'Typescript', level: 'level2' }, { name: 'Angular', level: 'level1' }],
  //   [{ name: 'MYSQL,', level: 'level3' }, { name: 'SQL SERVER', level: 'level2' }, { name: 'Oracle', level: 'level1' }],
  //   [{ name: 'C#,', level: 'level3' }, { name: 'Java', level: 'level2' }],
  //   [{ name: 'Windows,', level: 'level3' }, { name: 'Linux', level: 'level2' }, { name: 'Android', level: 'level1' }],
  //   [{ name: 'Adobe,', level: 'level3' }, { name: 'Photoshop', level: 'level2' }],
  //   [{ name: 'Java,', level: 'level3' }, { name: 'Kotlin', level: 'level2' }],]

  //   this.nameSkills = [{ name: 'backend' },
  //   { name: 'Front-end' },
  //   { name: 'Databases' },
  //   { name: 'Desktop Application' },
  //   { name: 'OS' },
  //   { name: 'Graphics' },
  //   { name: 'Android Application' }]

  //   this.experiences = [{ date: '01.2017 - previously', job: 'web programing', at: 'college' },
  //   { date: '01.2017 - previously', job: 'web programing', at: 'college' },
  //   { date: '01.2017 - previously', job: 'web programing', at: 'college' },
  //   { date: '01.2017 - previously', job: 'web programing', at: 'college' }]
  //   this.experienceDis = [[{ name: 'Node.js, Php, Laravel' }, { name: 'Node.js, Php, Laravel' }, { name: 'Node.js, Php, Laravel' }],
  //   [{ name: 'Node.js, Php, Laravel' }, { name: 'Node.js, Php, Laravel' }, { name: 'Node.js, Php, Laravel' }],
  //   [{ name: 'Node.js, Php, Laravel' }, { name: 'Node.js, Php, Laravel' }, { name: 'Node.js, Php, Laravel' }],
  //   [{ name: 'Node.js, Php, Laravel' }, { name: 'Node.js, Php, Laravel' }, { name: 'Node.js, Php, Laravel' }]]


  // }





  ngOnInit() {
    this.initParallax();
    this.radioGroupForm = this.formBuilder.group({
      'model': true
    });
  }




  initParallax() {
    let parallax = new Parallax(document.getElementById('scene'));
  }

  plus(key) {
    switch (key) {
      case 1:
        if (this.signInUser.Jops.length < 3) {
          this.signInUser.Jops.push({ name: 'plus jop ' + this.signInUser.Jops.length })
          
        }
        break;
      case 2:
        if (this.signInUser.portfolios.length < 5) {
          this.signInUser.portfolios.push({ name: 'plus portfolio ' + this.signInUser.portfolios.length })
          
        }
        break;
      case 3:
        if (this.signInUser.loveSkills.length < 5) {
          this.signInUser.loveSkills.push({ name: '', label: 'plus skill ' + this.signInUser.loveSkills.length, file: '' })
        }
        break;
      case 4:
        if (this.signInUser.navLinks.length < 4) {
          this.signInUser.navLinks.push({ name: 'plus item ' + this.signInUser.navLinks.length, state: false })
        }
        break;
      case 5:

        this.signInUser.nameSkills.push({ name: 'plus name skill ' + this.signInUser.nameSkills.length })
        this.signInUser.skills.push([{ name: 'your skill', level: 'level3' }])


        break;
      case 6:

        this.signInUser.experiences.push({ date: '01.2017 - previously', job: 'web programing', at: 'college' })
        this.signInUser.experienceDis.push([{ name: 'Node.js, Php, Laravel' }])

        break;
      case 7:
        this.signInUser.projectButton.push({ name: 'name', key: '.key', state: false })
        break;
      case 8:
        this.projImag.push('../../../assets/images/project.jpg')
        this.projFiles.push('')
        this.signInUser.projects.push({
          key: this.signInUser.projectButton[0].key, position: (this.signInUser.projects.length + 1), img: '',
          title: 'awsome Web Site', proj: 'angular Web Site', name: '',
          state: false,
          site: { state: true, action: 'google.com' },
          github: { state: true, action: 'github.com' },
          youtube: { state: true, action: 'youtube.com' }
        })
        break;
    }

  }
  minus(key) {
    switch (key) {
      case 1:
        this.signInUser.Jops.pop()
        break;
      case 2:
        this.signInUser.portfolios.pop()
        break;
      case 3:
        this.signInUser.loveSkills.pop()

        break;
      case 4:
        this.signInUser.navLinks.pop()

        break;
      case 5:
        this.signInUser.nameSkills.pop()
        this.signInUser.skills.pop()

        break;
      case 6:
        this.signInUser.experiences.pop()
        this.signInUser.experienceDis.pop()
        break;
      case 7:
        this.signInUser.projectButton.pop()
        break;
      case 8:
        this.projImag.pop()
        this.projFiles.pop()
        this.signInUser.projects.pop()
        break;
    }
  }
  onSetImgAbout(key, file) {
    let newFile = file.target.files[0]
    if (key == 5) {
      this.signInUser.picture.label = newFile.name
      this.signInUser.picture.name = 'my-photo=' + this.signInUser.nameId
      this.signInUser.picture.file = newFile
    } else {
      this.signInUser.loveSkills[key].label = newFile.name
      this.signInUser.loveSkills[key].name = 'love-skils' + (key + 1) + '=' + this.signInUser.nameId
      this.signInUser.loveSkills[key].file = newFile
    }
   
  }
  setLevel(mainIndex, index, level) {
    this.signInUser.skills[mainIndex][index].level = "level" + level
  }
  plusSkill(index) {
    this.signInUser.skills[index].push({ name: 'your skill', level: 'level3' })
  }
  minusSkill(index) {
    this.signInUser.skills[index].pop()

  }
  plusExp(index) {
    this.signInUser.experienceDis[index].push({ name: 'new' })
  }
  minusExp(index) {
    this.signInUser.experienceDis[index].pop()

  }
  goProject() {
    this.projectState = !this.projectState
  }
  setProjImg(i) {
    document.getElementById('myInput' + i).click();
  }
  onOkyDialogProj(index, file) {
    file = file.target.files
    if (file && file[0]) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.projImag[index] = e.target.result as string;
      }
      reader.readAsDataURL(file[0]);
      this.projFiles[index] = file[0]
      this.signInUser.projects[index].name = 'projects' + (index + 1) + '=' + this.signInUser.nameId
    }
   
  }
  setSotialState(index, state, site) {
    this.signInUser.projects[index][site].state = state
  }
  setCv(index, file) {
    this.signInUser.my_cv[index] = file.target.files[0]
    this.signInUser.cvOption[index].name = 'your-cv1=' + this.signInUser.nameId
    this.signInUser.cvOption[index].my_cv = file.target.files[0].name
  }
  setFooterSotial(state, i) {
    this.signInUser.urls[i].state = state

  }
  setKey(i, ii) {
    this.signInUser.projects[i].key =this.signInUser.projectButton[ii].key
  }
  next(index) {
    if (index == 1 || index == 2)
      this.stpes[0] = true
    else if (index == 3 || index == 4)
      this.stpes[1] = true
    else if (index == 5 || index == 6 || index == 7 || index == 8)
      this.stpes[2] = true
    this.nextForm(index)
  }
  back(index) {
    if (index == 6)
      this.stpes[2] = false
    else if (index == 4)
      this.stpes[1] = false

    this.backForm(index)
  }
  nextForm(index) {
   
    
    if(!this.validationId(this.signInUser,(index+1)))
      return
    
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


  upload(index) {
    if(!this.validationId(this.signInUser,index))
      return


    const formData = new FormData();
    //-----------Form1-----------------
    formData.append('NameID', this.signInUser.nameId);
    formData.append('password', this.signInUser.password);
    formData.append('Jops', JSON.stringify(this.signInUser.Jops));

    //-----------Form2-----------------
    formData.append('name', this.signInUser.name);
    formData.append('portfolios', JSON.stringify(this.signInUser.portfolios));

    //-----------Form3-----------------
    formData.append(this.signInUser.picture.name, this.signInUser.picture.file);

    for (let index = 0; index < this.signInUser.loveSkills.length; index++)
      formData.append(this.signInUser.loveSkills[index].name, this.signInUser.loveSkills[index].file);

    //-----------Form4-----------------
    formData.append('navLinks', JSON.stringify(this.signInUser.navLinks));

    //-----------Form5-----------------
    let mySkills = []
    for (let i = 0; i < this.signInUser.nameSkills.length; i++)
      mySkills.push({ nameSkills: this.signInUser.nameSkills[i], skills: this.signInUser.skills[i] })
    formData.append('skills', JSON.stringify(mySkills));

    //-----------Form6-----------------
    let myExperiences = []
    for (let i = 0; i < this.signInUser.experiences.length; i++)
      myExperiences.push({ experiences: this.signInUser.experiences[i], experienceDis: this.signInUser.experienceDis[i] })
    formData.append('experiences', JSON.stringify(myExperiences));



    //-----------Form7-----------------
    let myProjects = [this.signInUser.projectButton, this.signInUser.projects];
    for (let i = 0; i < this.projFiles.length; i++)
      formData.append(this.signInUser.projects[i].name, this.projFiles[i])

    formData.append('projects', JSON.stringify(myProjects));


    for (let i = 0; i < this.signInUser.my_cv.length; i++)
      formData.append(this.signInUser.cvOption[i].name, this.signInUser.my_cv[i]);


    // formData.append('cvOption', JSON.stringify(this.cvOption));
    formData.append('urls', JSON.stringify(this.signInUser.urls));

    this.onUpload=true
    this.sendDataEffect()
    this.service.servPostImage('sign', formData,  (events) => {
      if (events.type === HttpEventType.UploadProgress) {
        this.loadeprog = Math.round(events.loaded / events.total * 100)

      }
      else if (events.type === HttpEventType.Response) {
        //  this.showTost('Successfuly!!', 'bg-success text-light', 50000);

        this.loadeprog = 130;
       setTimeout(() => {
        this.router.navigate(['portfolio/'+this.signInUser.nameId]);
       }, 10000);
      }
    })
  }
  
}







