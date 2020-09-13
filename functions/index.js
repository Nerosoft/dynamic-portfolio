const functions = require('firebase-functions');
const espress = require("express");
//npm i handlebars consolidate --save
const engines = require('consolidate');
const Busboy = require('busboy');
const os = require('os');
const fs = require('fs');
const path = require('path');






var app = espress();



app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.set('views', './views');
app.engine('hbs', engines.handlebars);
app.set('view engine', 'hbs');



var firebase = require('firebase-admin');


// Fetch the service account key JSON file contents
var serviceAccount = require("./serviceAccountKey.json");

// Initialize the app with a service account, granting admin privileges
var config = {
  projectId: 'ID Project',
  keyFilename: '/functions/serviceAccountKey.json',
  credentials: serviceAccount
};
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "URL"
});
var db = firebase.database();






const { Storage } = require('@google-cloud/storage');//-----------
const storage = new Storage(config);//-----------


const appspot = 'appspot.com/'



function filesUpload(req, res, next) {
  // See https://cloud.google.com/functions/docs/writing/http#multipart_data
  const busboy = new Busboy({
    headers: req.headers,
    limits: {
      // Cloud functions impose this restriction anyway
      fileSize: 10 * 1024 * 1024,
    }
  });

  const fields = {};
  const files = [];
  const fileWrites = [];
  // Note: os.tmpdir() points to an in-memory file system on GCF
  // Thus, any files in it must fit in the instance's memory.
  const tmpdir = os.tmpdir();

  busboy.on('field', (key, value) => {
    // You could do additional deserialization logic here, values will just be
    // strings
    fields[key] = value;
  });

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    const filepath = path.join(tmpdir, filename);
    console.log(`Handling file upload field ${fieldname}: ${filename} (${filepath})`);
    const writeStream = fs.createWriteStream(filepath);
    file.pipe(writeStream);

    fileWrites.push(new Promise((resolve, reject) => {
      file.on('end', () => writeStream.end());
      writeStream.on('finish', () => {
        fs.readFile(filepath, (err, buffer) => {
          const size = Buffer.byteLength(buffer);
          console.log(`${filename} is ${size} bytes`);
          if (err) {
            return reject(err);
          }

          files.push({
            fieldname,
            originalname: filename,
            encoding,
            mimetype,
            buffer,
            size,
          });

          try {
            fs.unlinkSync(filepath);
          } catch (error) {
            return reject(error);
          }

          resolve();
        });
      });
      writeStream.on('error', reject);
    }));
  });

  busboy.on('finish', () => {
    Promise.all(fileWrites)
      .then(() => {
        req.body = fields;
        req.files = files;
        next();
        return
      })
      .catch(next);
  });

  busboy.end(req.rawBody);
}

//-----------------api---------------------
app.post('/sign', filesUpload, (req, res) => {
  //var http = req.query;
  if (!req.files) {
    console.log("No file received");
    return res.send({
      success: false
    });

  } else {
    console.log('file received');


    initializePortfolio(req)
    return res.send({
      success: true
    })
  }

});



app.post('/api/jop', (req, res) => {
  //var http = req.query;
  db.ref('/users/' + req.body.username + '/portfolio/en/').once('value').then(function (snapshot) {
    return snapshot.ref.update({ name: req.body.name, phrases: req.body.phrases }, (error) => {
      res.send({ state: true, info: snapshot.val() })
    })
  }).catch(error => { })
});


app.post('/api/portfolio', (req, res) => {
  //var http = req.query;
  db.ref('/users/' + req.body.username + '/portfolio/en/').once('value').then(function (snapshot) {
    return snapshot.ref.update({ aboutMe: req.body.aboutMe }, (error) => {
      res.send({ state: true, info: snapshot.val() })
    })
  }).catch(error => { })
});


app.post('/api/loveskill', filesUpload, (req, res) => {
  //var http = req.query;
  let image = req.files[0]
  new SaveFile().saveImage(image.fieldname, 'portfolio/love-skills/' + image.fieldname,
    image.buffer, image.mimetype).then(data => {
      return db.ref('/users/' + req.body.username + '/love_skills/' + req.body.index).update({ name: image.fieldname, url: data, state: false }, (error) => {
        res.send({ state: true, data: { name: image.fieldname, url: data } })
      })
    }).catch(error => { })
});


