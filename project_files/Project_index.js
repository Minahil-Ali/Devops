var express = require("express");
var cors = require("cors");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

var app = express();

app.use(cors());

const multer = require("multer");

var mysql = require("mysql");

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "firstdbb",
});

conn.connect(function (err) {
  if (err) throw err;

  console.log("Connection Sucessful");
});

app.get("/mail", function (req, res) {
  const nodemailer = require("nodemailer");
  let testAccount = nodemailer.createTestAccount();
});


app.get("/", function (req, res) {
  res.render("insert");
});

app.post("/insert", function (req, res) {
  var fname = req.body.fname;
  var email = req.body.email;
  var hp = req.body.hospital;
  var location = req.body.location;
  var lastname = req.body.lname;
  var phone = req.body.phone;
  var specialization = req.body.specialization;
  var gender = req.body.gender;
  var expertise = req.body.Expertise;
  var note = req.body.Note;
  var Starttime = req.body.Starttime;
  var Endtime = req.body.Endtime;

  var note = req.body.Note;
  var sql = `insert into doctor(fname,lname,location,hospital,email,phone,gender,specialization,Expertise,Note,Starttime,Endtime) values('${fname}', '${lastname}', '${location}', '${hp}', '${email}', '${phone}', '${gender}','${specialization}','${expertise}','${note}','${Starttime}','${Endtime}')`;

  conn.query(sql, function (err, results) {
    if (err) throw err;

    res.send("<h1>Data Inserted.</h1>");
  });
});



app.get("/viewDoc", function (req, res) {
  var sql = 'SELECT fname,lname,location,hospital,email,phone,gender,specialization,Expertise,Note,Starttime,Endtime FROM doctor';
  conn.query(sql, function (err2, results) {
    if (err2) {
      console.error(err2);
    } else {
      res.json(results);
    }
  });
});


app.get("/viewAppointments", function (req, res) {
  var sql = 'SELECT * FROM appoint';
  conn.query(sql, function (err2, results) {
    if (err2) {
      console.error(err2);
    } else {
      res.json(results);
    }
  });
});


app.get("/getBySpecialization", function (req, res) {

  var sql = 'SELECT fname,lname,location,hospital,email,phone,gender,specialization,Note,Starttime,Endtime FROM doctor';
  conn.query(sql, function (err2, results) {
    if (err2) {
      console.error(err2);
    } else {
      res.json(results);
    }
  });
});


app.get("/getByExpertise", function (req, res) {

  var sql = 'SELECT fname,lname,location,hospital,email,phone,gender,Expertise,Note,Starttime,Endtime FROM doctor';
  conn.query(sql, function (err2, results) {
    if (err2) {
      console.error(err2);
    } else {

      res.json(results);
    }
  });
});


app.post("/appoint1", function (req, res) {

  var name = req.body.name;
  var email = req.body.email;
  var user_name = req.body.user_name;
  var description = req.body.description;
  var user_name = req.body.user_name;
  const min = 100000;
  const max = 999999;
  var randomNum = Math.floor(Math.random() * (max - min + 1) + min);

  var sql = `insert into appoint(name,email,user_name,description,randomNum) values('${name}','${email}', '${user_name}','${description}','${randomNum}')`;

  conn.query(sql, function (err, results) {
    if (err) throw err;
    else {



      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'maria.ernser@ethereal.email',
          pass: 'sWmUxFQVyTU3nbDFnj'
      }
      });

      let info = transporter.sendMail({
        from: '"Muhammad Sameed khan " <maria.ernser@ethereal.email', // sender address
        to: "maria.ernser@ethereal.email", // list of receivers
        subject: "Test mail", // Subject line
        text: "This is my test sameed mail code ", // plain text body
        html: "<h1 style='color:red;'>Mail sameedd</h1>", // html body
      });

      res.send("<h1>Data Inserted.</h1>");
    }

  });
});

