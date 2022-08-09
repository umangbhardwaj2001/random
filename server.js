const axios = require('axios');
const port = process.env.PORT || 3000
const express = require('express')
require('dotenv').config();
const app = express();
app.use(express.json())

const wordRouter = express.Router();
app.use('/',wordRouter)
wordRouter.route('/:word')
    .get(getMeaning);

app.listen(port,err=>{
    if(err) console.log(err);
    console.log('server running at port',port);
})
async function sendAPI(url)
{
    
    const response = await axios.get(url);
    // console.log(typeof(response));
    return response[0].meta['app-shortdef'].def;
}
async function getMeaning(req,res)
{
    
    const word = req.params.word;
    const key = process.env.API;
    const url = 'https://www.dictionaryapi.com/api/v3/references/learners/json/'+word+'?key='+key;
    let result = await axios.get(url);
    console.log(result);
    let mean = result.data[0].meta['app-shortdef'].def
    res.json({"def":mean});

}

// getMeaning(sendAPI)