app.post('/api/myphoto', filesUpload, (req, res) => {
  //var http = req.query;
  let image = req.files[0]
  new SaveFile().saveImage(image.fieldname, 'portfolio/my-photo/' + image.fieldname,
    image.buffer, image.mimetype).then(data => {
      return db.ref('/users/' + req.body.username + '/my_photo/').update({ name: image.fieldname, url: data, state: false }, (error) => {
        res.send({ state: true, data: { name: image.fieldname, url: data } })
      })
    }).catch(error => { })
});

app.post('/api/plusloveskill', filesUpload, (req, res) => {
  //var http = req.query;
  let image = req.files[0]
  let name = getNameOfIMage(image)

  new SaveFile().saveImage(image.fieldname, 'portfolio/love-skills/' + name,
    image.buffer, image.mimetype).then(data => {
      return db.ref('/users/' + req.body.username + '/love_skills/' + req.body.index).set({ name: name, url: data, state: false }, (error) => {
        res.send({ state: true, data: { name: name, url: data } })
      })
    }).catch(error => { })
});



app.post('/api/hideSkill', (req, res) => {
  //var http = req.query;
  db.ref('/users/' + req.body.username + '/love_skills/' + req.body.index).update({ state: req.body.state }, (error) => {
    return res.send({ state: true })
  }).catch(error => { })
});


app.post('/api/hidePhoto', (req, res) => {
  //var http = req.query;
  db.ref('/users/' + req.body.username + '/my_photo/').update({ state: req.body.state }, (error) => {
    return res.send({ state: true })
  }).catch(error => { })
});



app.post('/api/skills', (req, res) => {
  //var http = req.query;
  db.ref('/users/' + req.body.username + '/portfolio/en/').update({ skills: req.body.skills }, (error) => {
    return res.send({ state: true })
  }).catch(error => { })

});


app.post('/api/experience', (req, res) => {
  //var http = req.query;
  db.ref('/users/' + req.body.username + '/portfolio/en/').update({ experience: req.body.experience }, (error) => {
    return res.send({ state: true })
  }).catch(error => { })

});



app.post('/api/cvimage', filesUpload, (req, res) => {
  //var http = req.query;
  let image = req.files[0]
  new SaveFile().saveImage(image.fieldname, 'portfolio/my-cv-img/' + image.fieldname,
    image.buffer, image.mimetype).then(data => {
      return db.ref('/users/' + req.body.username + '/my_cv/').update({ name: image.fieldname, url: data }, (error) => {
        res.send({ state: true, data: { name: image.fieldname, url: data } })
      })
    }).catch(error => { })
});




app.post('/api/cvimagepdf', filesUpload, (req, res) => {
  //var http = req.query;
  let image = req.files[0]
  new SaveFile().saveImage(image.fieldname, 'portfolio/my-cv-pdf/' + image.fieldname,
    image.buffer, image.mimetype).then(data => {
      return db.ref('/users/' + req.body.username + '/my_cv_pdf/').update({ name: image.fieldname, url: data }, (error) => {
        res.send({ state: true, data: { name: image.fieldname, url: data } })
      })
    }).catch(error => { })
});




app.post('/api/hideurl', (req, res) => {
  //var http = req.query;
  db.ref('/users/' + req.body.username + '/urls/' + req.body.index).update({ state: req.body.state }, (error) => {
    return res.send({ state: true })
  }).catch(error => { })
});



app.post('/api/showcv', (req, res) => {
  //var http = req.query;
  db.ref('/users/' + req.body.username + '/').update({ display_cv: req.body.state }, (error) => {
    return res.send({ state: true })
  }).catch(error => { })
});


app.post('/api/urls', (req, res) => {
  //var http = req.query;
  db.ref('/users/' + req.body.username + '/').update({ urls: req.body.urls }, (error) => {
    return res.send({ state: true })
  }).catch(error => { })

});