app.post("/insert1", function (req, res) {

  const salt = bcrypt.genSaltSync(10);
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  const hash = bcrypt.hashSync(password, salt);


  var sql = `insert into login(name,email,password) values('${name}','${email}', '${hash}')`;

  conn.query(sql, function (err, results) {
    if (err) throw err;

    res.send("<h1>Data Inserted.</h1>");
  });
});

app.post("/findDoc", function (req, res) {
  var fname = req.body.fname;
  var email = req.body.email;


  var sql = `SELECT * FROM doctor WHERE fname = '${fname}'`;
  conn.query(sql, function (err2, results) {
    if (err2) {
      console.error(err2);
    } else {
      console.log("adf");
      //res.json(1);
      var found = false;
      results.forEach(element => {
        console.log(element.email);
        if (email == element.email && found == false) {
          found = true;
        }
      });
      if (found == true) {
        res.json(1);
      }
      else {
        res.json(-1);
      }
    }

  });
});

app.post("/getdataAdmin", function (req, res) {
  var password = req.body.password;
  var email = req.body.email;
  var sql = `SELECT * FROM admin WHERE email= '${email}'`;
  conn.query(sql, function (err2, results) {
    if (err2) {
      console.error(err2);
    } else {
      console.log("adf");
      var found = false;
      results.forEach(element => {
        if (password == element.password && found == false) 
        {
          found = true;
        }
      });
      if (found == true) {
        res.json(1);
      }
      else {
        res.json(-1);
      }
    }

  });
});



app.post("/getUpdateDoc",function(req,res){
  var phone = req.body.phone;
  var email = req.body.email;
  var Starttime = req.body.Starttime;
  var Endtime = req.body.Endtime;
  var sql = `update doctor set phone = '${phone}', Starttime = '${Starttime}' , Endtime = '${Endtime}' where email = '${email}'`;
  conn.query(sql, function(error,results){
      if(error)
      {

      }
      else{
          res.json(1);
      }
  });
});



app.post("/getDeleteDoc",function(req,res){
  var email = req.body.email;

  var sql = `delete from doctor where email = '${email}'`;
  conn.query(sql, function(error,results){
      if(error)
      {

      }
      else{
          res.json(1);
      }
  });
});

app.post("/getdata", function (req, res) {
  var password = req.body.password;
  var email = req.body.email;


  var sql = `SELECT * FROM login WHERE email= '${email}'`;
  conn.query(sql, function (err2, results) {
    if (err2) {
      console.error(err2);
    } else {
      var found = false;
      results.forEach(element => {
        if (bcrypt.compareSync(password, element.password) && found == false) {
          found = true;
        }
      });
      if (found == true) {
        res.json(1);
      }
      else {
        res.json(-1);
      }
    }

  });
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});


const upload = multer({ storage: storage });


app.post('/upload', upload.single('image'), (req, res) => {
  const image = req.file.filename;
  var sql = `insert into ImageName(image) values('${image}')`;

  conn.query(sql, function (err2, results) {
    if (err2) {
      console.error(err2);
    } else {
      res.json(results);
    }
  });
});


// app.post('/upload', upload.single('image'), (req, res) => {
//   const filename = req.file.filename;
//   res.json({ filename: filename });
// });


var server = app.listen(4000, function () {
  console.log("App running on port 4000");
});





      // var transporter = nodemailer.createTransport({
      //   service: 'gmail',
      //   auth: {
      //     user: 'master.official.445566@gmail.com',
      //     pass: ''
      //   }
      // });

      // var mailOptions = {
      //   from: 'master.official.445566@gmail.com',
      //   to: 'syedasimmunir7@gmail.com,master.official.445566@gmail.com',
      //   subject: 'Appointment number ',
      //   text: `hello`
      // };

      // transporter.sendMail(mailOptions, function (error, info) {
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log('Email sent: ' + info.response);
      //   }
      // });