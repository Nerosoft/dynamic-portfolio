import { ToastService } from 'src/app/toasts/toast-service';
import { SignOperations } from '../sign-in/SignOperations';
import { user } from './user';
import { userServes } from 'src/app/PortoComponent/display/userServes';


export abstract class UpdateError {
    constructor(public toastService: ToastService) { }
    message = {
        en: {
            stNameId: 'Please Check From ID',
            stJops: 'Please Check From Your Jops',
            stname: 'Please Check From Your Name',
            stpassword: 'Please Check From Your Password',
            stportfolios: 'Please Check From Your portfolios',
            stpicture: 'Please Check From Your Picture',
            stloveSkills: 'Please Check From Your Love Skills',
            stnavLinks: 'Please Check From Your Link',
            stnameSkills: 'Please Check From Your Name Of Skill',
            stskills: 'Please Check From Your Skill',
            stexperiences: 'Please Check From Your Experiences',
            stexperienceDis: 'Please Check From Your Description Of Experience',
            stprojectButton: 'Please Check From Your Button Of Project',
            stproject: 'Please Check From Your Project',
            stmy_cv: 'Please Check From Your CV Image',
            stmy_cv_pdf: 'Please Check From Your CV PDF',
            stsite: 'Please Check From Your Site',
            stgithub: 'Please Check From Your Github',
            styoutube: 'Please Check From Your Youtube',

        },
    }
    stNameId = false
    stname = false
    stpassword = false
    stpicture = false
    stmy_cv = [false, false];
    stsotial = [false, false, false]

    newFile = null

    stJops:any = []
    stportfolios:any = []
    stloveSkills:any = []
    stnavLinks:any = []
    stnameSkills:any = []
    stskills: any[][] = [[]]
    stexperiences: any[] = [{}]
    stexperienceDis: boolean[][] = [[]]
    stprojectButton: any[] = [{}]
    stproject: any[] = [{}]

    allNameId:any = []
    projFiles:any = []

    clearError() {
        this.stJops = []
        this.stportfolios = []
        this.stloveSkills = []
        this.stnavLinks = []
        this.stnameSkills = []
        this.stskills = [[]]
        this.stexperiences = [{}]
        this.stexperienceDis = [[]]
        this.stprojectButton = [{}]
        this.stproject = [{}]
        this.stmy_cv = [false, false];
        this.stsotial = [false, false, false]
    }

    validation(user: user, key: Number) {
        this.clearError()
        this.toastService.toasts = []
        switch (key) {
            case 1:
                return this.validAM(user)
            case 2:
                return this.validAMP2(user)
            case 3:
                return this.validAMP3(user)
            case 4:
                return this.validAMP4(user)
            case 5:
                return this.validSkill(user)
            case 6:
                return this.validExperiences(user)
            case 7:
                return this.validProject(user)
            case 8:
                return this.validAddProject(user)
            case 9:
                return this.validContact(user)
            case 10:
                return this.validCv()
            case 11:
                return this.validCvPdf()
            case 12: 
                return this.validNB(user)
            default: {
                this.newFile = null
                return false
            }
        }

    }
    validAM(user: user) {
        let state: boolean = true
        if (this.isNull(user.portfolio.en.name) ||
            user.portfolio.en.name.length < 5) {
            this.stNameId = true
            this.makeTostError(this.message.en.stNameId)
            state = false
        } else this.stNameId = false

        //  console.log(user.Jops)
        user.portfolio.en.phrases.find((jop, index) => this.stJops[index] = this.isNull(jop) || jop.name.toString().length < 3)

        if (this.stJops.includes(true)) {
            this.makeTostError(this.message.en.stJops)
            state = false
        }
        return state
    }

    validAMP2(user: user) {
        let state: boolean = true

        //-----------------------------------------
        user.portfolio.en.aboutMe.find((portfolio, index) => this.stportfolios[index] = this.isNull(portfolio) || portfolio.name.toString().length < 7)

        if (this.stportfolios.includes(true)) {
            this.makeTostError(this.message.en.stportfolios)
            state = false
        }
        return state
    }
    validAMP3(user: user) {
        let state: boolean = true
        if (this.isNull(this.newFile) || !this.newFile || this.newFile.type != "image/png" && this.newFile.type != "image/jpeg") {
            this.makeTostError(this.message.en.stpicture)
            state = false
        }
        return state
    }
    validAMP4(user: user) {
        let state: boolean = true
        if (this.newFile == undefined || !this.newFile || this.newFile.type != "image/svg+xml") {
            this.makeTostError(this.message.en.stloveSkills)
            state = false
        }
        return state
    }