app.post('/api/hidesection', (req, res) => {
  //var http = req.query;
  db.ref('/users/' + req.body.username + '/portfolio/en/navLi/' + req.body.index).update({ state: req.body.state }, (error) => {
    return res.send({ state: true })
  }).catch(error => { })
});


app.post('/api/navbar', (req, res) => {
  //var http = req.query;
  db.ref('/users/' + req.body.username + '/portfolio/en/').update({ navLi: req.body.navLi }, (error) => {
    return res.send({ state: true })
  }).catch(error => { })

});



app.post('/api/updateimageproj', filesUpload, (req, res) => {
  //var http = req.query;
  let image = req.files[0]
  new SaveFile().saveImage(image.fieldname, 'portfolio/my-projects/' + image.fieldname,
    image.buffer, image.mimetype).then(data => {
      return db.ref('/users/' + req.body.username + '/projects/1/' + req.body.index).update({ name: image.fieldname, img: data }, (error) => {
        res.send({ state: true, data: { name: image.fieldname, url: data } })
      })
    }).catch(error => { })
});


app.post('/api/updateprojects', (req, res) => {
  //var http = req.query;
  db.ref('/users/' + req.body.username + '/').update({ projects: req.body.projects }, (error) => {
    res.send({ state: true })
  })

});


app.post('/api/hideproject', (req, res) => {
  //var http = req.query;
  db.ref('/users/' + req.body.username + '/projects/1/' + req.body.index).update({ state: req.body.state }, (error) => {
    res.send({ state: true })
  })
});



app.post('/api/addproject', filesUpload, (req, res) => {
  //var http = req.query;
  let image = req.files[0]
  new SaveFile().saveImage(image.fieldname, 'portfolio/my-projects/' + getNameOfIMage(image),
    image.buffer, image.mimetype).then(data => {
      let proj = JSON.parse(req.body.project)
      proj.img = data
      proj.name = getNameOfIMage(image)

      return db.ref('/users/' + req.body.username + '/projects/1/' + req.body.index).set(proj, (error) => {
        res.send({ state: true, data: proj })
      })

    }).catch(error => { })
});



app.post('/api/sendmessage', (req, res) => {
  //var http = req.query;
  db.ref('/users/' + req.body.username + '/message/').push({ email: req.body.email, phone: req.body.phone, mes: req.body.mes }, error => {
    res.send({ state: true })
  })
});

app.post('/api/setlogin', (req, res) => {
  //var http = req.query;

  db.ref('/users/' + req.body.username + '/login/').push({
    address: req.body.address,
    year: req.body.year,
    months: req.body.months,
    day: req.body.day,
    hour: req.body.hour,
    minutes: req.body.minutes,
    seconds: req.body.seconds
  }, error => {
    res.send({ state: true })
  })
});


app.post('/api/deletitem', (req, res) => {
  //var http = req.query;
  db.ref('/users/' + req.body.username + '/' + req.body.postion + '/').child(req.body.index).remove(error => {
    res.send({ state: true })
  })
});


