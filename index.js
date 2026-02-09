import express from "express"
import bodyParser from "body-parser"
import {dirname} from "path"
import { fileURLToPath } from "url"


const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
const port = 3000;


app.use(bodyParser.urlencoded({extended : true}));

function checkTheAnswerForFirstQuestion(req,res,next){
    const answerTo1 = req.body["passToPage2"]
    if(answerTo1 == "river" || answerTo1 == "River"){
        req.userIsAuthorized = true;
    }else{
        res.send(`<!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Document</title>
                </head>
                <style>
                    h1{
                        text-align: center;                    
                    }
                </style>
                <body>
                       <h1>Wrong answer ❌ please try again 🔄️</h1>
                    
                </body>
                </html>`)
    }
    next();
}
function checkTheAnswerForSecondQuestion(req,res,next){
    const answerTo2 = req.body["passToPage3"]
    if(answerTo2 == "keyboard" || answerTo2 == "Keyboard"){
        req.userIsAuthorized = true;
    }else{
        res.send(`<!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Document</title>
                </head>
                <style>
                    h1{
                        text-align: center;                    
                    }
                </style>
                <body>
                       <h1>Wrong answer ❌ please try again 🔄️</h1> 
                </body>
                </html>`)
    }
    next();
}
function checkTheAnswerForThirdQuestion(req,res,next){
    const answerTo3 = req.body["passToPage4"]
    if(answerTo3 == "clock" || answerTo3 == "Clock"){
        req.userIsAuthorized = true;
    }else{
        res.send(`<!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Document</title>
                </head>
                <style>
                    h1{
                        text-align: center;                    
                    }
                </style>
                <body>
                       <h1>Wrong answer ❌ please try again 🔄️</h1> 
                       
                </body>
                </html>`)
    }
    next();
}

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/public/page1.html")
});
app.post("/check",checkTheAnswerForFirstQuestion,(req,res)=>{
    if(req.userIsAuthorized){
        res.sendFile(__dirname + "/public/page2.html")
    }else{
        res.sendFile(__dirname + "/public/page1.html")
    }
})
app.post("/verify",checkTheAnswerForSecondQuestion,(req,res)=>{
    if(req.userIsAuthorized){
        res.sendFile(__dirname + "/public/page3.html")
    }else{
        res.sendFile(__dirname + "/public/page2.html")
    }
})
app.post("/inspect",checkTheAnswerForThirdQuestion,(req,res)=>{
    if(req.userIsAuthorized){
        res.sendFile(__dirname + "/public/page4.html")
    }else{
        res.sendFile(__dirname + "/public/page3.html")
    }
})

app.get("/restart",(req,res)=>{
    res.sendFile(__dirname + "/public/page1.html");
})
app.listen(port,()=>{
    console.log(`Your server is successfully running on port ${port}`);
})