    validSkill(user: user) {
        let state: boolean = true
        user.portfolio.en.skills.forEach((nameSkill, index) => {
            this.stskills[index] = []
            user.portfolio.en.skills[index].skill.forEach((skill, ii) => this.stskills[index].push(skill.name.length < 5))
            this.stnameSkills[index] = this.isNull(nameSkill.nameSkill) || nameSkill.nameSkill.length < 5
        })

        if (this.stnameSkills.includes(true)) {
            this.makeTostError(this.message.en.stnameSkills)
            state = false
        }


        if (this.stskills.find(skill => skill.includes(true))) {
            this.makeTostError(this.message.en.stskills)
            state = false
        }


        return state
    }

    validExperiences(user: user) {
        let state: boolean = true

        user.portfolio.en.experience.find((exp, index) => {

            this.stexperiences[index] =
            {
                date: this.isNull(exp.experiences.date) || exp.experiences.date.length < 5,
                job: this.isNull(exp.experiences.job) || exp.experiences.job.length < 5,
                at: this.isNull(exp.experiences.at) || exp.experiences.at.length < 5
            }

            this.stexperienceDis[index] = []
            user.portfolio.en.experience[index].experienceDis.forEach((dis, i) => this.stexperienceDis[index].push(this.isNull(dis.name) || dis.name.length < 5))
            //= nameSkill.name == undefined || nameSkill.name.length < 5
        })

        if (this.stexperiences.find(exp => (Object.values(exp)).includes(true))) {
            this.makeTostError(this.message.en.stexperiences)
            state = false
        }

        if (this.stexperienceDis.find(dis => dis.includes(true))) {
            this.makeTostError(this.message.en.stexperienceDis)
            state = false
        }


        return state
    }

    validProject(user: user) {
        let state: boolean = true
        user.projects[0].forEach((but, i) => this.stprojectButton[i] = {
            name: this.isNull(but.name) || but.name.length < 5 || but.name.length > 17,
            key: this.isNull(but.key) || but.key.length < 3 || but.key.length > 7
        })

        user.projects[1].forEach((proj, i) => this.stproject[i] = {
            key: this.isNull(proj.key) || proj.key.length < 3,
            title: this.isNull(proj.title) || proj.title.length < 3,
            proj: this.isNull(proj.proj) || proj.proj.length < 3,
            // file: this.isNull(this.projFiles[i]) || this.projFiles[i].type != "image/png" && this.projFiles[i].type != "image/jpeg",
            site: this.isNull(proj.site.action) || proj.site.action.length < 7,
            github: this.isNull(proj.github.action) || proj.github.action.length < 7,
            youtube: this.isNull(proj.youtube.action) || proj.youtube.action.length < 7,
        })


        if (this.stprojectButton.find(but => Object.values(but).includes(true))) {
            this.makeTostError(this.message.en.stprojectButton)
            state = false
        }
        if (this.stproject.find(proj => Object.values(proj).includes(true))) {
            this.makeTostError(this.message.en.stproject)
            state = false
        }
        return state
    }

    validAddProject(user: user) {
        let state: boolean = true
     
        if (this.isNull(this.newFile) ||  this.newFile.type != "image/png" && this.newFile.type != "image/jpeg") {
            this.makeTostError(this.message.en.stproject)
            state = false
        }

        return state
    }

    validContact(user: user) {
        let state: boolean = true
        if (this.isNull(user.urls[0].action) || user.urls[0].action.length < 7) {
            this.stsotial[0] = true
            this.makeTostError(this.message.en.stsite)
            state = false
        }
        if (this.isNull(user.urls[1].action) || user.urls[1].action.length < 7) {
            this.stsotial[1] = true
            this.makeTostError(this.message.en.stgithub)
            state = false
        }
        if (this.isNull(user.urls[2].action) || user.urls[2].action.length < 7) {
            this.stsotial[2] = true
            this.makeTostError(this.message.en.styoutube)
            state = false
        }
        return state
    }

    validCv() {
        let state: boolean = true
        if (this.isNull(this.newFile) || this.newFile.type != "image/png" && this.newFile.type != "image/jpeg") {
            this.stmy_cv[0] = true
            this.makeTostError(this.message.en.stmy_cv)
            state = false
        }
        return state
    }

    validCvPdf() {
        let state: boolean = true
        if (this.isNull(this.newFile) || this.newFile.type != "application/pdf" ) {
            this.stmy_cv[1] = true
            this.makeTostError(this.message.en.stmy_cv_pdf)
            state = false
        }
        return state
    }

    validNB(user: user) {
        let state: boolean = true

        user.portfolio.en.navLi.find((navLinks, index) => this.stnavLinks[index] = navLinks.name == undefined || navLinks.name.length < 5 || navLinks.name.length > 13)

        if (this.stnavLinks.includes(true)) {
            this.makeTostError(this.message.en.stnavLinks)
            state = false
        }
        return state

    }

    isNull(data): boolean {
        return data == null || data == undefined
    }
    makeTostError(mes) {
        this.toastService.show(mes, { classname: 'bg-danger text-light', delay: 15000 });
    }

}