//----------------end api------------------
function initializePortfolio(req) {
  let images = req.files
  //--------form1-------------
  let NameID = req.body.NameID
  let password = req.body.password
  let Jops = JSON.parse(req.body.Jops)
  //--------form2-------------
  let name = req.body.name
  let portfolios = JSON.parse(req.body.portfolios)
  //--------form3-------------
  let my_photo = {};
  let loveSkills = { image: [] }
  //--------form4-------------
  let navLinks = JSON.parse(req.body.navLinks)
  //--------form5------------- 
  let skills = JSON.parse(req.body.skills)
  //--------form6-------------
  let experiences = JSON.parse(req.body.experiences)
  //--------form7-------------
  let projectsImages = { image: [] }
  let projects = JSON.parse(req.body.projects)

  let my_cv = {}
  let my_cv_pdf = {}
  //let cvOption = JSON.parse(req.body.cvOption)
  let urls = JSON.parse(req.body.urls)

  getIMages(my_photo, loveSkills, projectsImages, my_cv, my_cv_pdf, images)


  let HeroUser = setupUser(NameID, password, name, Jops, portfolios, navLinks, skills, experiences, projects, urls)


  new Promise((resolve, reject) => {
    let love = []
    new SaveFile().saveDataBAse(0, loveSkills.image.length, love, loveSkills.image, resolve, 'portfolio/love-skills/', NameID)
  }).then(data => {
    HeroUser.love_skills = data;
    for (let i = 0; i < HeroUser.love_skills.length; i++)
      HeroUser.love_skills[i].state = false
    new SaveFile().saveImage(NameID,
      'portfolio/my-photo/' + getNameOfIMage(my_photo.image), my_photo.image.buffer,
      my_photo.image.mimetype).then(data => {//----
        HeroUser.my_photo = { url: data, name: getNameOfIMage(my_photo.image), state: false }

        new SaveFile().saveImage(NameID,
          'portfolio/my-cv-img/' + getNameOfIMage(my_cv.image), my_cv.image.buffer,
          my_cv.image.mimetype).then(data => {//---
            HeroUser.my_cv = { url: data, name: getNameOfIMage(my_cv.image) }

            new SaveFile().saveImage(NameID,
              'portfolio/my-cv-pdf/' + getNameOfIMage(my_cv_pdf.image), my_cv_pdf.image.buffer,
              my_cv_pdf.image.mimetype).then(data => {//---
                HeroUser.my_cv_pdf = { url: data, name: getNameOfIMage(my_cv_pdf.image) }
                new Promise((resolve, reject) => {
                  let project = []
                  new SaveFile().saveDataBAse(0, projectsImages.image.length, project, projectsImages.image, resolve, 'portfolio/my-projects/', NameID)
                }).then(data => {//----
                  for (let i = 0; i < HeroUser.projects[1].length; i++)
                    for (let ii = 0; ii < data.length; ii++)
                      if (data[ii].name.substring(0, data[ii].name.length - 4) === HeroUser.projects[1][i].name) {
                        HeroUser.projects[1][i].img = data[ii].url
                        HeroUser.projects[1][i].name = data[ii].name
                      }



                  console.log(HeroUser)

                  db.ref('/users/' + NameID).set(HeroUser, (error) => { })
                  return
                }).catch(error => { })
                return
              }).catch(error => { })
            return
          }).catch(error => { })
        return
      }).catch(error => { })
    return
  }).catch(error => { })



}



function getNameOfIMage(file) {
  let originalname = file.originalname;
  let fieldname = file.fieldname;
  fieldname += originalname.substring(originalname.length - 4)
  return fieldname
}

function getIMages(my_photo, loveSkills, projectsImages, my_cv, my_cv_pdf, images) {
  for (let i = 0; i < images.length; i++)
    if (images[i].fieldname.includes("my-photo"))
      my_photo.image = images[i]
    else if (images[i].fieldname.includes("love-skils"))
      loveSkills.image.push(images[i])
    else if (images[i].fieldname.includes("projects"))
      projectsImages.image.push(images[i])
    else if (images[i].fieldname.includes("your-cv1="))
      if (images[i].mimetype === 'image/jpeg')
        my_cv.image = images[i]
      else my_cv_pdf.image = images[i]


}

class SaveFile {
  saveImage(nameID, name, file, type) {
    return new Promise((resolve, reject) => {
      const storage = new Storage(config);
      const bucket = storage.bucket(appspot);
      bucket.file(name).save(file, {
        resumable: false,
        metadata: {
          contentType: type,

          metadata: {
            nameID: nameID
          }
        }

      }).then(this.saveToMyIMage(name, resolve)).catch(error => { })
    })
  }

  saveToMyIMage(name, resolve) {
    const linkBucket = storage.bucket(appspot);
    let spaceRef = linkBucket.file(name);

    spaceRef.getSignedUrl({
      action: 'read',
      expires: '03-09-2491'
    }).then(signedUrls => {
      return resolve(signedUrls[0])
    }).catch(error => { })

  }


