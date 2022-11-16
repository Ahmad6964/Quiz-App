// Server file
const cookieParser = require('cookie-parser');
const mysql = require('mysql')
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// DB Connection

const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'quizapp',
});
const a = (err) =>{
  if(!err)
  console.log('DB connection succeeded.');
  else
  console.log('DB connection is failed \n Error : ' + JSON.stringify(err, undefined, 2));
}
mysqlConnection.connect(a);

//Login Page Midleware 
app.set('view engine', 'ejs')
app.use(express.json());
app.use(cookieParser());

app.get('/login', (req, res)=>{
  res.render('login')
})
app.get('/result', (req, res)=>{
  res.render('result')
})
app.get('/quiz/:quiz_id', (req,res)=>{
  mysqlConnection.query('SELECT * FROM questions WHERE quiz_id = ?',[req.params.quiz_id],(err, rows, fields)=>{
    if(!err)
    {res.render("./quiz",{rows:rows});
        console.log('Succeed')}    
        else
        console.log(err);
    });

  // res.render('quiz')
})
app.get('/dashbord', (req,res)=>{
  mysqlConnection.query('SELECT * FROM quiz',(err, rows, fields)=>{
    if(!err)
    {
      console.log(rows);
      res.render('dashbord',{rows:rows})
      console.log('Succeed')}    
      else
      console.log(err);
    });  
})
app.get('/ind', (req,res)=>{
  mysqlConnection.query('SELECT * FROM quiz',(err, rows, fields)=>{
    if(!err)
    {
      console.log(rows);
      res.render('ind',{rows:rows})
      console.log('Succeed')}    
      else
      console.log(err);
    });  
})


// Quiz Crud *****************************************8

function A (req, res){
  mysqlConnection.query('SELECT * FROM questions WHERE quiz_id = ?',[req.params.quiz_id],(err, rows, fields)=>{
      if(!err)
      {res.send(rows);
          console.log('Succeed')}    
          else
          console.log(err);
      });
  }
// Post Quiz

  function B (req, res){
    console.log(req.body)
    const data= req.body
    mysqlConnection.query(`INSERT INTO questions (question,option1,option2,option3,option4,correct,quiz_id) VALUES ("${data.question}","${data.option1}","${data.option2}","${data.option3}","${data.option4}","${data.correct}",${req.params.quiz_id})`,(err, rows, fields)=>{
        if(!err)
        {
            console.log('succeed')    
            res.send(rows);
        }
            else
            console.log(err,"errerrrrrrrrrr");
        });
    }

app.listen(PORT, console.log(`Server is Running on Port ${PORT}`));


