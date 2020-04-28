const express = require('express');
const bodyParser = require('body-parser');
const jquery = require('jquery');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use (express.static(__dirname+'/client'))

// app.get('/',(req,res)=>{
//     res.render('index')
// });
app.post('/convert',(req,res)=>{
    console.log(req.body)
    res.send()
})


app.listen(5500,()=>{
    console.log('server listen onport 5500')
})