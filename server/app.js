require('dotenv').config({path: `${__dirname}/../.env`});

const express = require('express');
const app = express();

const PORT = process.env.PORT;
app.get('/',(req, res)=>{
   res.send('Girl GPT')
});

app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}...`)
})