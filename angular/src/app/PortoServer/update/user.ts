export class user {

    username = ''
    password = ''
    portfolio = {
      defLang: 'en',
      en: {
        name: 'abdullah',
        phrases: [{ name: 'Software developer' }, { name: 'Web designer' }, { name: 'Mobile apps creator' }],
        aboutMe: [{ name: 'asdsadas' }, { name: 'adsadsad' }, { name: 'adasdsadas' }],
        navLi: [{ name: 'about me', state: false }, { name: 'Skills', state: false }, { name: 'Experience', state: false },
        { name: 'Projects', state: false }, { name: 'Contact', state: false }],
        skills: [
          { nameSkill: 'Back-end', skill: [{ name: 'node js', level: 'level3' }, { name: 'php', level: 'level2' }, { name: 'laravel', level: 'level1' }] },
          { nameSkill: 'Front-end', skill: [{ name: 'html', level: 'level3' }, { name: 'css', level: 'level2' }, { name: 'javascript', level: 'level1' }] },
          { nameSkill: 'android', skill: [{ name: 'kotlin', level: 'level3' }] }
        ],
        experience: [
          { experiences: { date: '03.2018 - graduate', job: 'Software Developer', at: '' }, experienceDis: [{ name: 'Aandroid, Web, Desktop Application' }] }
        ],
  
      },
      another: {
        phrases: [{ name: 'Software developer' }, { name: 'Web designer' }, { name: 'Mobile apps creator' }],
        aboutMe: [{ name: 'asdsadas' }, { name: 'adsadsad' }, { name: 'adasdsadas' }],
        navLi: [{ name: 'about me' }, { name: 'Skills' }, { name: 'Experience' }, { name: 'Projects' }, { name: 'Contact' }]
      }
    }
    love_skills: any = [{ name: "", url: "../../../assets/images/project.jpg", state: false }]
    my_cv = { name: "", url: "../../../assets/images/project.jpg" }
    my_cv_pdf = { name: "", url: "google.com" }
    my_photo = { name: "", url: "../../../assets/images/project.jpg", state: false }
    display_cv = false;
    urls = [
      { name: 'facebook', state: true, action: 'facebook' },
      { name: 'github', state: true, action: 'https://github.com/Nerosoft' },
      { name: 'youtube', state: true, action: 'https://www.youtube.com/channel/UC7fpUDkbNDP2ioHvvTupSaQ' }
    ]
    projects: any = [
      [{ name: 'android', key: '.android', state: false }, { name: 'angular', key: '.ang', state: false }],
      [
        {
          name: "projects1=abdullah", key: 'ang', position: 1, img: '',
          title: 'angular Web Site', proj: 'angular Web Site', state: false,
          site: { state: true, action: 'google.com' },
          github: { state: true, action: 'github.com' },
          youtube: { state: true, action: 'youtube.com' }
  
        },
  
        {
          name: "projects2=abdullah", key: 'android', position: 2, img: '', title: 'android applications',
          site: { state: true, action: 'google.com' },
          github: { state: true, action: 'github.com' },
          youtube: { state: true, action: 'youtube.com' }
  
        }
      ]
    ]
  
    login = [
      { address: '', year: '', months: '', day: '', hour: '', minutes: '', seconds: '' }
    ]
    message = [
      { phone: 'sadsa', mes: 'asda', email: 'asda' }
    ]
  
    constructor() {
    }
  
  
  }