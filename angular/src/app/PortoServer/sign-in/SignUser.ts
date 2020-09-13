export class SignUser {
   
    nameId = ''
  password = ''
 
  name = 'your name'
  Jops = [{ name: 'jop' }]
  portfolios = [{ name: 'portfolio' }]
  picture:any = { name: '', label: 'def picture', file: '' }
  loveSkills:any = [{ name: '', label: 'skils', file: '' }]
  navLinks = [{ name: 'about me', state: false }, { name: 'Skills', state: false },
  { name: 'Experience', state: false }, { name: 'Projects', state: false }, { name: 'Contact', state: false }]
  skills = [[{ name: 'your skill', level: 'level3' }]]
  nameSkills = [{ name: 'backend' }]
  experiences:any = [{ date: '01.2017 - previously', job: 'web programing', at: 'college' }]
  experienceDis = [[{ name: 'Node.js, Php, Laravel' }]]




  projectButton = [{ name: 'angular', key: 'ang', state: false }]

  projects = [{
    key: '', position: 1, name: '', img: '', state: false,
    title: 'awsome Web Site', proj: 'angular Web Site',
    site: { state: true, action: 'google.com' },
    github: { state: true, action: 'github.com' },
    youtube: { state: true, action: 'youtube.com' }
  }]

  my_cv:any = ['image', 'pdf']
  cvOption = [{ name: '', label: 'C.V', my_cv: 'image', display_cv: false },
  { name: '', label: 'C.V-PDF', my_cv: 'pdf' }]
  urls = [
    { name: 'facebook', state: false, action: 'facebook' },
    { name: 'github', state: false, action: 'https://github.com' },
    { name: 'youtube', state: false, action: 'https://www.youtube.com' }
  ]
    constructor() {
    }
}