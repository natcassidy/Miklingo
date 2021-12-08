// imports of Express and MOngoDB
var express = require("express");
var mongodb = require("mongodb");
var mongoose = require("mongoose")
var cors = require("cors")
const Question = require('./Models/question')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/files/')
    },
    filename: function (req, file, cb) {
      var filename = file.originalname;
      var fileExtension = filename.split(".")[1];
      cb(null, Date.now() + "." + fileExtension);
    }
  }); 
const upload = multer({ storage: storage });


//credentials variables for MongoDB
var username = "group16"
var password = "ButterElectric78";
var localHost = "127.0.0.1";
var localPort = "27017";
var database = "group16"

//Acces to express framework by variable server
var server = express();

//setting a defoult PORT and a emergecy port in case 3006 is in use
process.env.PORT = '3021';
const port = (process.env.PORT || 3080);

//enables recognition of incoming data as JSON 
server.use(express.json());
server.use(cors())
server.use(express.urlencoded({ extended: true})); // convention to always allow as TRUE

//statci path to access JavaScript and CSS files 
// server.use("/scripts", express.static(__dirname + "/scripts"));
// server.use("/css", express.static(__dirname + "/css"));
// server.use(express.static(__dirname));

// var allowCrossDomain = function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//     res.header("Access-Control-Allow-Headers", "Content-Type");
//     next();
// };
// server.use(allowCrossDomain);

//connecting to MongoDB using credential
const URI = 'mongodb+srv://acrus865:miklingo@miklingo.zsmz4.mongodb.net/miklingo?retryWrites=true&w=majority'

//connect to the mongodb database
mongoose.connect(URI)
    .then(result => {
        server.listen(port, () => {
            console.log(`Listening on port ${port}`)
        })
    })
    .catch(err => "Error connecting" + err)

server.get("/", (req, res) => {
    res.send("Response")
})

server.get('/level/:levelNumber', (req, res) => {
    Question.find({level: req.params.levelNumber})
        .then((result) => {
            res.send(result)
        })
        .catch(err => console.log(err))
})

server.post('/new-question', upload.array("files", 5), (req, res) => {
    console.log('request files ', req.files)
    console.log('request body ', req.body)

    let question

    if(req.body.level == 1) {
        question = new Question({
            level: req.body.level,  
            question: "",
            responses: {
                option1: {
                    hint: req.body.hint1o1,
                    answer: req.body.answer1o1,
                    audioLink: req.files[1].filename
                },
                option2: {
                    hint: req.body.hint1o2,
                    answer: req.body.answer1o2,
                    audioLink: req.files[2].filename
                },
                option3: {
                    hint: req.body.hint1o3,
                    answer: req.body.answer1o3,
                    audioLink: req.files[3].filename
                }
            },
            audioLinkQuestion: "",
            imageLink: req.files[0].filename
        })
    } else {
        question = new Question({
            level: req.body.level, 
            question: req.body.questionLevel2,
            responses: {
                option1: {
                    hint: req.body.hint2o1,
                    answer: req.body.answer2o1,
                    audioLink: req.files[1].filename
                },
                option2: {
                    hint: req.body.hint2o2,
                    answer: req.body.answer2o2,
                    audioLink: req.files[2].filename
                },
                option3: {
                    hint: req.body.hint2o3,
                    answer: req.body.answer2o3,
                    audioLink: req.files[3].filename
                }
            },
            audioLinkQuestion: req.files[0].filename,
            imageLink: ""
        })
    }

    question.save()
        .then((result) => {
            res.send(result)
            console.log("result success", result)
        })
        .catch((err) => {
            console.log("error saving " + err)
        })
})