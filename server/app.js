const express = require('express');
const app = express();
const port = process.env.PORT || 9999;
const path = require('path');

app.use(express.static(path.join(__dirname, '../public')));


app.listen(port,()=>{
    console.log(`Server Start ${port} port`);
});