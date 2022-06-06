const express =require('express')
const cors = require('cors')

let app = express();

app.use(cors());

app.use(express.static('../public'))

app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.listen(80);
