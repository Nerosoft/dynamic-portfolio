import { SignOperations } from './SignOperations';
import { SignUser } from './SignUser';
import { ToastService } from 'src/app/toasts/toast-service';
import { ElementRef, TemplateRef } from '@angular/core';

export abstract class SignError implements SignOperations {
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

    allNameId = []
    projFiles = []

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
    validationId(user: SignUser, key) {
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
                return this.validNB(user)
            case 5:
                return this.validSkill(user)
            case 6:
                return this.validExperiences(user)
            case 7:
                return this.validProject(user)
            case 8:
                return this.validContact(user)

            default: return false
        }
    }

    validAM(user: SignUser) {
        let state: boolean = true
        if (user.nameId == undefined ||
            user.nameId.length < 5 ||
            this.allNameId.find(name => name == user.nameId)) {
            this.stNameId = true
            this.makeTostError(this.message.en.stNameId)
            state = false
        } else this.stNameId = false

        //  console.log(user.Jops)
        user.Jops.find((jop, index) => this.stJops[index] = jop == undefined || jop.name.toString().length < 3)


        if (this.stJops.includes(true)) {
            this.makeTostError(this.message.en.stJops)
            state = false
        }
        return state
    }

    validAMP2(user: SignUser) {
        let state: boolean = true
        //-------------------------------
        if (user.name == undefined ||
            user.name.length < 5) {
            this.stname = true
            this.makeTostError(this.message.en.stname)
            state = false
        } else this.stname = false
        //---------------------------------
        if (user.password == undefined ||
            user.password.length < 7) {
            this.stpassword = true
            this.makeTostError(this.message.en.stpassword)
            state = false
        } else this.stpassword = false


        //-----------------------------------------
        user.portfolios.find((portfolio, index) => this.stportfolios[index] = portfolio == undefined || portfolio.name.toString().length < 7)


        if (this.stportfolios.includes(true)) {
            this.makeTostError(this.message.en.stportfolios)
            state = false
        }
        return state
    }

    validAMP3(user: SignUser) {
        let state: boolean = true
        //-------------------------------

        if (user.picture.file == undefined ||
            !user.picture.file || user.picture.file.type != "image/png" && user.picture.file.type != "image/jpeg") {
            this.stpicture = true
            this.makeTostError(this.message.en.stpicture)
            state = false
        } else this.stpicture = false
        //---------------------------------


        user.loveSkills.find((loveSkills, index) => this.stloveSkills[index] = loveSkills.file == undefined || !loveSkills.file ||
            loveSkills.file.type != "image/svg+xml")
  

        if (this.stloveSkills.includes(true)) {
            this.makeTostError(this.message.en.stloveSkills)
            state = false
        }
        return state
    }

    validNB(user: SignUser) {
        let state: boolean = true

        user.navLinks.find((navLinks, index) => this.stnavLinks[index] = navLinks.name == undefined || navLinks.name.length < 5 || navLinks.name.length > 13)


        if (this.stnavLinks.includes(true)) {
            this.makeTostError(this.message.en.stnavLinks)
            state = false
        }
        return state

    }

    validSkill(user: SignUser) {
        let state: boolean = true
        user.nameSkills.forEach((nameSkill, index) => {
            this.stskills[index] = []
            user.skills[index].forEach((skill, ii) => this.stskills[index].push(skill.name.length < 5))
            this.stnameSkills[index] = nameSkill.name == undefined || nameSkill.name.length < 5
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

    validExperiences(user: SignUser) {
        let state: boolean = true

        user.experiences.find((exp, index) => {

            this.stexperiences[index] =
            {
                date: exp.date == undefined || exp.date.length < 5,
                job: exp.job == undefined || exp.job.length < 5,
                at: exp.at == undefined || exp.at.length < 5
            }

            this.stexperienceDis[index] = []
            user.experienceDis[index].forEach((dis, i) => this.stexperienceDis[index].push(dis.name == undefined || dis.name.length < 5))
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

    validProject(user: SignUser) {
        let state: boolean = true
        user.projectButton.forEach((but, i) => this.stprojectButton[i] = {
            name: this.isNull(but.name) || but.name.length < 5 || but.name.length > 17,
            key: this.isNull(but.key) || but.key.length < 3 || but.key.length > 7
        })

        user.projects.forEach((proj, i) => this.stproject[i] = {
            key: this.isNull(proj.key) || proj.key.length < 3,
            title: this.isNull(proj.title) || proj.title.length < 3,
            proj: this.isNull(proj.proj) || proj.proj.length < 3,
            file: this.isNull(this.projFiles[i]) || this.projFiles[i].type != "image/png" && this.projFiles[i].type != "image/jpeg",
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

    validContact(user: SignUser) {
        let state: boolean = true
        if (this.isNull(user.my_cv[0]) || user.my_cv[0].type != "image/png" && user.my_cv[0].type != "image/jpeg") {
            this.stmy_cv[0] = true
            this.makeTostError(this.message.en.stmy_cv)
            state = false
        }

        if (this.isNull(user.my_cv[1]) || user.my_cv[1].type != "application/pdf") {
            this.stmy_cv[1] = true
            this.makeTostError(this.message.en.stmy_cv_pdf)
            state = false
        }


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

    isNull(data): boolean {
        return data == null || data == undefined
    }
    makeTostError(mes) {
        this.toastService.show(mes, { classname: 'bg-danger text-light', delay: 15000 });
    }
}



// this.toastService.show("asa", { classname: 'bg-success text-light', delay: 15000 });