  saveDataBAse(pointer, size, love, files, mainResolve, linkData, NameID) {
    new Promise((resolve, reject) => {

      if (pointer === size) {
        console.log('FINSH ', pointer, size)
        mainResolve(love);
      } else {

        resolve({ pointer: pointer, size: size, love: love, files: files, mainResolve: mainResolve, linkData: linkData, NameID: NameID })
      }

    }).then(data => {
      let imageFile = data.files[data.pointer]



      this.saveImage(data.NameID,
        data.linkData + getNameOfIMage(imageFile), imageFile.buffer,
        imageFile.mimetype).then(info => {

          data.love.push({ url: info, name: getNameOfIMage(imageFile) })
          console.log('fieldname', imageFile.fieldname)
          this.saveDataBAse(++data.pointer, data.size, data.love, data.files, data.mainResolve, data.linkData, data.NameID)
          return
        }).catch(error => { })

        return 
    }).catch(error => { })
  }

  getNameOfIMage(file) {
    let originalname = file.originalname;
    let fieldname = file.fieldname;
    fieldname += originalname.substring(originalname.length - 4)
    return fieldname
  }

}




// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.abdo = functions.https.onRequest(app);

function setupUser(NameID, password, name, Jops, portfolios, navLinks, skills, experiences, projects, urls) {
  let newUser = new user(NameID)

  newUser.portfolio.en.name = name
  newUser.password = password
  newUser.portfolio.en.phrases = Jops
  newUser.portfolio.en.aboutMe = portfolios
  newUser.portfolio.en.navLi = navLinks
  newUser.portfolio.en.skills = []
  for (let i = 0; i < skills.length; i++)
    newUser.portfolio.en.skills.push({ nameSkill: skills[i].nameSkills.name, skill: skills[i].skills })

  newUser.portfolio.en.experience = []

  for (let i = 0; i < experiences.length; i++)
    newUser.portfolio.en.experience.push({ experiences: experiences[i].experiences, experienceDis: experiences[i].experienceDis })

  newUser.projects = projects

  newUser.urls = urls



  return newUser;
}

class user {

  constructor(username) {
    this.username = username;
    this.password = ''
    this.portfolio = {
      defLang: 'en',
      en: {
        name: 'abdullah',
        phrases: [{ name: 'Software developer' }, { name: 'Web designer' }, { name: 'Mobile apps creator' }],
        aboutMe: [{ name: 'asdsadas' }, { name: 'adsadsad' }, { name: 'adasdsadas' }],
        navLi: [{ name: 'about me' }, { name: 'Skills' }, { name: 'Experience' }, { name: 'Projects' }, { name: 'Contact' }],
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
        phrases: ['Abdullah', 'Software developer', 'Web designer', 'Mobile apps creator'],
        aboutMe: ["سشبيسبيسلي", "يبسللللللثقثقلثق", "ؤلاىلاؤةاتةتيلافقافق", "سيبسيبسيبسي", "فغعغهعغهخغه"],
        navLi: ['About me', 'Skills', 'Experience', 'Projects', 'Contact']
      }
    }
    this.love_skills = ['1', '2', '3', '4'];
    this.my_cv = '1';
    this.my_cv_pdf = '1';
    this.my_photo = '';
    this.display_cv = false;
    this.urls = [
      { name: 'facebook', state: true, action: 'facebook' },
      { name: 'github', state: true, action: 'https://github.com/Nerosoft' },
      { name: 'youtube', state: true, action: 'https://www.youtube.com/channel/UC7fpUDkbNDP2ioHvvTupSaQ' }
    ]
    this.projects = [[{ name: 'android', key: '.android' }, { name: 'angular', key: '.ang' }],
    [
      {
        name: "projects1=abdullah", key: 'ang', position: 1, img: '',
        title: 'angular Web Site', proj: 'angular Web Site',
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
    ],

      this.login = [
        { address: '', year: '', months: '', day: '', hour: '', minutes: '', seconds: '' }
      ],
      this.message = [
        { phone: '', mes: '', email: '' }
      ]
  }


}

