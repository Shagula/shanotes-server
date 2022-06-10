const express =require('express')
const route = require('./routes/global')
const cors = require('cors')

let app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.static('../public'))
app.use(express.json())
app.use(cors());

app.get('/',(req,res)=>{
    res.send("Hello World");
})

route(app)
app.listen(80);
