//jshint esversion:6


const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose =require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/studentDB", {useNewUrlParser: true});

const studentSchema = {
  name: String,
  age: String,
  address: String,
  class: String,
  teacher: String,
  guardian: String,
  contact: String
};

const Student = mongoose.model("Student", studentSchema);

app.get("/create", function(req, res){
  res.render("create");
});

app.post("/create", function(req, res){

  const student = new Student({
    name: req.body.studentName,
    age: req.body.studentAge,
    address: req.body.studentAddress,
    class: req.body.studentClass,
    teacher: req.body.classTeacher,
    guardian: req.body.guardianName,
    contact: req.body.studentContact
  });
//  console.log("This is the Student Detail " +student);
  student.save(student);
  //console.log("Student Successfully Added to DB");
    res.redirect("/");
});

app.get("/", function(req, res){
//console.log("I'm here to show Student");
 Student.find({}, function(err, student){
  res.render("home", {
    startingContent: homeStartingContent,
    student: student
    });
  //  console.log("Hello I'm here");
  });
});

app.get("/students/:studentId", function(req, res){

  //console.log(postTitle)
  const requestedstudentId = req.params.studentId;
   console.log(requestedstudentId)
    Student.findOne({_id: requestedstudentId}, function(err, student){
      res.render("student", {
        name: student.name,
        age: student.age,
        klass: student.class,
        address: student.address,
        guardian: student.guardian,
        contactnumber: student.contact
      });
      console.log("Hello Im here2");
  //    console.log(name)
    //  console.log(class)
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
