const express = require('express');
const bodyParser = require('body-parser');
const jquery = require('jquery');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use (express.static(__dirname+'/client'))

app.get('/',(req,res)=>{
    res.render('index')
});
app.post('/convert',(req,res)=>{
    var dataJson = JSON.parse(req.body.jsonTxt)
    
    res.send()
})


app.listen(5500,()=>{
    console.log('server listen onport 5500')
});
// create function to convert Json data to csv
function extractHeaders (jsonObj, headObj= {}){
    if (Array.isArray(jsonObj)){
        for (let item of jsonObj){
            extractHeaders(item, headObj);
        }
    } else {
        Object.keys(jsonObj).forEach(key =>{
            if (key !== "children"){
                headObj[key] = "";
            }else if (jsonObj[key].length){
                extractHeaders(jsonObj[key], headObj)
            }
        })
    } return headObj;
}
function extractValues(jsonObj, headObj, objvalArr=[]){
    if(Array.isArray(jsonObj)){
        for(let item of jsonObj){
            extractValues(item, headObj, objvalArr)
        }
    }else{
        let valObj = Object.create(headObj)
        Object.keys(jsonObj).forEach(key=>{
            if(key!=="children"){
                valObj[key]=jsonObj[key]
            }
            else {
                extractValues(jsonObj[key], headObj, objvalArr)
            }
        });
        objvalArr.push(valObj)
    }
    return objvalArr;
}
function convertToCSV (jsonObj){
    let headObj = extractHeaders(jsonObj);
    let valArr = extractValues(jsonObj, headObj);
    let dataArr = [];
    dataArr.push(Object.keys(jsonObj).join(','))
    for (let valObj of valArr){
        let row = Object.keys(valObj).map(key =>{
            return valObj[key];
        });
        dataArr.push(row.join(','));
    }
    let csvdata = dataArr.join('\n');
    return csvdata;
}